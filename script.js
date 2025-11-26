document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
    });

    // GSAP Hero Animations
    gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1,
        ease: "power3.out"
    });
    gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });
    gsap.from(".hero-button", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
    });
    gsap.from(".scroll-indicator", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        ease: "power3.out"
    });

    // Header Slide-down Animation
    gsap.to(".fixed-header", {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        onComplete: () => {
            document.querySelector('.fixed-header').classList.add('header-visible');
        }
    });

    // Mobile Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burgerMenu.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
            }
        });
    });

    // Developer Team Section Animations
    const developers = [
        { name: "Alice", role: "Frontend", bio: "Expert in React & UI design", avatar: "public/images/avatar-alice.png" },
        { name: "Bob", role: "Backend", bio: "Node.js & MongoDB specialist", avatar: "public/images/avatar-bob.png" },
        { name: "Charlie", role: "Fullstack", bio: "Handles both frontend and backend", avatar: "public/images/avatar-charlie.png" },
        { name: "David", role: "UX/UI", bio: "Designs smooth user experience", avatar: "public/images/avatar-david.png" },
        { name: "Eve", role: "QA", bio: "Ensures bug-free software", avatar: "public/images/avatar-eve.png" },
        { name: "Frank", role: "DevOps", bio: "Automates deployment & servers", avatar: "public/images/avatar-frank.png" },
        { name: "Grace", role: "Mobile", bio: "Mobile app specialist", avatar: "public/images/avatar-grace.png" },
        { name: "Hank", role: "AI/ML", bio: "Integrates AI features", avatar: "public/images/avatar-hank.png" },
        { name: "Ivy", role: "Project Manager", bio: "Coordinates team & roadmap", avatar: "public/images/avatar-ivy.png" }
    ];

    // Function to create developer cards (if not already in HTML)
    // Since cards are already in HTML, we'll just animate them.

    // Staggered fade-in for dev cards (AOS is already handling this, but we can add more with anime.js if needed)
    // For now, AOS data-aos="fade-up" and data-aos-delay is sufficient for staggered load.

    // Hover effects for dev cards
    document.querySelectorAll('.dev-card').forEach(card => {
        let isFlipped = false;
        const devAvatar = card.querySelector('.dev-avatar');

        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutExpo'
            });
            anime({
                targets: devAvatar,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutExpo'
            });

            // Add mousemove listener for tilt effect
            card.addEventListener('mousemove', handleTilt);
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                rotateX: 0, // Reset tilt
                rotateY: 0, // Reset tilt
                duration: 300,
                easing: 'easeOutExpo'
            });
            anime({
                targets: devAvatar,
                scale: 1,
                duration: 300,
                easing: 'easeOutExpo'
            });

            // Remove mousemove listener
            card.removeEventListener('mousemove', handleTilt);
        });

        function handleTilt(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * 10; // Max tilt 10deg
            const rotateY = (x - centerX) / centerX * -10; // Max tilt -10deg

            anime({
                targets: card,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 50, // Smooth transition for tilt
                easing: 'linear',
                autoplay: true
            });
        }

        // Flip card for bio on click
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        // Idle float animation
        const floatAnimation = anime({
            targets: card,
            translateY: ['-5px', '5px'], // Move up and down by 5px
            duration: 3000,
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true,
            autoplay: true,
            // Stagger the start of each card's animation
            delay: anime.random(0, 1000) // Random delay between 0 and 1000ms
        });

        // Pause float animation on hover and resume on mouseleave
        card.addEventListener('mouseenter', () => {
            floatAnimation.pause();
        });

        card.addEventListener('mouseleave', () => {
            floatAnimation.play();
        });
    });

    // Optional: Lenis for smooth scrolling
    /*
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    */

    // Initialize particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Neon Cursor Trail
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);

        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;

        anime({
            targets: trail,
            scale: [0, 1],
            opacity: [1, 0],
            translateX: anime.random(-10, 10),
            translateY: anime.random(-10, 10),
            duration: 800,
            easing: 'easeOutQuad',
            complete: () => {
                trail.remove();
            }
        });
    });
});
