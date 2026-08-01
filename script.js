document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. INTRO ANIMATION ---
    const intro = document.getElementById('intro');
    const progressBar = document.getElementById('intro-progress');
    const loadingText = document.getElementById('loading-text');
    const hasPlayed = sessionStorage.getItem('introPlayed');

    if (!hasPlayed) {
        document.body.style.overflow = 'hidden'; // prevent scrolling during intro
        const messages = ["Initializing...", "Loading Assets...", "Connecting to Server...", "Fetching Server Status...", "Ready."];
        let progress = 0;
        let msgIndex = 0;

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5; 
            if (progress >= 100) progress = 100;
            
            progressBar.style.width = progress + '%';

            // Change text based on progress
            if (progress > 20 && msgIndex === 0) { loadingText.innerText = messages[++msgIndex]; }
            if (progress > 50 && msgIndex === 1) { loadingText.innerText = messages[++msgIndex]; }
            if (progress > 80 && msgIndex === 2) { loadingText.innerText = messages[++msgIndex]; }
            if (progress === 100 && msgIndex === 3) { loadingText.innerText = messages[++msgIndex]; }

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    intro.style.opacity = '0';
                    setTimeout(() => {
                        intro.style.display = 'none';
                        document.body.style.overflow = 'auto'; // restore scroll
                        sessionStorage.setItem('introPlayed', 'true');
                    }, 1000);
                }, 800);
            }
        }, 300);
    } else {
        intro.style.display = 'none';
    }

    // --- 2. CUSTOM CURSOR ---
    const cursor = document.querySelector('.cursor');
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Small delay for glow effect
        setTimeout(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effect for interactive elements
    const interactables = document.querySelectorAll('a, button, .glass');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover-effect'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover-effect'));
    });

    // --- 3. FLOATING PARTICLES ---
    const particlesContainer = document.getElementById('particles-js');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        let size = Math.random() * 5 + 2; // 2px to 7px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        
        let duration = Math.random() * 10 + 5; // 5s to 15s
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }

    // --- 4. SCROLL PROGRESS & NAVBAR ---
    const scrollProgress = document.querySelector('.scroll-progress');
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.scrollHeight - window.innerHeight;
        let scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Sticky Navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- 5. SCROLL REVEAL ANIMATION ---
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- 6. COPY IP FUNCTIONALITY ---
    const copyBtn = document.getElementById('copyIp');
    const ipText = document.getElementById('server-ip').innerText;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ipText).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#00ff88';
            copyBtn.style.color = '#000';
            copyBtn.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.6)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
                copyBtn.style.boxShadow = '';
            }, 2000);
        });
    });

    // --- 7. ACCORDION (RULES) ---
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others
            accordions.forEach(item => {
                if (item !== acc) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current
            acc.classList.toggle('active');
            const content = acc.querySelector('.accordion-content');
            if (acc.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 40 + "px"; // padding offset
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- 8. BACKGROUND MUSIC TOGGLE ---
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.2; // Keep it low

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicBtn.style.color = 'var(--red-primary)';
            musicBtn.style.textShadow = '0 0 10px var(--red-glow)';
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicBtn.style.color = '';
            musicBtn.style.textShadow = '';
        }
    });

    // --- 9. MOCK API FOR SERVER STATUS (PING SIMULATION) ---
    // In a real scenario, use fetch() to hit a Bedrock API endpoint
    setInterval(() => {
        const pingElement = document.getElementById('server-ping');
        const currentPing = parseInt(pingElement.innerText);
        // Fluctuate ping slightly
        const newPing = currentPing + (Math.floor(Math.random() * 5) - 2); 
        pingElement.innerText = (newPing > 10 ? newPing : 10) + 'ms';
    }, 5000);

});

