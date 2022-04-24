// Script for Navigation Bar
let navHamMenu = document.getElementById("nav-ham-menu");
let navMenu = document.getElementById("nav-menu");
let homeLink = document.getElementById("home-link");
let aboutLink = document.getElementById("about-link");
let projectsLink = document.getElementById("projects-link");
let contactLink = document.getElementById("contact-link");

navHamMenu.onclick = function() {
    navHamMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
}

homeLink.onclick = function() {
    navHamMenu.classList.remove("active");
    navMenu.classList.remove("active");
    location.href = "#home";
}

aboutLink.onclick = function() {
    navHamMenu.classList.remove("active");
    navMenu.classList.remove("active");
    location.href = "#about";
}

projectsLink.onclick = function() {
    navHamMenu.classList.remove("active");
    navMenu.classList.remove("active");
    location.href = "#projects";
}

contactLink.onclick = function() {
    navHamMenu.classList.remove("active");
    navMenu.classList.remove("active");
    location.href = "#contact";
}

// Script for particle effect
const canvas = document.getElementById("home-canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = (Math.random() * 2) + 1;
        this.directionX = (Math.random() * 3) - 1.5;
        this.directionY = (Math.random() * 3) - 1.5;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        ctx.closePath();
    }
    update() {
        // Making particles bounce within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY
        }

        this.x += this.directionX;
        this.y += this.directionY;
    }
}

function init() {
    for (let i = 0; i < 70; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < particleArray.length; j++) {
        particleArray[j].draw();
        particleArray[j].update();
    }
    connect();
    requestAnimationFrame(animate);
}

function connect() {
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) 
            * (particleArray[a].x - particleArray[b].x)) 
            + ((particleArray[a].y - particleArray[b].y) 
            * (particleArray[a].y - particleArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                let opacityValue = 0.5 - (distance/7000);
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.addEventListener('click', function() {
    if (particleArray.length > 300) {
        particleArray = [];
        init();
    } else {
        init();
    }
})

init();
animate();
