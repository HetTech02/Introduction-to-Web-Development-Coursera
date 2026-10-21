(function () {
  var root = document.documentElement;

  // Restore the saved theme, if any.
  try {
    var saved = localStorage.getItem('hp-theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}

  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Theme toggle.
  document.getElementById('theme').addEventListener('click', function () {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('hp-theme', next); } catch (e) {}
  });

  // Copy email button.
  var copyBtn = document.getElementById('copy');
  var mail = document.getElementById('mail');
  copyBtn.addEventListener('click', function () {
    var text = mail.textContent;
    function done() {
      copyBtn.textContent = 'Copied';
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1500);
    }
    function fallback() {
      var range = document.createRange();
      range.selectNodeContents(mail);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copyBtn.textContent = 'Press Ctrl+C';
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  });

  // Footer year.
  document.getElementById('yr').textContent = new Date().getFullYear();
})();
