/**
 * The top tabs are one sideways-scrolling row (style.css). When the open tab sits past the
 * visible part of the row (on a laptop, the last tabs do), scroll the row so it shows.
 * Only the row moves, never the page. Runs on load and after each in-app navigation.
 *
 * Mintlify loads every `.js` in the content directory on all pages: keep work minimal.
 */
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  var shown = null; // the tab last brought into view: a reader scrolling the row is never pulled back
  function showActiveTab(force) {
    var row = document.querySelector('#navbar .nav-tabs');
    var tab = row && row.querySelector('.nav-tabs-item[aria-current="location"]');
    if (!row || !tab) return;
    var key = tab.getAttribute('href') || tab.textContent;
    if (key === shown && !force) return;
    shown = key;
    var r = row.getBoundingClientRect();
    var t = tab.getBoundingClientRect();
    var fade = 48; // the right-edge fade in style.css (2.5rem) and a little air
    if (t.left >= r.left && t.right <= r.right - fade) return;
    row.scrollLeft += t.left - r.left - (r.width - t.width) / 2;
    markScrolled(row);
  }

  var pending = null;
  var forced = false;
  function schedule(force) {
    if (force === true) forced = true;
    if (pending) return;
    pending = window.requestAnimationFrame(function () {
      pending = null;
      var f = forced;
      forced = false;
      showActiveTab(f);
    });
  }

  function watch() {
    schedule();
    if (typeof MutationObserver === 'undefined') return;
    // In-app navigation moves aria-current to the open tab, and can draw a new #navbar: watch the body, not
    // one navbar element. Each run stops at once when the open tab is the one already shown.
    new MutationObserver(schedule).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['aria-current'], childList: true });
  }

  // A row scrolled away from its start fades on the left too (style.css reads data-scrolled).
  function markScrolled(row) {
    if (row) row.setAttribute('data-scrolled', row.scrollLeft > 2 ? 'true' : 'false');
  }
  document.addEventListener(
    'scroll',
    function (e) {
      var row = e.target;
      if (row && row.classList && row.classList.contains('nav-tabs')) markScrolled(row);
    },
    true
  );

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();
  window.addEventListener('resize', function () {
    schedule(true);
  });
})();
