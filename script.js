// Scroll-in animation observer
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

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
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const target = this.getAttribute('data-copy-target');
    let textToCopy = '';

    if (target === 'script') {
      const activeScript = document.querySelector('.script-text:not([hidden])');
      textToCopy = activeScript ? activeScript.textContent : '';
    } else if (target === 'email') {
      textToCopy = document.getElementById('email-body-text').textContent;
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
