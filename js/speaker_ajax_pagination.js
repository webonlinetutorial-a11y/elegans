/**
 * Speaker AJAX Pagination Handler
 * 
 * @version 1.0.0
 * @author Naman Kaushik <naman.kaushik@timesinternet.in>
 * @date October 25, 2025
 * @description Class-based AJAX pagination system for speaker cards with 
 */

class SpeakerAjaxPagination {
    constructor(config) {
        this.baseUrl = config.baseUrl || '';
        this.module = config.module || 'ElegansCompanyPageInterviewsHome';
        this.displayPerRow = config.displayPerRow || 4;
        this.groupedSpeakers = config.groupedSpeakers || [];
        this.hasIndependentSpeakers = config.hasIndependentSpeakers || false;
        this.speakerCounts = config.speakerCounts || {};
        this.speakerSettingsAjaxCall = config.speakerSettingsAjaxCall || {};
        this.ajaxParams = config.ajaxParams || {};
        this.loadedSpeakerIds = {};
        this.maxRetries = 5;
        this.retryDelay = 1000;
        this.groupPaginationState = {};
        this.lastAjaxCallTime = 0;
        this.ajaxCallDelay = 200;
        this.activeRequests = 0;
        this.maxConcurrentRequests = 3;
        this.requestQueue = [];
        this.ajaxTimeout = 5000;
        this.showAllSpeakers = config.ajaxParams && config.ajaxParams.show_all_speakers ? true : false;
        // max_cnt = 0 means no limit (load all speakers for interviews page)
        this.maxCnt = (config.speakerSettingsAjaxCall && typeof config.speakerSettingsAjaxCall.max_cnt !== 'undefined') ? config.speakerSettingsAjaxCall.max_cnt : null;
    }

    /**
     * Initialize the pagination system
     */
    init() {
        this.initializeSkeletons();
        this.loadAllSpeakersInParallel();
    }

    /**
     * Extract speaker IDs from HTML
     */
    extractSpeakerIds($html) {
        var ids = [];
        $html.find('article[id], [data-speaker-id]').each(function () {
            var id = $(this).attr('id') || $(this).attr('data-speaker-id');
            if (id) ids.push(id);
        });
        return ids;
    }

    /**
     * Filter duplicate speakers
     */
    filterDuplicateSpeakers($html, groupId) {
        var self = this;
        if (!this.loadedSpeakerIds[groupId]) {
            this.loadedSpeakerIds[groupId] = {};
        }

        $html.find('article[id], [data-speaker-id]').each(function () {
            var id = $(this).attr('id') || $(this).attr('data-speaker-id');
            if (id && self.loadedSpeakerIds[groupId][id]) {
                $(this).remove();
            } else if (id) {
                self.loadedSpeakerIds[groupId][id] = true;
            }
        });

        return $html;
    }

    /**
     * Retry AJAX call with exponential backoff
     */
    retryAjaxCall(ajaxConfig, retryCount, callback, errorCallback) {
        var self = this;
        retryCount = retryCount || 0;

        $.ajax(ajaxConfig)
            .done(function (response) {
                if (callback) callback(response);
            })
            .fail(function (xhr, status, error) {
                if (retryCount < self.maxRetries) {
                    setTimeout(function () {
                        self.retryAjaxCall(ajaxConfig, retryCount + 1, callback, errorCallback);
                    }, self.retryDelay);
                } else {
                    if (errorCallback) errorCallback(xhr, status, error);
                }
            });
    }

    /**
     * Generate skeleton card HTML
     */
    generateSkeletonCard() {
        return `
            <div class="skeleton-speaker-card">
                <div class="skeleton-speaker-image"></div>
                <div class="skeleton-speaker-content">
                    <div class="skeleton-speaker-name"></div>
                    <div class="skeleton-speaker-title"></div>
                    <div class="skeleton-speaker-company"></div>
                </div>
            </div>
        `;
    }

    /**
     * Generate skeleton group
     */
    generateSkeletonGroup(groupName, speakerCount) {
        var cardsPerRow = this.displayPerRow || 4;
        var skeletonCards = '';
        var skeletonCount = cardsPerRow;

        for (var i = 0; i < skeletonCount; i++) {
            skeletonCards += this.generateSkeletonCard();
        }

        return `
            <div class="skeleton-container">
                ${groupName ? '<div class="skeleton-group-title"></div>' : ''}
                <div class="skeleton-speakers-grid">
                    ${skeletonCards}
                </div>
            </div>
        `;
    }

    /**
     * Initialize skeleton loaders
     */
    initializeSkeletons() {
        var self = this;

        this.groupedSpeakers.forEach(function (group) {
            if (group && group.group_id) {
                var groupId = group.group_id;
                var speakerCount = self.speakerCounts[groupId] || self.displayPerRow;
                var skeletonHtml = self.generateSkeletonGroup(group.group_name, speakerCount);

                var $container = $('#group-' + groupId + '-container');
                if ($container.length > 0) {
                    $container.html(skeletonHtml).show();
                }
            }
        });

        if (this.hasIndependentSpeakers) {
            var independentCount = this.speakerCounts['9899'] || this.displayPerRow;
            var independentSkeletonHtml = this.generateSkeletonGroup(null, independentCount);

            var $independentContainer = $('#independent-speakers-container');
            if ($independentContainer.length > 0) {
                $independentContainer.html(independentSkeletonHtml).show();
            }
        }

        $('.speakers-loading').hide();
        $('.speakers-content').show();
    }

    /**
     * Load all speakers in parallel
     */
    loadAllSpeakersInParallel() {
        var self = this;
        var allPromises = [];

        this.groupedSpeakers.forEach(function (group) {
            if (group && group.group_id) {
                var promise = self.loadSingleGroupPromise(group.group_id);
                allPromises.push(promise);
            }
        });

        if (this.hasIndependentSpeakers) {
            var independentPromise = self.loadIndependentSpeakersPromise();
            allPromises.push(independentPromise);
        }

        Promise.all(allPromises).then(function () {
            self.onAllComplete();
        }).catch(function (error) {
            self.onAllComplete();
        });
    }

    /**
     * Load single group as promise
     */
    loadSingleGroupPromise(groupId) {
        var groupData = this.groupedSpeakers.find(g => g && g.group_id == groupId);
        var self = this;

        return new Promise(function (resolve, reject) {
            // Keep per_page at displayPerRow for progressive loading
            var perPage = self.displayPerRow;

            var ajaxConfig = {
                type: 'POST',
                url: self.baseUrl + '/ajax/call',
                data: $.extend({}, self.ajaxParams, {
                    module: self.module,
                    is_ajax: 1,
                    comment_id: groupId,
                    group_id: groupId,
                    type_value: 'grouped',
                    page: 1,
                    per_page: perPage,
                    speaker_settings_json: JSON.stringify(self.speakerSettingsAjaxCall),
                    group_name: groupData ? groupData.group_name : ''
                }),
                async: true,
                dataType: 'json'
            };

            self.retryAjaxCall(ajaxConfig, 0,
                function (response) {
                    var parsedData = self.parseComplexResponse(response);

                    if (parsedData.status && parsedData.html) {
                        var $container = $('#group-' + groupId + '-container');
                        if ($container.length > 0) {
                            var $tempDiv = $('<div>').html(parsedData.html);
                            self.filterDuplicateSpeakers($tempDiv, groupId);

                            $container.html($tempDiv.html()).show();

                            $container.find('img.unveil').each(function () {
                                var dataSrc = $(this).attr('data-src');
                                if (dataSrc && !$(this).hasClass('loaded')) {
                                    $(this).attr('src', dataSrc).addClass('loaded').removeClass('unveil');
                                }
                            });

                            if (typeof $.fn.unveil === 'function') {
                                $container.find('img[data-src]').unveil();
                            }

                            if (typeof initUnveilImg === 'function') {
                                initUnveilImg();
                            }
                        }

                        // Count actual speakers loaded in initial load
                        var $loadedSpeakers = $container.find('article');
                        var actualLoadedCount = $loadedSpeakers.length;


                        if (parsedData.pagination) {
                            self.updateGroupPagination(groupId, parsedData.pagination);
                        } else {
                            if (self.groupPaginationState && self.groupPaginationState[groupId]) {
                                self.groupPaginationState[groupId].loadedCount = actualLoadedCount;
                            }
                        }

                        // Update total count based on actual loaded if fewer than requested
                        if (actualLoadedCount < self.displayPerRow) {
                            self.speakerCounts[groupId] = actualLoadedCount;
                        }
                    }

                    resolve(parsedData);
                },
                function (xhr, status, error) {
                    var $container = $('#group-' + groupId + '-container');
                    if ($container.length > 0) {
                        $container.find('.skeleton-container').remove();
                    }
                    reject(error);
                }
            );
        });
    }

    /**
     * Load independent speakers as promise
     */
    loadIndependentSpeakersPromise() {
        var self = this;

        return new Promise(function (resolve, reject) {
            // Keep per_page at displayPerRow for progressive loading
            var perPage = self.displayPerRow;

            var ajaxConfig = {
                type: 'POST',
                url: self.baseUrl + '/ajax/call',
                data: $.extend({}, self.ajaxParams, {
                    module: self.module,
                    is_ajax: 1,
                    type_value: 'independent',
                    comment_id: '9899',
                    group_id: '9899',
                    page: 1,
                    per_page: perPage,
                    speaker_settings_json: JSON.stringify(self.speakerSettingsAjaxCall),
                    group_name: self.speakerSettingsAjaxCall.title || ''
                }),
                async: true,
                dataType: 'json'
            };

            self.retryAjaxCall(ajaxConfig, 0,
                function (response) {
                    var parsedData = self.parseComplexResponse(response);

                    if (parsedData.status && parsedData.html) {
                        var $container = $('#independent-speakers-container');
                        if ($container.length > 0) {
                            var $tempDiv = $('<div>').html(parsedData.html);
                            self.filterDuplicateSpeakers($tempDiv, '9899');

                            $container.html($tempDiv.html()).show();

                            $container.find('img.unveil').each(function () {
                                var dataSrc = $(this).attr('data-src');
                                if (dataSrc && !$(this).hasClass('loaded')) {
                                    $(this).attr('src', dataSrc).addClass('loaded').removeClass('unveil');
                                }
                            });

                            if (typeof $.fn.unveil === 'function') {
                                $container.find('img[data-src]').unveil();
                            }

                            if (typeof initUnveilImg === 'function') {
                                initUnveilImg();
                            }
                        }

                        // Count actual speakers loaded in initial load
                        var $loadedSpeakers = $container.find('article');
                        var actualLoadedCount = $loadedSpeakers.length;


                        if (parsedData.pagination) {
                            self.updateGroupPagination('9899', parsedData.pagination);
                        } else {
                            if (self.groupPaginationState && self.groupPaginationState['9899']) {
                                self.groupPaginationState['9899'].loadedCount = actualLoadedCount;
                            }
                        }

                        // Update total count based on actual loaded if fewer than requested
                        if (actualLoadedCount < self.displayPerRow) {
                            self.speakerCounts['9899'] = actualLoadedCount;
                        }
                    }

                    resolve(parsedData);
                },
                function (xhr, status, error) {
                    var $container = $('#independent-speakers-container');
                    if ($container.length > 0) {
                        $container.find('.skeleton-container').remove();
                    }
                    reject(error);
                }
            );
        });
    }

    /**
     * Parse complex JSON response
     */
    parseComplexResponse(response) {
        var result = { status: false, html: '', data: null, pagination: null, error: null };

        try {
            if (!response || typeof response !== 'object') {
                result.error = 'Invalid response format';
                return result;
            }

            result.status = response.status === true || response.status === 'true';

            if (response.html) {
                result.html = response.html;
            }

            if (response.data && response.data.pagination) {
                result.pagination = {
                    currentPage: parseInt(response.data.pagination.current_page) || 1,
                    perPage: parseInt(response.data.pagination.per_page) || 10,
                    total: parseInt(response.data.pagination.total) || 0,
                    totalPages: parseInt(response.data.pagination.total_pages) || 1,
                    currentPageCount: parseInt(response.data.pagination.current_page_count) || 0,
                    isLastPage: response.data.pagination.is_last_page === true
                };
            }

            if (response.data) result.data = response.data;

        } catch (error) {
            result.error = error.message;
            result.status = false;
        }

        return result;
    }

    /**
     * Update group pagination state
     */
    updateGroupPagination(groupId, paginationData) {
        if (this.groupPaginationState && this.groupPaginationState[groupId] && paginationData) {
            var state = this.groupPaginationState[groupId];

            $.extend(state, {
                currentPage: paginationData.currentPage || 1,
                totalSpeakers: paginationData.total || 0,
                hasMore: !paginationData.isLastPage,
                totalPages: paginationData.totalPages || 1,
                perPage: paginationData.perPage || this.displayPerRow
            });

            if (state.displayLimit && state.displayLimit > 0) {
                var currentLoadedCount = state.loadedCount || (state.currentPage * this.displayPerRow);
                if (currentLoadedCount >= state.displayLimit) {
                    state.hasMore = false;
                }
            }
        }
    }

    /**
     * Callback when all initial loads complete
     */
    onAllComplete() {
        $(document).trigger('speakers:loaded');
        $('.speakers-loading').hide();
        $('.speakers-content').show();
        this.initScrollPagination();
    }

    /**
     * Initialize scroll-based pagination
     */
    initScrollPagination() {
        var self = this;
        this.groupPaginationState = {};
        this.lastAjaxCallTime = 0;
        this.ajaxCallDelay = 200;
        this.activeRequests = 0;
        this.maxConcurrentRequests = 3;
        this.requestQueue = [];
        this.ajaxTimeout = 5000;

        // Determine speaker display limit
        // If maxCnt is 0, it means no limit (load all speakers for interviews page)
        var speakerDisplayLimit = null;
        if (this.maxCnt === 0) {
            // No limit - load all speakers
            speakerDisplayLimit = null;
        } else if (this.speakerSettingsAjaxCall && this.speakerSettingsAjaxCall.display_cnt) {
            var limit = parseInt(this.speakerSettingsAjaxCall.display_cnt);
            if (limit > 0) {
                speakerDisplayLimit = limit;
            }
        }

        this.groupedSpeakers.forEach(function (group) {
            if (group && group.group_id) {
                var groupId = group.group_id;
                var totalSpeakers = self.speakerCounts[groupId] || group.total_speakers || 10;

                // Check actual loaded count from DOM
                var $container = $('#group-' + groupId + '-container');
                var $loadedSpeakers = $container.find('article');
                var actualLoadedCount = $loadedSpeakers.length || self.displayPerRow;
                var loadedCount = actualLoadedCount;

                var hasMore = totalSpeakers > loadedCount;
                if (speakerDisplayLimit && speakerDisplayLimit > 0) {
                    hasMore = hasMore && (loadedCount < speakerDisplayLimit);
                }


                self.groupPaginationState[groupId] = {
                    currentPage: 1,
                    totalSpeakers: totalSpeakers,
                    loadedCount: loadedCount,
                    displayLimit: speakerDisplayLimit,
                    isLoading: false,
                    hasMore: hasMore,
                    pendingRequest: false,
                    retryCount: 0,
                    maxRetries: 5
                };
            }
        });

        if (this.hasIndependentSpeakers) {
            var independentTotalSpeakers = this.speakerCounts['9899'] || 10;

            // Check actual loaded count from DOM
            var $container = $('#independent-speakers-container');
            var $loadedSpeakers = $container.find('article');
            var actualLoadedCount = $loadedSpeakers.length || this.displayPerRow;
            var loadedCount = actualLoadedCount;

            var hasMore = independentTotalSpeakers > loadedCount;
            if (speakerDisplayLimit && speakerDisplayLimit > 0) {
                hasMore = hasMore && (loadedCount < speakerDisplayLimit);
            }


            this.groupPaginationState['9899'] = {
                currentPage: 1,
                totalSpeakers: independentTotalSpeakers,
                loadedCount: loadedCount,
                displayLimit: speakerDisplayLimit,
                isLoading: false,
                hasMore: hasMore,
                pendingRequest: false,
                retryCount: 0,
                maxRetries: 5
            };
        }

        setTimeout(function () { self.bindWindowScrollPagination(); }, 500);
    }

    /**
     * Bind window scroll event for pagination
     */
    bindWindowScrollPagination() {
        var self = this;
        var scrollTimer = null;

        $(window).on('scroll', function () {
            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                self.checkScrollTriggers();
            }, 150);
        });
    }

    /**
     * Show professional loading indicator
     */
    showLoadingIndicator($container, groupId) {
        var loaderId = 'loader-' + groupId;
        var self = this;

        // Remove any existing loader
        $('#' + loaderId).remove();


        var loaderHtml = `
            <div id="${loaderId}" class="speaker-loader-inline">
                <div class="speaker-loader-card">
                    <div class="speaker-loader-spinner">
                        <div class="spinner-orbit"></div>
                        <div class="spinner-orbit"></div>
                        <div class="spinner-orbit"></div>
                    </div>
                    <div class="speaker-loader-text">Loading speakers<span class="dots"></span></div>
                </div>
            </div>
        `;

        var $ctaButton = $container.find('.btn, button, [class*="cta"], [class*="register"]').last();
        if ($ctaButton.length > 0) {
            $ctaButton.before(loaderHtml);
        } else {
            $container.append(loaderHtml);
        }

        setTimeout(function () {
            $('#' + loaderId).addClass('loader-visible');
        }, 10);

        // Safety timeout: Force hide loader after 10 seconds if not already hidden
        setTimeout(function () {
            if ($('#' + loaderId).length > 0) {
                self.hideLoadingIndicator(groupId);
            }
        }, 10000);
    }

    /**
     * Hide loading indicator
     */
    hideLoadingIndicator(groupId) {
        var loaderId = 'loader-' + groupId;
        var $loader = $('#' + loaderId);

        if ($loader.length > 0) {
            $loader.removeClass('loader-visible');
            setTimeout(function () {
                $loader.remove();
            }, 300);
        } else {
        }
    }

    /**
     * Process request queue
     */
    processRequestQueue() {
        var self = this;

        if (this.activeRequests < this.maxConcurrentRequests && this.requestQueue.length > 0) {
            var groupId = this.requestQueue.shift();
            var state = this.groupPaginationState[groupId];

            if (state && !state.isLoading && state.hasMore) {
                state.pendingRequest = false;
                this.executeLoadRequest(groupId);
            } else {
                setTimeout(function () { self.processRequestQueue(); }, 10);
            }
        }
    }

    /**
     * Check scroll triggers for pagination
     */
    checkScrollTriggers() {
        var self = this;
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        $('.group-content, .independent-content').each(function () {
            var $container = $(this);
            var groupId = self.getGroupIdFromContainer($container);

            if (groupId && self.groupPaginationState[groupId]) {
                var state = self.groupPaginationState[groupId];

                if (state.hasMore && !state.isLoading) {
                    if (self.shouldLoadMoreForGroup($container, scrollTop, windowHeight)) {
                        self.loadNextPageForGroup(groupId);
                    }
                }
            }
        });
    }

    /**
     * Get group ID from container
     */
    getGroupIdFromContainer($container) {
        if ($container.hasClass('group-content')) {
            var matches = ($container.attr('id') || '').match(/group-(\d+)-container/);
            return matches ? matches[1] : null;
        } else if ($container.hasClass('independent-content')) {
            return '9899';
        }
        return null;
    }

    /**
     * Determine if more content should be loaded
     */
    shouldLoadMoreForGroup($container, scrollTop, windowHeight) {
        var $speakerCards = $container.find('article');

        if ($speakerCards.length === 0) {
            $speakerCards = $container.find('.col-lg-3, .col-lg-4, .col-lg-6, .col-md-3, .col-md-4, .col-md-6, .col-sm-6, .col-xs-12, [class*="card"], .speaker-card-individual, .brick, .gridPadItem');
        }

        if ($speakerCards.length === 0) return false;

        var rows = [];
        var currentRow = [];
        var currentRowTop = null;

        $speakerCards.each(function () {
            var itemTop = $(this).offset().top;

            if (currentRowTop === null) {
                currentRowTop = itemTop;
                currentRow = [$(this)];
            } else if (Math.abs(itemTop - currentRowTop) < 50) {
                currentRow.push($(this));
            } else if (itemTop > currentRowTop) {
                rows.push({ top: currentRowTop, items: currentRow });
                currentRowTop = itemTop;
                currentRow = [$(this)];
            }
        });

        if (currentRow.length > 0) {
            rows.push({ top: currentRowTop, items: currentRow });
        }

        if (rows.length === 0) return false;

        var targetRow;
        if (rows.length >= 3) {
            targetRow = rows[rows.length - 3];
        } else if (rows.length === 2) {
            targetRow = rows[0];
        } else {
            targetRow = rows[0];
        }

        var targetRowTop = targetRow.top;
        var viewportBottom = scrollTop + windowHeight;

        return viewportBottom >= targetRowTop;
    }

    /**
     * Load next page for a group
     */
    loadNextPageForGroup(groupId) {
        var state = this.groupPaginationState[groupId];

        if (!state || state.isLoading || !state.hasMore) return;

        if (state.displayLimit && state.displayLimit > 0) {
            var currentLoadedCount = state.loadedCount || (state.currentPage * this.displayPerRow);
            if (currentLoadedCount >= state.displayLimit) {
                state.hasMore = false;
                return;
            }
        }

        if (state.pendingRequest) return;

        if (this.activeRequests >= this.maxConcurrentRequests) {
            if (this.requestQueue.indexOf(groupId) === -1) {
                this.requestQueue.push(groupId);
                state.pendingRequest = true;
            }
            return;
        }

        var currentTime = Date.now();
        var timeSinceLastCall = currentTime - this.lastAjaxCallTime;
        var self = this;

        if (timeSinceLastCall < this.ajaxCallDelay) {
            setTimeout(function () {
                self.loadNextPageForGroup(groupId);
            }, this.ajaxCallDelay - timeSinceLastCall);
            return;
        }

        this.executeLoadRequest(groupId);
    }

    /**
     * Execute AJAX load request
     */
    executeLoadRequest(groupId) {
        var state = this.groupPaginationState[groupId];

        if (!state || state.isLoading || !state.hasMore) return;

        state.isLoading = true;
        this.activeRequests++;
        this.lastAjaxCallTime = Date.now();

        var nextPage = state.currentPage + 1;
        var self = this;
        var typeValue = (groupId === '9899') ? 'independent' : 'grouped';

        var $container = (groupId === '9899') ?
            $('#independent-speakers-container') :
            $('#group-' + groupId + '-container');

        var groupData = typeValue === 'grouped' ?
            this.groupedSpeakers.find(g => g && g.group_id == groupId) : null;

        this.showLoadingIndicator($container, groupId);

        // Keep per_page at displayPerRow for progressive loading on scroll
        var perPage = this.displayPerRow;

        $.ajax({
            type: 'POST',
            url: this.baseUrl + '/ajax/call',
            data: $.extend({}, this.ajaxParams, {
                module: this.module,
                is_ajax: 1,
                comment_id: typeValue === 'grouped' ? groupId : '9899',
                group_id: typeValue === 'grouped' ? groupId : '9899',
                type_value: typeValue,
                page: nextPage,
                per_page: perPage,
                speaker_settings_json: JSON.stringify(this.speakerSettingsAjaxCall),
                group_name: groupData ? groupData.group_name : (this.speakerSettingsAjaxCall.title || ''),
                pagination_type: 'scroll'
            }),
            dataType: 'json',
            timeout: self.ajaxTimeout,
            success: function (response) {
                self.handlePaginationSuccess(response, groupId, state, $container);
            },
            error: function (xhr, status, error) {
                self.handlePaginationError(xhr, status, error, groupId, state);
            }
        });
    }

    /**
     * Handle pagination success
     */
    handlePaginationSuccess(response, groupId, state, $container) {
        var self = this;
        var scrollParsedData = this.parseComplexResponse(response);

        if (scrollParsedData.status && scrollParsedData.html && scrollParsedData.html.trim() !== '') {
            var $tempDiv = $('<div>').html(scrollParsedData.html);

            this.filterDuplicateSpeakers($tempDiv, groupId);

            var $speakerArticles = $tempDiv.find('article');
            var $detailDivs = $tempDiv.find('.mfp-hide.newsDetailDiv, [id*="_detail"]');


            if ($speakerArticles.length === 0) {
                state.hasMore = false;
                state.isLoading = false;
                this.activeRequests--;
                this.hideLoadingIndicator(groupId);
                this.processRequestQueue();
                return;
            }

            var cardsToAdd = $speakerArticles.length;
            var articlesToAppend = $speakerArticles;

            if (state.displayLimit && state.displayLimit > 0) {
                var currentLoadedCount = state.loadedCount || (state.currentPage * this.displayPerRow);
                var remainingSlots = state.displayLimit - currentLoadedCount;


                if (remainingSlots <= 0) {
                    state.hasMore = false;
                    state.isLoading = false;
                    this.activeRequests--;
                    this.hideLoadingIndicator(groupId);
                    this.processRequestQueue();
                    return;
                }

                if (remainingSlots < $speakerArticles.length) {
                    cardsToAdd = remainingSlots;
                    articlesToAppend = $speakerArticles.slice(0, remainingSlots);

                    var allowedArticleIds = [];
                    articlesToAppend.each(function () {
                        var id = $(this).attr('id');
                        if (id) allowedArticleIds.push(id);
                    });

                    $detailDivs = $detailDivs.filter(function () {
                        var divId = $(this).attr('id');
                        if (!divId) return false;
                        for (var i = 0; i < allowedArticleIds.length; i++) {
                            if (divId.indexOf(allowedArticleIds[i]) !== -1) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
            }

            if (!$container.data('row-container')) {
                var $rowContainer = $container.find('.row').first();
                if ($rowContainer.length === 0) $rowContainer = $container.find('.news_lst17').first();
                if ($rowContainer.length === 0) $rowContainer = $container.find('.masonry-grid_').first();
                if ($rowContainer.length === 0) {
                    var containerId = $container.attr('id');
                    if (containerId && containerId.indexOf('speakers_list') !== -1) {
                        $rowContainer = $container;
                    } else {
                        $rowContainer = $container.find('[id*="speakers_list"]').first();
                        if ($rowContainer.length === 0) {
                            $rowContainer = $container;
                        }
                    }
                }
                $container.data('row-container', $rowContainer);
            } else {
                var $rowContainer = $container.data('row-container');
            }

            // Professional slide-up animation with fade
            articlesToAppend.each(function (index) {
                var $article = $(this);

                $article.css({
                    'visibility': 'visible',
                    'display': '',
                    'opacity': '0',
                    'transform': 'translateY(30px) scale(0.95)',
                    'transition': 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)'
                });

                $article.addClass('speaker-card-paginated');

                $rowContainer.append($article);

                setTimeout(function () {
                    $article.css({
                        'opacity': '1',
                        'transform': 'translateY(0) scale(1)'
                    });
                }, index * 80);
            });

            $detailDivs.each(function () { $container.append($(this)); });


            setTimeout(function () {
                self.hideLoadingIndicator(groupId);
            }, 200);

            articlesToAppend.find('img.unveil').each(function () {
                var dataSrc = $(this).attr('data-src');
                if (dataSrc && !$(this).hasClass('loaded')) {
                    $(this).attr('src', dataSrc).addClass('loaded').removeClass('unveil');
                }
            });

            if (typeof $.fn.unveil === 'function') {
                articlesToAppend.find('img[data-src]').unveil();
            }

            if (typeof initUnveilImg === 'function') {
                initUnveilImg();
            }

            var $newImages = articlesToAppend.find('img');
            var animationDuration = (cardsToAdd * 80) + 600;

            this.triggerMasonryLayout($container, $rowContainer, animationDuration);

            if (scrollParsedData.pagination) {
                state.currentPage = scrollParsedData.pagination.currentPage;
                state.totalSpeakers = scrollParsedData.pagination.total;
                state.hasMore = !scrollParsedData.pagination.isLastPage;
                state.totalPages = scrollParsedData.pagination.totalPages;
                state.perPage = scrollParsedData.pagination.perPage;
                state.loadedCount = (state.loadedCount || 0) + cardsToAdd;
            } else {
                state.loadedCount = (state.loadedCount || 0) + cardsToAdd;
                state.hasMore = state.loadedCount < state.totalSpeakers;
            }

            if (state.displayLimit && state.displayLimit > 0) {
                if (state.loadedCount >= state.displayLimit) {
                    state.hasMore = false;
                }
            }
        } else {
            state.hasMore = false;
            this.hideLoadingIndicator(groupId);
        }

        state.isLoading = false;
        this.activeRequests--;
        state.retryCount = 0;

        setTimeout(function () { self.processRequestQueue(); }, 50);
    }

    /**
     * Handle pagination error
     */
    handlePaginationError(xhr, status, error, groupId, state) {
        var self = this;

        state.isLoading = false;
        this.activeRequests--;

        this.hideLoadingIndicator(groupId);

        if (status === 'timeout') {
            if (state.retryCount < state.maxRetries) {
                state.retryCount++;
                setTimeout(function () {
                    self.loadNextPageForGroup(groupId);
                }, 0);
            } else {
                state.retryCount = 0;
                state.hasMore = false;
                setTimeout(function () { self.processRequestQueue(); }, 100);
            }
        } else {
            state.retryCount = 0;
            setTimeout(function () { self.processRequestQueue(); }, 100);
        }
    }

    /**
     * Trigger Masonry layout
     */
    triggerMasonryLayout($container, $rowContainer, delay) {
        setTimeout(function () {
            if (typeof $.fn.masonry === 'function') {
                if (!$container.data('masonry-grid')) {
                    var $masonryGrid = $rowContainer.hasClass('masonry-grid_') || $rowContainer.hasClass('masonry-grid') ?
                        $rowContainer : $container.find('.masonry-grid_').add($container.find('.masonry-grid')).first();
                    if ($masonryGrid.length > 0) {
                        $container.data('masonry-grid', $masonryGrid);
                    }
                }

                var $masonryGrid = $container.data('masonry-grid');
                if ($masonryGrid && $masonryGrid.length > 0) {
                    var masonryInstance = $masonryGrid.data('masonry');
                    if (masonryInstance) {
                        $masonryGrid.masonry('reloadItems').masonry('layout');
                    }
                }
            }
        }, delay || 500);
    }
}

// Export for global use
window.SpeakerAjaxPagination = SpeakerAjaxPagination;

