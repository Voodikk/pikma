const starsEl = document.getElementById('stars');
for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%; top:${Math.random() * 100}%;
    --d:${2 + Math.random() * 4}s;
    --dl:${Math.random() * 5}s;
  `;
    starsEl.appendChild(s);
}

const sparklePositions = [
    { x: '8%', y: '18%', tx: '-28px', ty: '-32px', tx2: '-48px', ty2: '-72px' },
    { x: '88%', y: '12%', tx: '28px', ty: '-32px', tx2: '50px', ty2: '-70px' },
    { x: '4%', y: '62%', tx: '-32px', ty: '10px', tx2: '-58px', ty2: '26px' },
    { x: '92%', y: '58%', tx: '30px', ty: '12px', tx2: '54px', ty2: '30px' },
    { x: '50%', y: '4%', tx: '4px', ty: '-38px', tx2: '8px', ty2: '-70px' },
    { x: '28%', y: '95%', tx: '-16px', ty: '26px', tx2: '-30px', ty2: '58px' },
    { x: '72%', y: '93%', tx: '16px', ty: '26px', tx2: '30px', ty2: '58px' },
];
const sparkleColors = ['#ffb3e6', '#d0a0ff', '#ffe0f0', '#c0d0ff'];

const sparklesEl = document.getElementById('sparkles');
sparklePositions.forEach((p, i) => {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.cssText = `
    left:${p.x}; top:${p.y};
    background:${sparkleColors[i % sparkleColors.length]};
    --d2:${1.4 + Math.random() * 0.8}s;
    --dl2:${i * 0.28}s;
    --tx:${p.tx}; --ty:${p.ty};
    --tx2:${p.tx2}; --ty2:${p.ty2};
  `;
    sparklesEl.appendChild(sp);
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particleColors = ['#c080ff', '#ff80c0', '#80a0ff'];
const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.35 + 0.08,
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
}));

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}
animateParticles();

setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}, 400);

function triggerConfetti() {
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-fall';

        heart.innerHTML = '❤';

        heart.style.left = 20 + Math.random() * 60 + '%';
        heart.style.top = '-20px';
        heart.style.fontSize = (14 + Math.random() * 18) + 'px';
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        heart.style.opacity = Math.random();

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    }
}

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const intro = document.getElementById('intro');
const mainContent = document.getElementById('mainContent');
const welcomeText = document.getElementById('welcomeText');
const questionBlock = document.getElementById('questionBlock');
const questionText = document.getElementById('questionText');

let noClicks = 0;

const noMessages = [
    "Кажется ты не поняла, нужно кликнуть \"ДА\" 😌",
    "Возможно у тебя какие-то проблемы со зрением, давай еще раз 💭",
    "Ну пожалуйста... 🥺",
    "Я старался вообще-то 😄",
    "Последний шанс! ✨",
    "Ну всё, я обиделся 😤",
    "Давай я тебе немного помогу... 😏"
];

setTimeout(() => {
    welcomeText.style.display = "none";
    questionBlock.style.display = "block";
}, 6000);

yesBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    mainContent.style.display = 'block';

    setTimeout(() => {
        mainContent.classList.add('show');
    }, 50);
});

let offsetX = 0;
let offsetY = 0;

noBtn.addEventListener('click', () => {
    if (noClicks < noMessages.length) {
        questionText.textContent = noMessages[noClicks];
        questionText.style.transform = 'scale(1.02)';
        setTimeout(() => {
            questionText.style.transform = 'scale(1)';
        }, 100);
    }

    noClicks++;

    offsetX += 20;
    offsetY += 30;

    const randomX = (Math.random() - 0.5) * 15;
    const randomY = (Math.random() - 0.5) * 10;

    noBtn.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)';
    noBtn.style.transform = `translate(${offsetX + randomX}px, ${offsetY + randomY}px)`;

    const scale = Math.max(0.7, 1 - (noClicks * 0.04));
    noBtn.style.transform += ` scale(${scale})`;

    if (noClicks >= 7) {
        noBtn.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
        noBtn.style.opacity = '0';
        setTimeout(() => {
            noBtn.style.display = 'none';
        }, 300);
    }

    if (yesBtn) {
        yesBtn.style.transition = 'transform 0.15s ease';
        yesBtn.style.transform = 'scale(1.08)';
        setTimeout(() => {
            yesBtn.style.transform = 'scale(1)';
        }, 150);
    }
});

function resetNoButton() {
    offsetX = 0;
    offsetY = 0;
    noClicks = 0;
    noBtn.style.transform = 'translate(0px, 0px) scale(1)';
    noBtn.style.opacity = '1';
    noBtn.style.display = 'inline-block';
    questionText.textContent = noMessages[0] || "Ты согласна?";
}

const originalNoClick = noBtn.addEventListener;
noBtn.addEventListener('click', () => {
    createRippleEffect(yesBtn);
});

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.pointerEvents = 'none';

    const rect = element.getBoundingClientRect();
    ripple.style.left = `${rect.left + rect.width / 2 - 5}px`;
    ripple.style.top = `${rect.top + rect.height / 2 - 5}px`;

    document.body.appendChild(ripple);

    ripple.animate([
        { transform: 'scale(1)', opacity: 0.4 },
        { transform: 'scale(30)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playBetterBubbleSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const now = audioCtx.currentTime;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.2;
    gainNode.connect(audioCtx.destination);

    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 400;
    osc1.connect(gainNode);
    osc1.start();
    osc1.stop(now + 0.15);

    const osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 800;
    osc2.connect(gainNode);
    osc2.start();
    osc2.stop(now + 0.1);

    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

document.addEventListener('click', (event) => {
    playBetterBubbleSound();
});