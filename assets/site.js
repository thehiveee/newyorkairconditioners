/* New York Air Conditioners — shared behaviour: live NYC time, exit-intent offer, countdown. */
(function () {
  'use strict';

  // ---- Live New York time in the sticky banner -------------------------------------------
  function nyTime() {
    try {
      return new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' });
    } catch (e) { return 'right now'; }
  }
  function tickClock() {
    document.querySelectorAll('[data-nytime]').forEach(function (el) { el.textContent = nyTime(); });
  }
  tickClock();
  setInterval(tickClock, 30000);


  var loadedAt = Date.now();

  // ---- Conversion tracking (Vercel Web Analytics; GA4 too if consented) -------------------
  function track(name, data) {
    try { if (window.va) window.va('event', { name: name, data: data || {} }); } catch (e) {}
    try { if (window.gtag) window.gtag('event', name.toLowerCase().replace(/\s+/g, '_'), data || {}); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) track('Call click', { page: location.pathname });
  });

  // ---- Optional Google Analytics 4 behind a cookie consent banner -------------------------
  // Only active when <meta name="ga4-id" content="G-XXXXXXX"> is filled in. Vercel Web Analytics
  // is cookieless and runs without consent.
  (function () {
    var meta = document.querySelector('meta[name="ga4-id"]');
    var id = meta && meta.content.trim();
    if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;
    var KEY = 'nyac-consent';
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    function loadGA() {
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', id, { anonymize_ip: true });
    }
    if (choice === 'granted') { loadGA(); return; }
    if (choice === 'denied') return;
    var box = document.createElement('div');
    box.className = 'consent'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Cookie choice');
    box.innerHTML = '<p>We’d like to use analytics cookies to see how visitors use this site. ' +
      'You can say no and everything still works. <a href="/privacy">Privacy Policy</a></p>' +
      '<div><button type="button" class="ok">Accept</button><button type="button" class="no">Decline</button></div>';
    document.body.appendChild(box);
    function decide(v) { try { localStorage.setItem(KEY, v); } catch (e) {} box.remove(); if (v === 'granted') loadGA(); }
    box.querySelector('.ok').addEventListener('click', function () { decide('granted'); });
    box.querySelector('.no').addEventListener('click', function () { decide('denied'); });
  })();

  // ---- Hero callback form (posts to the form's action via FormSubmit's AJAX endpoint) -----
  var form = document.querySelector('form.leadform');
  if (form) {
    var status = form.parentNode.querySelector('[data-form-status]');
    var done = form.parentNode.querySelector('[data-form-done]');
    var btn = form.querySelector('.lf-submit');
    var setErr = function (el, msg) {
      el.setAttribute('aria-invalid', 'true'); status.textContent = msg; el.focus();
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      form.querySelectorAll('[aria-invalid]').forEach(function (n) { n.removeAttribute('aria-invalid'); });
      var name = form.elements['Name'], phone = form.elements['Phone'], svc = form.elements['Service'];
      if (!name.value.trim()) return setErr(name, 'Please tell us your name.');
      var digits = phone.value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) return setErr(phone, 'Please enter a valid phone number so we can call you.');
      if (!svc.value) return setErr(svc, 'Please choose a service.');
      var hp = form.elements['_honey'];
      var tooFast = (Date.now() - loadedAt) < 3000;          // humans take longer than 3 s to fill this in
      if ((hp && hp.value) || tooFast) { form.hidden = true; done.hidden = false; return; }   // bot: pretend success
      btn.disabled = true; var label = btn.textContent; btn.textContent = 'Sending…';
      fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form)
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && String(res.j.success) !== 'false') {
            form.hidden = true; done.hidden = false;
            track('Callback request', { service: svc.value });
            var h = done.querySelector('h3'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
          } else { throw new Error('bad'); }
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = label;
          status.textContent = "Sorry, that didn't send. Please call (646) 692-0033 and we'll help right away.";
        });
    });
  }

  // ---- Exit-intent discount offer --------------------------------------------------------
  var offer = document.getElementById('offer');
  if (!offer) return;

  var KEY = 'nyac-offer-seen';
  var shown = false, timer = null, left = 600, lastFocus = null;
  var countdownEls = offer.querySelectorAll('[data-countdown]');

  function seenBefore() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function markSeen() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }

  function render() {
    var m = Math.floor(left / 60), s = left % 60;
    var t = m + ':' + (s < 10 ? '0' : '') + s;
    countdownEls.forEach(function (el) { el.textContent = t; });
  }

  function open() {
    if (shown || seenBefore()) return;
    shown = true; markSeen();
    left = 600; render();
    lastFocus = document.activeElement;
    offer.hidden = false;
    var btn = offer.querySelector('button[aria-label="Close"]');
    if (btn) btn.focus();
    timer = setInterval(function () { if (left > 0) { left -= 1; render(); } }, 1000);
  }

  function close() {
    offer.hidden = true;
    clearInterval(timer);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  offer.querySelectorAll('[data-close-offer]').forEach(function (el) { el.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !offer.hidden) close(); });

  // Desktop: pointer leaves through the top of the window (toward tabs / close button).
  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget && e.clientY <= 12) open();
  });

  // Touch devices have no hover, so show it once after 30 seconds instead.
  try {
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) setTimeout(open, 30000);
  } catch (e) {}

  // Focus trap inside the dialog while it is open.
  offer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = offer.querySelectorAll('a[href], button');
    var vis = Array.prototype.filter.call(f, function (n) { return n.offsetParent !== null || n === document.activeElement; });
    if (!vis.length) return;
    var first = vis[0], last = vis[vis.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
