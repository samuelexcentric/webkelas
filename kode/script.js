/**
 * ARTEO EXCENTRIC — Interactive Scripts & Magic Particles
 */

document.addEventListener('DOMContentLoaded', () => {
  initMagicParticles();
  initCard3DTilt();
  initMemberCardFlip();
});

/* ==========================================================================
   1. FLOATING MAGICAL PARTICLES & FIREFLIES CANVAS
   ========================================================================== */
function initMagicParticles() {
  const canvas = document.getElementById('magic-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.45 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.008 + 0.003;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      // Warm golden tones: rgba(245, 220, 160) to rgba(255, 235, 190)
      this.r = 240 + Math.floor(Math.random() * 15);
      this.g = 200 + Math.floor(Math.random() * 35);
      this.b = 130 + Math.floor(Math.random() * 50);
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      this.opacity += this.fadeSpeed * this.fadeDir;
      if (this.opacity >= 0.85) {
        this.opacity = 0.85;
        this.fadeDir = -1;
      } else if (this.opacity <= 0.1) {
        this.opacity = 0.1;
        this.fadeDir = 1;
      }

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
      ctx.shadowBlur = this.size * 5;
      ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity * 0.8})`;
      ctx.fill();
    }
  }

  // Generate particle count based on screen size
  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. 3D TILT EFFECT ON CARDS
   ========================================================================== */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.art-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const perspectiveBox = card.querySelector('.card-perspective');
    if (!perspectiveBox) return;

    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      perspectiveBox.style.transition = 'transform 0.1s ease-out';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const maxTilt = 12; // Degrees
      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;

      perspectiveBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    }

    function onMouseLeave() {
      perspectiveBox.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      perspectiveBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    // Smooth navigation with subtle press feedback
    card.addEventListener('click', function(e) {
      if (this.getAttribute('href')) {
        perspectiveBox.style.transform = 'perspective(1000px) scale3d(0.97, 0.97, 0.97)';
      }
    });
  });
}

/* ==========================================================================
   3. FLIP CARD ON TOUCH DEVICES (MEMBER PAGE)
   ========================================================================== */
function initMemberCardFlip() {
  const flipContainers = document.querySelectorAll('.flip-container');
  if (!flipContainers.length) return;

  flipContainers.forEach(container => {
    container.addEventListener('click', function(e) {
      // Toggle flip class on mobile tap
      this.classList.toggle('flipped');
    });
  });
}