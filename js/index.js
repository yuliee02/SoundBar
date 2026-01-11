/**
 * GenieTV Soundbar Landing Page
 * - 햄버거 메뉴
 * - Top 버튼
 * - 스크롤 애니메이션
 */
(function() {
  'use strict';

  // ===== DOM 요소 =====
  var hamburger = document.querySelector('.hamburger');
  var gnb = document.querySelector('.gnb');
  var gnbLinks = document.querySelectorAll('.gnb-list a');
  var btnTop = document.querySelector('.btn-top');

  // ===== 햄버거 메뉴 =====
  function closeMenu() {
    if (!hamburger || !gnb) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    gnb.classList.remove('active');
  }

  if (hamburger && gnb) {
    // 토글
    hamburger.addEventListener('click', function() {
      var isOpen = hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      gnb.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 닫기
    gnbLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && gnb.classList.contains('active')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // 바깥 클릭 시 닫기
    document.addEventListener('click', function(e) {
      if (!gnb.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // ===== Top 버튼 =====
  if (btnTop) {
    var ticking = false;
    
    btnTop.style.opacity = '0';
    btnTop.style.pointerEvents = 'none';
    btnTop.style.transition = 'opacity .3s';

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          var show = window.scrollY > 400;
          btnTop.style.opacity = show ? '1' : '0';
          btnTop.style.pointerEvents = show ? 'auto' : 'none';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ===== 스크롤 애니메이션 =====
  var aniElements = document.querySelectorAll('.ani, .ani-stagger');
  
  if (aniElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-show');
          observer.unobserve(entry.target); // 한 번만 실행
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    });

    aniElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // 미지원 브라우저: 즉시 표시
    aniElements.forEach(function(el) {
      el.classList.add('is-show');
    });
  }

})();
