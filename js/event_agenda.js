/**
 * Agenda Module JavaScript
 */
(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAgenda);
    } else {
        initAgenda();
    }

    function initAgenda() {
        document.addEventListener('click', handleAgendaClicks);

        // Initialize lazy loading for agenda speaker images
        initAgendaLazyLoad();
    }

    function handleAgendaClicks(e) {
        const target = e.target;

        // Handle dt-3 tab strip clicks
        if (target.closest('.sec-mdl-agnd.dt-3 ul.tab-strip li')) {
            handleTabClick(target.closest('.sec-mdl-agnd.dt-3 ul.tab-strip li'), '.sec-mdl-agnd.dt-3');
        }

        // Handle dt-4 tab strip clicks
        else if (target.closest('.sec-mdl-agnd.dt-4 ul.tab-strip li')) {
            handleTabClickDt4(target.closest('.sec-mdl-agnd.dt-4 ul.tab-strip li'));
        }

        // Handle dt-5, dt-6, dt-7 tab strip clicks
        else if (target.closest('.sec-mdl-agnd.dt-5 ul.tab-strip li, .sec-mdl-agnd.dt-6 ul.tab-strip li, .sec-mdl-agnd.dt-7 ul.tab-strip li')) {
            handleTabClickGeneric(target.closest('li'));
        }

        // Handle more button clicks (dt-3)
        else if (target.closest('.sec-mdl-agnd.dt-3 .more')) {
            handleMoreClick(e, target.closest('.sec-mdl-agnd.dt-3 .more'));
        }

        // Handle parentbox clicks (dt-3)
        else if (target.closest('.sec-mdl-agnd.dt-3 .parentbox')) {
            handleParentBoxClick(target.closest('.sec-mdl-agnd.dt-3 .parentbox'));
        }

        // Handle dt-7 event slot clicks
        else if (target.closest('.sec-mdl-agnd.dt-7 .evnt-slot .part-1')) {
            handleEventSlotClick(target.closest('.sec-mdl-agnd.dt-7 .evnt-slot .part-1'));
        }
    }

    function handleTabClick(tab, container) {
        const tabId = tab.getAttribute('data-tab');
        if (!tabId) return;

        // Remove current class from all tabs and content in this container
        const containerEl = document.querySelector(container);
        if (!containerEl) return;

        containerEl.querySelectorAll('ul.tab-strip li').forEach(li => li.classList.remove('current'));
        containerEl.querySelectorAll('.tabcontent').forEach(content => content.classList.remove('current'));

        // Add current class to clicked tab and corresponding content
        tab.classList.add('current');
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('current');
        }
    }

    function handleTabClickDt4(tab) {
        const tabId = tab.getAttribute('data-tab');
        if (!tabId) return;

        // Remove current class from siblings
        const siblings = Array.from(tab.parentElement.children);
        siblings.forEach(sibling => {
            if (sibling !== tab) sibling.classList.remove('current');
        });

        // Remove current from content siblings
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            const contentSiblings = Array.from(targetContent.parentElement.children).filter(el => el.classList.contains('tabcontent'));
            contentSiblings.forEach(sibling => {
                if (sibling !== targetContent) sibling.classList.remove('current');
            });
        }

        // Add current class
        tab.classList.add('current');
        if (targetContent) {
            targetContent.classList.add('current');
        }
    }

    function handleTabClickGeneric(tab) {
        const tabId = tab.getAttribute('data-tab');
        if (!tabId) return;

        // Remove current class from siblings
        const siblings = Array.from(tab.parentElement.children);
        siblings.forEach(sibling => {
            if (sibling !== tab) sibling.classList.remove('current');
        });

        // Remove current from content siblings
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            const contentSiblings = Array.from(targetContent.parentElement.children).filter(el => el.classList.contains('tabcontent'));
            contentSiblings.forEach(sibling => {
                if (sibling !== targetContent) sibling.classList.remove('current');
            });
            targetContent.classList.add('current');
        }

        // Add current class
        tab.classList.add('current');
    }

    function handleMoreClick(e, moreBtn) {
        e.stopPropagation();

        // Toggle detail and speakers using vanilla JS slideToggle equivalent
        const detail = moreBtn.parentElement.querySelector('.detail');
        const spkrs = moreBtn.parentElement.querySelector('.spkrs');

        if (detail) slideToggle(detail);
        if (spkrs) slideToggle(spkrs);

        moreBtn.classList.toggle('rotate');
    }

    function handleParentBoxClick(parentBox) {
        const detail = parentBox.querySelector('.detail');
        const spkrs = parentBox.querySelector('.spkrs');
        const more = parentBox.querySelector('.more');

        if (detail) slideToggle(detail);
        if (spkrs) slideToggle(spkrs);
        if (more) more.classList.toggle('rotate');
    }

    function handleEventSlotClick(part1) {
        const evntSlot = part1.closest('.evnt-slot');
        if (!evntSlot) return;

        const boxWrap = evntSlot.querySelector('.evnt-dtl .box-wrap');
        if (boxWrap) {
            boxWrap.classList.toggle('slide');
        }

        const wasActive = evntSlot.classList.contains('active');

        // Remove active from all event slots
        document.querySelectorAll('.sec-mdl-agnd.dt-7 .evnt-slot').forEach(slot => {
            slot.classList.remove('active');
        });

        // Toggle active on current slot
        if (!wasActive) {
            evntSlot.classList.add('active');
        }
    }

    // Lazy load agenda speaker images when section comes into view
    function initAgendaLazyLoad() {
        // Find all agenda sections
        const agendaSections = document.querySelectorAll('.sec-mdl-agnd');

        if (!agendaSections.length) {
            console.log('No agenda sections found');
            return;
        }

        console.log('Found ' + agendaSections.length + ' agenda sections');

        // Check if browser supports IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            console.log('IntersectionObserver not supported, loading all images');
            // Fallback: load all images immediately
            loadAllAgendaImages();
            return;
        }

        // Create intersection observer for agenda sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Agenda section is visible, loading images');
                    // Section is visible, load its images
                    loadAgendaSectionImages(entry.target);
                    // Stop observing this section
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '200px', // Start loading 200px before section is visible
            threshold: 0.01
        });

        // Observe each agenda section
        agendaSections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Also check if any section is already in viewport on page load
        setTimeout(function () {
            agendaSections.forEach(section => {
                var rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    console.log('Agenda section already in viewport, loading images immediately');
                    loadAgendaSectionImages(section);
                }
            });
        }, 100);
    }

    function loadAgendaSectionImages(section) {
        const lazyImages = section.querySelectorAll('img.agenda-lazy-img[data-src]');

        console.log('Loading ' + lazyImages.length + ' agenda speaker images');

        lazyImages.forEach(img => {
            loadImage(img);
        });
    }

    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) {
            console.log('No data-src found for image');
            return;
        }

        console.log('Loading image: ' + src);

        // Create a new image to preload
        const tempImg = new Image();

        tempImg.onload = function () {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            console.log('Image loaded successfully: ' + src);
        };

        tempImg.onerror = function () {
            // Keep default image on error
            img.classList.add('error');
            img.removeAttribute('data-src');
            console.log('Image load error: ' + src);
        };

        tempImg.src = src;
    }

    function loadAllAgendaImages() {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img.agenda-lazy-img[data-src]');
        lazyImages.forEach(img => {
            loadImage(img);
        });
    }

    // Vanilla JS slideToggle implementation
    function slideToggle(element) {
        if (!element) return;

        if (window.getComputedStyle(element).display === 'none') {
            slideDown(element);
        } else {
            slideUp(element);
        }
    }

    function slideDown(element) {
        element.style.display = 'block';
        const height = element.scrollHeight + 'px';
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.transition = 'height 0.3s ease';

        setTimeout(() => {
            element.style.height = height;
        }, 10);

        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, 310);
    }

    function slideUp(element) {
        element.style.height = element.scrollHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = 'height 0.3s ease';

        setTimeout(() => {
            element.style.height = '0';
        }, 10);

        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, 310);
    }
})();

