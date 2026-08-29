/**
 * ARTEO EXCENTRIC — Interactive Scripts & Card Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation();
  initCard3DTilt();
  initCardClickAnimations();
  initMemberCardFlip();
});

/* ==========================================================================
   0. INTRO SCRAMBLE & REVEAL ANIMATION
   ========================================================================== */
function initIntroAnimation() {
  const intro = document.getElementById('intro');
  const pageWrapper = document.querySelector('.page-wrapper');
  
  if (!intro) {
    if (pageWrapper) pageWrapper.classList.add('visible');
    return;
  }

  // Allow instant skip via query parameter ?nointro=1
  if (window.location.search.includes('nointro')) {
    intro.style.display = 'none';
    if (pageWrapper) pageWrapper.classList.add('visible');
    return;
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  const target = 'EXCENTRIC';
  const spans = document.querySelectorAll('#intro-excentric span');
  let introCompleted = false;

  function finishIntro() {
    if (introCompleted) return;
    introCompleted = true;

    intro.style.opacity = '0';
    intro.style.visibility = 'hidden';
    setTimeout(() => {
      intro.style.display = 'none';
      if (pageWrapper) pageWrapper.classList.add('visible');
    }, 800);
  }

  // Skip button click
  const skipBtn = document.getElementById('intro-skip');
  if (skipBtn) {
    skipBtn.addEventListener('click', finishIntro);
  }

  // Allow clicking anywhere on intro to fast-forward / skip
  intro.addEventListener('click', (e) => {
    if (e.target !== skipBtn) finishIntro();
  });

  // Animation Timeline
  setTimeout(() => {
    const yr = document.getElementById('intro-year');
    if (yr) yr.classList.add('show');
  }, 250);

  setTimeout(() => {
    const art = document.getElementById('intro-arteo');
    if (art) art.classList.add('show');
  }, 750);

  setTimeout(() => {
    const div = document.getElementById('intro-divider');
    if (div) div.classList.add('grow');
  }, 1150);

  setTimeout(() => {
    spans.forEach((span, i) => {
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      let iterations = 0;
      const maxIter = 8 + i * 3;
      const interval = setInterval(() => {
        if (introCompleted) {
          clearInterval(interval);
          return;
        }
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.color = `hsl(${Math.random() * 50 + 30}, 85%, ${55 + Math.random() * 25}%)`;
        iterations++;
        if (iterations >= maxIter) {
          clearInterval(interval);
          span.textContent = target[i];
          span.style.color = '#dfbe81';
        }
      }, 55);
    });
  }, 1500);

  setTimeout(() => {
    const sub = document.getElementById('intro-sub');
    if (sub) sub.classList.add('show');
  }, 3300);

  setTimeout(() => {
    finishIntro();
  }, 4800);
}

/* ==========================================================================
   1. 3D TILT EFFECT ON CARDS
   ========================================================================== */
function setup3dTilt(cardElement) {
  if (!cardElement) return;

  cardElement.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";

  cardElement.addEventListener('mousemove', function(e) {
    if (this.classList.contains('clicked')) return; 

    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * -15; 
    const rotateY = ((centerX - x) / centerX) * -15;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  cardElement.addEventListener('mouseleave', function() {
    if (this.classList.contains('clicked')) return;
    this.style.transition = "transform 0.4s ease"; 
    this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    
    setTimeout(() => {
      if (!this.classList.contains('clicked')) {
        this.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";
      }
    }, 400);
  });
}

function initCard3DTilt() {
  const cardStructure = document.getElementById('card-structure');
  const cardHistory = document.getElementById('card-history');
  setup3dTilt(cardStructure);
  setup3dTilt(cardHistory);
}

/* ==========================================================================
   2. CARD CLICK ANIMATIONS (SWIPE LEFT & ZOOM TO LOGO)
   ========================================================================== */
function initCardClickAnimations() {
  // Card 1: Structure -> Swipe Left Animation
  const cardStructure = document.getElementById('card-structure');
  if (cardStructure) {
    cardStructure.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.classList.contains('clicked')) return;
      this.classList.add('clicked');

      this.style.transition = "transform 0.2s ease";
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

      setTimeout(() => {
        this.style.transform = "";
        this.classList.add('card-swipe-left');

        setTimeout(() => {
          window.location.href = this.href;
        }, 750);
      }, 200);
    });
  }

  // Card 2: History -> Zoom in to Logo Center Animation
  const cardHistory = document.getElementById('card-history');
  if (cardHistory) {
    cardHistory.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.classList.contains('clicked')) return;
      this.classList.add('clicked');

      this.style.transition = "transform 0.2s ease";
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

      setTimeout(() => {
        this.style.transform = "";
        this.classList.add('card-zoom-logo');

        setTimeout(() => {
          window.location.href = this.href;
        }, 850);
      }, 150);
    });
  }
}

/* ==========================================================================
   3. FLIP CARD ON TOUCH DEVICES (MEMBER PAGE)
   ========================================================================== */
function initMemberCardFlip() {
  const flipContainers = document.querySelectorAll('.flip-container');
  if (!flipContainers.length) return;

  flipContainers.forEach(container => {
    container.addEventListener('click', function(e) {
      this.classList.toggle('flipped');
    });
  });
}