// ===================== INTRO ANIMATION =====================
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const target = 'EXCENTRIC';
const spans = document.querySelectorAll('#intro-excentric span');

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

if (document.getElementById('intro-year')) {
  setTimeout(() => {
    document.getElementById('intro-year').classList.add('show');
  }, 200);

  setTimeout(() => {
    document.getElementById('intro-arteo').classList.add('show');
  }, 700);

  setTimeout(() => {
    document.getElementById('intro-divider').classList.add('grow');
  }, 1100);

  setTimeout(() => {
    spans.forEach((span, i) => {
      span.textContent = randomChar();
      let iterations = 0;
      const maxIter = 8 + i * 3;
      const interval = setInterval(() => {
        span.textContent = randomChar();
        span.style.color = `hsl(${Math.random() * 60 + 20}, 70%, ${50 + Math.random() * 20}%)`;
        iterations++;
        if (iterations >= maxIter) {
          clearInterval(interval);
          span.textContent = target[i];
          span.style.color = '#e8d5a8';
        }
      }, 60);
    });
  }, 1500);

  setTimeout(() => {
    document.getElementById('intro-sub').classList.add('show');
  }, 3400);

  setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.style.transition = 'opacity 1s ease';
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      const main = document.getElementById('main');
      if(main) main.classList.add('visible');
    }, 1000);
  }, 4800);
} else {
  const main = document.getElementById('main');
  if(main) main.classList.add('visible');
}

// ===================== SCROLL REVEAL =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===================== FUNCTION HELPER 3D TILT =====================
function setup3dTilt(cardElement, swipeDirection, targetUrl) {
  if (!cardElement) return;

  cardElement.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";

  cardElement.addEventListener('mousemove', function(e) {
    if (this.classList.contains('clicked')) return; 

    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * -20; 
    const rotateY = ((centerX - x) / centerX) * -20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
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

  cardElement.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('clicked');

    this.style.transition = "transform 0.3s ease";
    this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;

    setTimeout(() => {
      this.style.transform = "";
      this.classList.add(swipeDirection);

      setTimeout(() => {
        window.location.href = targetUrl || this.href;
      }, 750);
    }, 300);
  });
}

setup3dTilt(document.getElementById('card-ketua'), 'card-swipe-left', 'member.html');
setup3dTilt(document.getElementById('card-wakil'), 'card-swipe-right', 'logo.html');

const cloudObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const cloudLayer = document.getElementById('cloud-layer');
      const emptyContent = document.getElementById('empty-content');
      
      if(cloudLayer) cloudLayer.classList.add('active');
      if(emptyContent) emptyContent.classList.add('active');
    }
  });
}, { threshold: 0 });

const triggerPoint = document.getElementById('cloud-trigger');
if (triggerPoint) {
  cloudObserver.observe(triggerPoint);
}

const cardWakil = document.getElementById('card-wakil');

if (cardWakil) {
  cardWakil.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('clicked');

    this.style.transition = "transform 0.2s ease";
    this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

    setTimeout(() => {
      this.style.transform = ""; 
      this.classList.add('card-zoom-logo');

      setTimeout(() => {
        window.location.href = this.href;
      }, 900);
    }, 200);
  });
}