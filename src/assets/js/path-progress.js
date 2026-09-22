// Optional, purely client-side "mark as read" progress for a reading-path
// page. No account, no backend, no analytics, just localStorage, scoped per
// path. If storage is unavailable (private browsing, blocked, etc.) the
// checkboxes still work as plain checkboxes, they just won't persist; no
// navigation on the page depends on this succeeding.
(function () {
  var STORAGE_PREFIX = "thefish:path-progress:";

  function storageKey(pathSlug) {
    return STORAGE_PREFIX + pathSlug;
  }

  function readProgress(pathSlug) {
    try {
      var raw = localStorage.getItem(storageKey(pathSlug));
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeProgress(pathSlug, urls) {
    try {
      localStorage.setItem(storageKey(pathSlug), JSON.stringify(urls));
    } catch (e) {
      // Progress is a non-essential enhancement, fail silently.
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var progressEl = document.getElementById("path-progress");
    var checkboxes = document.querySelectorAll(".path-read-checkbox");
    if (!progressEl || !checkboxes.length) return;

    var pathSlug = progressEl.dataset.path;
    var essentialTotal = parseInt(progressEl.dataset.essentialTotal, 10) || 0;
    var read = readProgress(pathSlug);

    function updateCounter() {
      if (!essentialTotal) return;
      var essentialRead = 0;
      checkboxes.forEach(function (cb) {
        if (cb.checked && cb.dataset.priority === "essential") essentialRead += 1;
      });
      progressEl.hidden = false;
      progressEl.textContent = essentialRead + " of " + essentialTotal + " essential articles read";
    }

    checkboxes.forEach(function (cb) {
      if (read.indexOf(cb.dataset.url) !== -1) cb.checked = true;
      cb.addEventListener("change", function () {
        var current = readProgress(pathSlug);
        var idx = current.indexOf(cb.dataset.url);
        if (cb.checked && idx === -1) current.push(cb.dataset.url);
        if (!cb.checked && idx !== -1) current.splice(idx, 1);
        writeProgress(pathSlug, current);
        updateCounter();
      });
    });

    updateCounter();
  });
})();
