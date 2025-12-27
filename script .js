/* ===============================
   Tailwind Config
   =============================== */
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                brand: {
                    blue: '#2563eb',
                    purple: '#7c3aed',
                }
            }
        }
    }
};

/* ===============================
   AOS Animation
   =============================== */
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    delay: 100
});

/* ===============================
   Mobile Menu Functionality (SAFE)
   =============================== */
(() => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        body.style.overflow = 'hidden';
    });

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            body.style.overflow = 'auto';
        });
    }

    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            body.style.overflow = 'auto';
        });
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.add('hidden');
            body.style.overflow = 'auto';
        }
    });
})();

/* ===============================
   Theme Toggle
   =============================== */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

function loadTheme() {
    if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

loadTheme();

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

/* ===============================
   Smart Navbar Resize & Glass Effect
   =============================== */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
        // Height short when scroll
        nav.classList.remove('h-16', 'sm:h-20');
        nav.classList.add('h-14', 'sm:h-16');
    } else {
        nav.classList.remove('scrolled');
        nav.classList.remove('h-14', 'sm:h-16');
        nav.classList.add('h-16', 'sm:h-20');
    }
});
/* ===============================
   Direct Enquiry Form (EmailJS) - FIXED & TESTED
   =============================== */
document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Button animation state
            const btn = enquiryForm.querySelector("button[type='submit']");
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.disabled = true;
            btn.classList.add("opacity-70", "cursor-not-allowed");

            // Data Preparation (Using names instead of placeholders)
            const templateParams = {
                from_name: enquiryForm.querySelector('input[name="from_name"]').value,
                phone: enquiryForm.querySelector('input[name="phone"]').value,
                reply_to: enquiryForm.querySelector('input[name="reply_to"]').value, // Email address
                course: enquiryForm.querySelector('select[name="course"]').value,
                message: enquiryForm.querySelector('textarea[name="message"]').value
            };

            // Debugging: Check console to see what data is being sent
            console.log("Sending Data:", templateParams);

            // Send Email
            emailjs.send(
                "service_l75rv24",  //  Service ID
                "template_0uorrqc", // Template ID
                templateParams
            )
            .then((response) => {
                console.log("✅ SUCCESS!", response.status, response.text);
                
                // Show Success Message
                alert("✅ Enquiry Sent Successfully! We will contact you soon.");
                
                // Reset Form
                enquiryForm.reset();
            })
            .catch((error) => {
                console.error("❌ FAILED...", error);
                alert("❌ Failed to send. Please check your internet connection or try again later.\nError: " + JSON.stringify(error));
            })
            .finally(() => {
                // Reset Button
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove("opacity-70", "cursor-not-allowed");
            });
        });
    }
});

/* ===============================
   Scroll Progress Bar
   =============================== */
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + "%";
    }
});

/* ===============================
   Active Mobile Navigation
   =============================== */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && href.includes(current)) {
            item.classList.add('active');
        }
        if (current === '' && href === '#') {
            item.classList.add('active');
        }
    });
});

/* ===============================
   Typing Effect
   =============================== */
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const words = ['AI', 'Future', 'Tech', ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeEffect() {
        if (isPaused) return;
        
        const currentWord = words[wordIndex];
        
        if (!isDeleting && charIndex <= currentWord.length) {
            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex >= 0) {
            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(typeEffect, 1000);
        }
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Pause on hover
    typingText.parentElement.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    typingText.parentElement.addEventListener('mouseleave', () => {
        isPaused = false;
        setTimeout(typeEffect, 500);
    });
});

/* ===============================
   AI Loader (FIXED)
   =============================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("aiLoader");
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";
            loader.style.transition = "opacity 0.8s ease";
            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }
    }, 200);
});

/* ===============================
   TECH PARTICLE ANIMATION
   =============================== */
const initParticles = () => {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Canvas Size Set
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle Window Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Mouse Interaction (Optional: Particles run away from mouse)
    const mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            
            const isDark = document.documentElement.classList.contains('dark');
            // Light mode mein thoda dark blue, Dark mode mein cyan
            ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(37, 99, 235, 0.8)'; 
            ctx.fill();
        }

        // Update particle position
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            // Mouse repulsion
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 10;
                if (mouse.x > this.x && this.x > 10) this.x -= 10;
                if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 10;
                if (mouse.y > this.y && this.y > 10) this.y -= 10;
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Initialize Particles
    function init() {
        particlesArray = [];
        // Calculate number of particles based on screen size
        let numberOfParticles = (canvas.height * canvas.width) / 9000; 
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5; // Speed
            let directionY = (Math.random() * 1) - 0.5; // Speed
            let color = '#2563eb';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    const isDark = document.documentElement.classList.contains('dark');
                    // Line opacity calculation ke baad
                    ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacityValue})` : `rgba(37, 99, 235, ${opacityValue})`;
                    ctx.lineWidth = 1.5; // Lines thodi moti ki taaki dikhe
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    init();
    animate();
};

// Run after DOM load
document.addEventListener('DOMContentLoaded', initParticles);