// Scroll-in animation observer
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};


// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu after tapping a link
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);


// Observe all elements with scroll-in-right class
document.querySelectorAll('.scroll-in-right').forEach(el => {
  observer.observe(el);
});


// Copy to clipboard functionality
// Extracts text while converting <br> tags to real newlines, so line
// breaks in the source HTML (e.g. the consent line before "Thank you")
// survive into the copied/pasted text instead of running words together.
function getTextWithBreaks(el) {
  if (!el) return '';
  let text = '';
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeName === 'BR') {
      text += '\n';
    } else {
      text += node.textContent;
    }
  });
  return text;
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const target = this.getAttribute('data-copy-target');
    let textToCopy = '';


    if (target === 'script') {
      const activeScript = document.querySelector('.script-text:not([hidden])');
      textToCopy = getTextWithBreaks(activeScript);
    } else if (target === 'email') {
      textToCopy = getTextWithBreaks(document.getElementById('email-body-text'));
    }


    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      });
    }
  });
});


// Script length toggle
document.querySelectorAll('.length-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const length = this.getAttribute('data-length');
    
    // Update active button
    document.querySelectorAll('.length-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    // Show/hide appropriate script
    document.querySelectorAll('.script-text').forEach(text => {
      if (text.getAttribute('data-script') === length) {
        text.removeAttribute('hidden');
      } else {
        text.setAttribute('hidden', '');
      }
    });
  });
});


// Make tooltip work in safari on mobile
document.querySelectorAll('.law-tooltip-container').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = el.classList.contains('active');
    document.querySelectorAll('.law-tooltip-container.active')
      .forEach(open => open.classList.remove('active'));
    if (!isOpen) el.classList.add('active');
  });
});


document.addEventListener('click', () => {
  document.querySelectorAll('.law-tooltip-container.active')
    .forEach(el => el.classList.remove('active'));
});

// Learn resources carousel
const learnViewport = document.getElementById('learn-viewport');
const learnTrack = document.getElementById('learn-track');
const learnPrevBtn = document.getElementById('learn-prev');
const learnNextBtn = document.getElementById('learn-next');
const learnDotsWrap = document.getElementById('learn-dots');

if (learnViewport && learnTrack && learnPrevBtn && learnNextBtn && learnDotsWrap) {
  const learnSlides = Array.from(learnTrack.querySelectorAll('.learn-card'));
  let currentLearnSlide = 0;

  learnSlides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to resource ${index + 1} of ${learnSlides.length}`);
    dot.addEventListener('click', () => goToLearnSlide(index));
    learnDotsWrap.appendChild(dot);
  });
  const learnDots = Array.from(learnDotsWrap.querySelectorAll('.carousel-dot'));

  function updateLearnCarousel() {
    const viewportLeft = learnViewport.getBoundingClientRect().left;
    currentLearnSlide = learnSlides.reduce((closestIndex, slide, index) => {
      const closestDistance = Math.abs(
        learnSlides[closestIndex].getBoundingClientRect().left - viewportLeft
      );
      const distance = Math.abs(slide.getBoundingClientRect().left - viewportLeft);
      return distance < closestDistance ? index : closestIndex;
    }, 0);

    learnDots.forEach((dot, index) => {
      if (index === currentLearnSlide) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    learnPrevBtn.disabled = currentLearnSlide === 0;
    learnNextBtn.disabled = currentLearnSlide === learnSlides.length - 1;
  }

  function goToLearnSlide(index) {
    const slide = learnSlides[index];
    const offset = slide.getBoundingClientRect().left - learnViewport.getBoundingClientRect().left;
    learnViewport.scrollTo({
      left: learnViewport.scrollLeft + offset,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    currentLearnSlide = index;
  }

  learnPrevBtn.addEventListener('click', () => goToLearnSlide(currentLearnSlide - 1));
  learnNextBtn.addEventListener('click', () => goToLearnSlide(currentLearnSlide + 1));
  learnViewport.addEventListener('scroll', updateLearnCarousel, { passive: true });
  window.addEventListener('resize', updateLearnCarousel);
  updateLearnCarousel();
}

// Seen in Auburn — modal carousel
const seenOpenBtn = document.getElementById('seen-in-auburn-open');
const seenModal = document.getElementById('seen-in-auburn-modal');
const seenCloseBtn = document.getElementById('seen-in-auburn-close');
const seenTrack = document.getElementById('seen-track');
const seenPrevBtn = document.getElementById('seen-prev');
const seenNextBtn = document.getElementById('seen-next');
const seenDotsWrap = document.getElementById('seen-dots');

if (seenOpenBtn && seenModal && seenCloseBtn && seenTrack) {
  const slides = Array.from(seenTrack.querySelectorAll('.seen-slide'));
  let currentSlide = 0;

  // Build dots to match however many slides exist, so this stays correct
  // even as slides are added/removed from the template.
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to photo ${i + 1} of ${slides.length}`);
    dot.addEventListener('click', () => goToSlide(i));
    seenDotsWrap.appendChild(dot);
  });
  const dots = Array.from(seenDotsWrap.querySelectorAll('.carousel-dot'));

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    seenTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  if (seenPrevBtn) seenPrevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (seenNextBtn) seenNextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  const openSeenModal = () => {
    seenModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    goToSlide(0);
    seenCloseBtn.focus();
  };
  const closeSeenModal = () => {
    seenModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    seenOpenBtn.focus();
  };

  seenOpenBtn.addEventListener('click', openSeenModal);
  seenCloseBtn.addEventListener('click', closeSeenModal);

  // Close when clicking the dark overlay itself, not the modal content
  seenModal.addEventListener('click', (e) => {
    if (e.target === seenModal) closeSeenModal();
  });

  // Escape closes the modal; left/right arrows navigate slides
  document.addEventListener('keydown', (e) => {
    if (seenModal.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeSeenModal();
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });
}


// News coverage sort (Most Recent / A-Z / Local) — Resources page
const newsGrid = document.getElementById('news-grid');
const newsSortBtns = document.querySelectorAll('.news-sort-btn');
if (newsGrid && newsSortBtns.length) {
  newsSortBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.getAttribute('data-sort');

      newsSortBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const cards = Array.from(newsGrid.querySelectorAll('.news-card'));

      cards.sort((a, b) => {
        if (mode === 'alpha') {
          const titleA = a.querySelector('h3').textContent.trim().toLowerCase();
          const titleB = b.querySelector('h3').textContent.trim().toLowerCase();
          return titleA.localeCompare(titleB);
        }
        if (mode === 'local') {
          // Cards tagged data-local-order (Auburn, then Grass Valley, then
          // Roseville) always come first, in that explicit order. Anything
          // untagged falls after, sorted by most recent.
          const localA = parseInt(a.getAttribute('data-local-order'), 10);
          const localB = parseInt(b.getAttribute('data-local-order'), 10);
          const hasLocalA = !isNaN(localA);
          const hasLocalB = !isNaN(localB);
          if (hasLocalA && hasLocalB) return localA - localB;
          if (hasLocalA) return -1;
          if (hasLocalB) return 1;
          const dateA = a.getAttribute('data-date') || '';
          const dateB = b.getAttribute('data-date') || '';
          return dateB.localeCompare(dateA);
        }
        // 'recent': newest date first
        const dateA = a.getAttribute('data-date') || '';
        const dateB = b.getAttribute('data-date') || '';
        return dateB.localeCompare(dateA);
      });

      cards.forEach(card => newsGrid.appendChild(card));
    });
  });
}
