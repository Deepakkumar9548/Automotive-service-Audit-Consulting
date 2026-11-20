/**
 * Automotive Audit Website - Navigation & Header Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const dropdownTriggers = document.querySelectorAll('.nav-item.has-dropdown');

  // Sticky Header scroll detection
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mainNav.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      // Update hamburger icon SVG
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        if (isActive) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });
  }

  // Mobile dropdown toggle on click
  dropdownTriggers.forEach((item) => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1140) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // Active page detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-item.has-dropdown');
      if (parentDropdown) {
        parentDropdown.querySelector('.nav-link')?.classList.add('active');
      }
    }
  });
});
