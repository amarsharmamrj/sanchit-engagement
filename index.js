 // Floating Petals Animation
 function createPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 25;
    const petalIcons = ['❀', '✿', '❁', '🌸', '💮'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = petalIcons[Math.floor(Math.random() * petalIcons.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = Math.random() * 100 + 'vh';
        petal.style.fontSize = (Math.random() * 25 + 15) + 'px';
        petal.style.animationDuration = (Math.random() * 8 + 6) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petalsContainer.appendChild(petal);
    }
}

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('April 24, 2025 16:00:00 GMT+0200').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

if (window.matchMedia("(min-width: 769px)").matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const updateCursor = () => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorFollower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .detail-card, .story-image img');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) scale(1.5)';
            cursorFollower.style.width = '20px';
            cursorFollower.style.height = '20px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) scale(1)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
}

// 3D Tilt Effect
const tiltElements = document.querySelectorAll('.tilt-element');

if (window.matchMedia("(min-width: 769px)").matches) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        tiltElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementY = rect.top + rect.height/2;
            const elementX = rect.left + rect.width/2;
            
            const relY = (e.clientY - elementY) / elementY;
            const relX = (e.clientX - elementX) / elementX;
            
            element.style.transform = `perspective(1000px) rotateX(${relY * 5}deg) rotateY(${relX * 5}deg)`;
        });
    });

    document.addEventListener('mouseleave', () => {
        tiltElements.forEach(element => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize
window.onload = function() {
    createPetals();
    updateCountdown();
    setInterval(updateCountdown, 1000);
};