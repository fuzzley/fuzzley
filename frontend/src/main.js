var Page = (function () {
  "use strict";

  var Page = {};

  Page.tabs = {
    projects: {
      hash: "projects",
      element: "#fz-tab-projects",
    },
    about: {
      hash: "about",
      element: "#fz-tab-about",
    },
    contact: {
      hash: "contact",
      element: "#fz-tab-contact",
    },
  };
  Page.defaultTab = Page.tabs.projects;

  Page.initialize = function () {
    Page.initializeTabs();
    Page.initializeHasher();
  };

  Page.initializeTabs = function () {
    $("[data-fz-tab]").on("click", function () {
      var $el = $(this);
      var target = $el.data("fz-tab");
      if (!target) {
        return;
      } //else

      Page.selectTab(target);
    });
  };

  Page.initializeHasher = function () {
    hasher.changed.add(Page.hashChanged);
    hasher.initialized.add(Page.hashInitialized);
    hasher.init();
  };

  Page.hashInitialized = function (curHash) {
    if (!curHash && Page.defaultTab) {
      hasher.setHash(Page.defaultTab.hash);
    }

    var tab = Page.findTabForHash(hasher.getHash());
    if (tab) {
      Page.selectTab(tab.element);
    }
  };

  Page.hashChanged = function (newHash) {
    var tab = Page.findTabForHash(newHash);
    if (!tab) {
      return;
    } //else

    Page.selectTab(tab.element);
  };

  Page.selectTab = function (target) {
    $(".fz-tab-content").hide();
    $(target).show();

    $("ul.fz-nav-links li").removeClass("active");
    $('ul.fz-nav-links li a[data-fz-tab="' + target + '"]')
      .parent()
      .addClass("active");

    var tab = Page.findTabForElement(target);
    if (tab) {
      Page.setHashSilently(tab.hash);
    }
  };

  Page.setHashSilently = function (hash) {
    hasher.changed.active = false;
    hasher.setHash(hash);
    hasher.changed.active = true;
  };

  Page.findTabForHash = function (hash) {
    if (!hash) {
      return null;
    } //else

    for (var tab in Page.tabs) {
      if (
        Object.prototype.hasOwnProperty.call(Page.tabs, tab) &&
        Page.tabs[tab].hash === hash
      ) {
        return Page.tabs[tab];
      }
    } //else

    return null;
  };

  Page.findTabForElement = function (element) {
    if (!element) {
      return null;
    } //else

    for (var tab in Page.tabs) {
      if (
        Object.prototype.hasOwnProperty.call(Page.tabs, tab) &&
        Page.tabs[tab].element === element
      ) {
        return Page.tabs[tab];
      }
    } //else

    return null;
  };

  return Page;
})();

$(document).ready(function () {
  Page.initialize();
});
