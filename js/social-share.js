(function ($) {

  function getMetaContent(selector) {
    var element = document.querySelector(selector);
    return element ? element.getAttribute('content') : '';
  }

  function getPreferredShareUrl() {
    var currentUrl = window.location.href;
    var hostname = (window.location.hostname || '').toLowerCase();
    var isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

    if (isLocalHost) {
      // On localhost, share a public URL from metadata so recipients can open it.
      var ogUrl = getMetaContent('meta[property="og:url"]');
      var canonicalTag = document.querySelector('link[rel="canonical"]');
      var canonicalUrl = canonicalTag ? canonicalTag.getAttribute('href') : '';
      if (ogUrl) return ogUrl;
      if (canonicalUrl) return canonicalUrl;
    }

    return currentUrl;
  }

  var SHARE_CONFIG = {
    url: encodeURIComponent(getPreferredShareUrl()),
    title: encodeURIComponent(document.title),
    text: encodeURIComponent(
      getMetaContent('meta[name="description"]') || document.title
    ),
    image: encodeURIComponent(
      getMetaContent('meta[property="og:image"]')
    ),
  };

  var NETWORKS = {
    facebook: function (c) {
      return 'https://www.facebook.com/sharer/sharer.php?u=' + c.url;
    },
    x: function (c) {
      return 'https://x.com/intent/tweet?url=' + c.url + '&text=' + c.text;
    },
    linkedin: function (c) {
      return 'https://www.linkedin.com/sharing/share-offsite/?url=' + c.url;
    },
    whatsapp: function (c) {
      return 'https://api.whatsapp.com/send?text=' + c.text + '%20' + c.url;
    },
  };

  function openSharePopup(shareUrl, network) {
    var width = 600;
    var height = 480;
    var left = Math.round((screen.width / 2) - (width / 2));
    var top = Math.round((screen.height / 2) - (height / 2));

    if (network === 'whatsapp' && /Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = shareUrl;
      return;
    }

    window.open(
      shareUrl,
      'share_' + network,
      'width=' + width + ',height=' + height +
      ',top=' + top + ',left=' + left +
      ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
    );
  }

  function tryNativeShare(c) {
    if (!navigator.share) return false;
    navigator.share({
      title: decodeURIComponent(c.title),
      text: decodeURIComponent(c.text),
      url: decodeURIComponent(c.url),
    }).catch(function () {});
    return true;
  }

  $(document).on('click', '.custom-share-buttons .share-btn', function (e) {
    e.preventDefault();

    var network = $(this).data('network');
    if (!network || !NETWORKS[network]) {
      console.warn('Unknown share network:', network);
      return;
    }

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      if (tryNativeShare(SHARE_CONFIG)) return;
    }

    var shareUrl = NETWORKS[network](SHARE_CONFIG);
    openSharePopup(shareUrl, network);

    var $bar = $(this).closest('.socialShareBar');
    if ($bar.length) {
      $bar.updateSocialShareBar({ checkVisible: false });
    }
  });

}(jQuery));
