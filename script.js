// ===== SLIDE EFFECTS =====
const slides = document.querySelectorAll(".slide");
let index = 0;

function nextSlide() {
    slides[index].classList.remove("active");
    index++;

    if (index >= slides.length) {
        clearInterval(slideInterval);
        document.getElementById("finalMessage").classList.add("show");
        launchFireworks();
        return;
    }

    slides[index].classList.add("active");
}

let slideInterval = setInterval(nextSlide, 4000);


// ===== HOA RƠI =====
const flowerContainer = document.querySelector(".flowers");

function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    // Chỉ hoa 🌸
    flower.innerText = "🌸";

    // Vị trí ngang random
    flower.style.left = Math.random() * 100 + "vw";

    // Thời gian rơi random
    flower.style.animationDuration = 4 + Math.random() * 4 + "s";

    // Kích thước random
    flower.style.fontSize = (isMobile ? 12 : 18) + Math.random() * (isMobile ? 10 : 22) + "px";

    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 9000);
}

// Kiểm tra mobile
const isMobile = window.innerWidth <= 768;

// Mobile rơi chậm hơn (ít hoa hơn)
const flowerInterval = isMobile ? 600 : 250;

setInterval(createFlower, flowerInterval);

// ===== PHÁO HOA =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let fireworks = [];
let particles = [];

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.speed = 5;
    }

    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.explode();
            return true;
        }
        return false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    explode() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(this.x, this.y));
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 4 + 1;
        this.life = 100;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life--;
        return this.life <= 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks = fireworks.filter(f => { f.draw(); return !f.update(); });
    particles = particles.filter(p => { p.draw(); return !p.update(); });

    requestAnimationFrame(animate);
}

animate();

function launchFireworks() {
    setInterval(() => {
        fireworks.push(new Firework());
    }, 850);
}

// ===== NÚT BẬT TẮT NHẠC =====
const music = document.getElementById("bgmusic");
const toggleBtn = document.getElementById("musicToggle");

let isPlaying = false;

toggleBtn.addEventListener("click", () => {
    if (!isPlaying) {
        music.muted = false;
        music.play();
        toggleBtn.innerText = "🔊";
        isPlaying = true;
    } else {
        music.pause();
        toggleBtn.innerText = "🔇";
        isPlaying = false;
    }
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
