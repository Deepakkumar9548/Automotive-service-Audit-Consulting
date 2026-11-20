/**
 * Automotive Audit Website - Main Interactions & Utilities
 * Controls Back-To-Top button, Dynamic Floating WhatsApp Quick-Connect Widget,
 * smooth scrolling, dynamic footer year, and Hero dynamic focus cycler.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. Floating WhatsApp Quick-Connect Widget
  const waNum = (typeof COMPANY !== 'undefined' && COMPANY.whatsapp) ? COMPANY.whatsapp : '910000000000';
  const waDefaultMsg = encodeURIComponent("Hello, I would like to schedule a Confidential After-Sales Audit Review for our dealership.");

  const floatingWa = document.createElement('a');
  floatingWa.className = 'floating-whatsapp-widget';
  floatingWa.setAttribute('href', `https://wa.me/${waNum}?text=${waDefaultMsg}`);
  floatingWa.setAttribute('target', '_blank');
  floatingWa.setAttribute('rel', 'noopener noreferrer');
  floatingWa.setAttribute('aria-label', 'Schedule Confidential Review on WhatsApp');
  floatingWa.setAttribute('data-company', 'whatsapp-float');
  floatingWa.innerHTML = `
    <span class="floating-wa-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" fill="#25D366"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.47 14.39C17.18 14.24 15.72 13.52 15.45 13.43C15.18 13.33 14.98 13.28 14.78 13.57C14.58 13.87 14.02 14.52 13.84 14.72C13.67 14.92 13.49 14.94 13.2 14.8C12.91 14.65 11.97 14.34 10.86 13.35C9.99 12.58 9.4 11.62 9.23 11.33C9.05 11.04 9.21 10.88 9.36 10.74C9.49 10.61 9.65 10.39 9.8 10.22C9.94 10.05 10 9.93 10.1 9.73C10.2 9.53 10.15 9.36 10.07 9.21C10 9.06 9.41 7.6 9.16 7.01C8.92 6.43 8.68 6.51 8.5 6.5C8.33 6.49 8.13 6.49 7.93 6.49C7.73 6.49 7.41 6.56 7.14 6.86C6.87 7.15 6.11 7.86 6.11 9.32C6.11 10.78 7.17 12.19 7.32 12.39C7.46 12.58 9.41 15.59 12.39 16.88C13.1 17.19 13.66 17.37 14.09 17.51C14.8 17.74 15.45 17.7 15.96 17.63C16.53 17.54 17.72 16.91 17.97 16.21C18.21 15.51 18.21 14.92 18.14 14.79C18.06 14.67 17.87 14.6 17.58 14.45L17.47 14.39Z" fill="white"/>
      </svg>
    </span>
    <span class="floating-wa-label">Schedule on WhatsApp</span>
  `;
  document.body.appendChild(floatingWa);

  // 3. Dynamic Year in Footer
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // 4. Smooth anchor scrolling for in-page hashes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 5. Hero Dynamic Focus Cycler (Zero-Cutoff Smooth Phrase Rotation)
  const focusPhrases = document.querySelectorAll('.focus-phrase');
  if (focusPhrases.length > 1) {
    let currentIdx = 0;
    setInterval(() => {
      const prev = focusPhrases[currentIdx];
      prev.classList.remove('active');
      prev.classList.add('exit');

      currentIdx = (currentIdx + 1) % focusPhrases.length;
      const next = focusPhrases[currentIdx];
      next.classList.remove('exit');
      next.classList.add('active');

      setTimeout(() => {
        prev.classList.remove('exit');
      }, 500);
    }, 2800);
  }
});
