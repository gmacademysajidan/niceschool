/**
* Template Name: NiceSchool
* Template URL: https://bootstrapmade.com/nice-school-bootstrap-education-template/
* Updated: May 10 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on page links and toggle dropdowns on mobile
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const hasSubmenu = this.nextElementSibling && this.nextElementSibling.tagName === 'UL';
      const isMobileNavActive = document.querySelector('.mobile-nav-active');
      const isMobileScreen = window.innerWidth < 1200;

      if (hasSubmenu && (isMobileNavActive || isMobileScreen || href === '#' || href === 'javascript:void(0);')) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        if (this.parentNode) {
          this.parentNode.classList.toggle('active');
        }
        if (this.nextElementSibling) {
          this.nextElementSibling.classList.toggle('dropdown-active');
        }
        return;
      }

      if (href === '#' || href === 'javascript:void(0);') {
        e.preventDefault();
        return;
      }

      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns on icon or dropdown item click
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const parentA = this.closest('a');
      const parentLi = this.closest('li');
      const targetUl = (parentA && parentA.nextElementSibling) || (parentLi && parentLi.querySelector('ul'));

      if (parentA) parentA.classList.toggle('active');
      if (parentLi) parentLi.classList.toggle('active');
      if (targetUl) targetUl.classList.toggle('dropdown-active');
    });
  });

  document.querySelectorAll('.navmenu .dropdown').forEach(dropdownLi => {
    dropdownLi.addEventListener('click', function(e) {
      const isMobileNavActive = document.querySelector('.mobile-nav-active');
      const isMobileScreen = window.innerWidth < 1200;

      if (!isMobileNavActive && !isMobileScreen) return;

      // Do not trigger if clicking on sub-menu links inside an already expanded dropdown
      const subUl = this.querySelector(':scope > ul');
      if (!subUl) return;

      if (e.target.closest('a') && e.target.closest('a').parentNode !== this && e.target.closest('a').closest('ul') === subUl) {
        return;
      }

      const directA = this.querySelector(':scope > a');
      if (e.target === directA || e.target.parentNode === directA || e.target === this) {
        e.preventDefault();
        e.stopPropagation();
        if (directA) directA.classList.toggle('active');
        this.classList.toggle('active');
        subUl.classList.toggle('dropdown-active');
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  let waFloat = document.querySelector('.whatsapp-float');

  function toggleScrollTop() {
    if (scrollTop) {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
        if (waFloat) waFloat.classList.add('scroll-active');
      } else {
        scrollTop.classList.remove('active');
        if (waFloat) waFloat.classList.remove('scroll-active');
      }
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();