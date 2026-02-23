(function () {
  'use strict';

  // ----- Scroll progress bar -----
  var progressFill = document.getElementById('scrollProgressFill');
  function updateProgress() {
    if (!progressFill) return;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
    progressFill.setAttribute('aria-valuenow', Math.round(pct));
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ----- Floating nav: show after scroll -----
  var floatingNav = document.getElementById('floatingNav');
  var navLinks = document.querySelectorAll('.floating-nav__link');
  var sectionIds = ['intro', 'challenge', 'opportunity', 'superpower', 'framework', 'sessions', 'success', 'global-map', 'commit', 'impact'];

  function updateNavVisibility() {
    if (!floatingNav) return;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 120) {
      floatingNav.classList.add('is-visible');
    } else {
      floatingNav.classList.remove('is-visible');
    }
  }

  function getActiveSection() {
    var scrollTop = window.scrollY + 100;
    var active = sectionIds[0];
    for (var i = sectionIds.length - 1; i >= 0; i--) {
      var el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollTop) {
        active = sectionIds[i];
        break;
      }
    }
    return active;
  }

  function setActiveNavLink(activeId) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      var id = href && href.charAt(0) === '#' ? href.slice(1) : '';
      if (id === activeId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  function onScroll() {
    updateNavVisibility();
    setActiveNavLink(getActiveSection());
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);

  // Smooth scroll for nav links (prevent default and scroll into view)
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ----- Hero / animate-in on load -----
  function revealHero() {
    var heroElements = document.querySelectorAll('.section--hero .animate-in');
    heroElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHero);
  } else {
    revealHero();
  }

  // ----- Scroll-triggered section animations -----
  var observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section:not(.section--hero)').forEach(function (section) {
    section.classList.add('animate-in');
    observer.observe(section);
  });

  // ----- Session cards: expand / collapse -----
  document.querySelectorAll('.session-card__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var id = btn.getAttribute('aria-controls');
      var detail = id ? document.getElementById(id) : null;
      if (detail) {
        detail.hidden = expanded;
        btn.setAttribute('aria-expanded', !expanded);
        btn.textContent = expanded ? 'Learn more' : 'Show less';
      }
    });
  });

  // ----- Map filters -----
  var regionStats = {
    all:  { people: 329, na: 180, apac: 59, emea: 70, latam: 20, cities: { na: '25 cities', apac: '3 cities', emea: '16 cities', latam: '4 cities' } },
    na:   { people: 180, cities: '25 cities' },
    apac: { people: 59, cities: '3 cities' },
    emea: { people: 70, cities: '16 cities' },
    latam: { people: 20, cities: '4 cities' }
  };

  function updateGlobalStat(roleFilter, regionFilter) {
    var statEl = document.getElementById('globalStat');
    if (!statEl) return;
    var total = regionFilter === 'all' ? 329 : regionStats[regionFilter].people;
    var regionLabel = regionFilter === 'all' ? '4 regions' : '1 region';
    statEl.textContent = total + ' Product Management & Design People across ' + regionLabel;
  }

  function updateRegionTable(regionFilter) {
    var rows = [
      { key: 'na', peopleId: 'stat-na-people', citiesId: 'stat-na-cities' },
      { key: 'apac', peopleId: 'stat-apac-people', citiesId: 'stat-apac-cities' },
      { key: 'emea', peopleId: 'stat-emea-people', citiesId: 'stat-emea-cities' },
      { key: 'latam', peopleId: 'stat-latam-people', citiesId: 'stat-latam-cities' }
    ];
    rows.forEach(function (row) {
      var data = regionStats[row.key];
      var show = regionFilter === 'all' || regionFilter === row.key;
      document.getElementById(row.peopleId).textContent = show ? data.people : '—';
      document.getElementById(row.citiesId).textContent = show ? data.cities : '—';
    });
  }

  var activeRole = 'all';
  var activeRegion = 'all';

  function updateMapDots(regionFilter) {
    document.querySelectorAll('.map-dot').forEach(function (dot) {
      var region = dot.getAttribute('data-region');
      var show = regionFilter === 'all' || regionFilter === region;
      dot.classList.toggle('is-hidden', !show);
    });
  }

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      var value = btn.getAttribute('data-value');
      document.querySelectorAll('.filter-btn[data-filter="' + filter + '"]').forEach(function (b) {
        b.classList.remove('filter-btn--active');
      });
      btn.classList.add('filter-btn--active');
      if (filter === 'role') activeRole = value;
      if (filter === 'region') {
        activeRegion = value;
        updateRegionTable(value);
        updateGlobalStat(activeRole, value);
        updateMapDots(value);
      }
    });
  });
})();
