// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
                element.css('min-height', '0');
            } else if (element.is('div')) {
                // set the style to background-size: cover; 
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

    var $grid = $('.grid').masonry({
        "percentPosition": true,
        "itemSelector": ".grid-item",
        "columnWidth": ".grid-sizer"
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".lazy").on("load", function () {
        $grid.masonry('layout');
    });

    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-academic-tabs] [data-tab]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-academic-tabs] [data-tab-panel]'));

    function showAcademicTab(id, updateHash) {
        if (!panels.some(function (panel) { return panel.dataset.tabPanel === id; })) {
            id = 'about';
        }

        tabs.forEach(function (tab) {
            var selected = tab.dataset.tab === id;
            tab.classList.toggle('active', selected);
            tab.setAttribute('aria-selected', selected ? 'true' : 'false');
            tab.setAttribute('tabindex', selected ? '0' : '-1');
        });

        panels.forEach(function (panel) {
            var selected = panel.dataset.tabPanel === id;
            panel.hidden = !selected;
            panel.classList.toggle('active', selected);
        });

        if (updateHash && window.history.replaceState) {
            window.history.replaceState(null, '', '#' + id);
        }
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
            showAcademicTab(tab.dataset.tab, true);
        });

        tab.addEventListener('keydown', function (event) {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            var direction = event.key === 'ArrowRight' ? 1 : -1;
            var nextIndex = (index + direction + tabs.length) % tabs.length;
            tabs[nextIndex].focus();
            showAcademicTab(tabs[nextIndex].dataset.tab, true);
        });
    });

    if (tabs.length && panels.length) {
        showAcademicTab(window.location.hash.slice(1) || 'about', false);
    }
})
