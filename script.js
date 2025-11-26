// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Original index.html functionality ---
    // Burger menu toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
        });
    }

    // AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Team card flip logic (for .dev-card in index.html)
    const devCards = document.querySelectorAll('.dev-card');
    devCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

        // Idle Floating Effect for .dev-card
        anime({
            targets: card,
            translateY: ['-3px', '3px'],
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 3000 + Math.random() * 1000 // Randomize duration slightly
        });
    });

    // --- Particle Network Background (using particles.js) ---
    // Initialize particles.js on the #particles-js element from index.html
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', { // Target #particles-js
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00bcd4" // Neon blue
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg", // Ensure this path is correct if used
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00bcd4",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // --- Parallax on Mouse Move ---
    // Note: index.html uses #particles-js for background, not #background-animation
    const particlesJsContainer = document.getElementById('particles-js');
    const mainContent = document.querySelector('.main-content'); // This might not exist in index.html directly

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const offsetX = (mouseX - centerX) / centerX;
        const offsetY = (mouseY - centerY) / centerY;

        // Apply parallax to particles.js background
        if (particlesJsContainer) {
            particlesJsContainer.style.transform = `translate(${offsetX * 10}px, ${offsetY * 10}px)`;
        }

        // Apply subtle parallax to main content (if .main-content exists in index.html)
        // For index.html, we might want to apply this to sections or the body itself
        // For now, let's target the body or a more general container if needed.
        // If mainContent is null, this won't cause an error.
        if (mainContent) {
            mainContent.style.transform = `translate(${offsetX * -5}px, ${offsetY * -5}px)`;
        } else {
            // Fallback for index.html if .main-content is not used
            document.body.style.transform = `translate(${offsetX * -5}px, ${offsetY * -5}px)`;
        }
    });

    // --- Neon Cursor Trail ---
    const cursorTrailContainer = document.getElementById('cursor-trail');
    const trailColors = ['#00bcd4', '#00e676', '#ffeb3b', '#ff4081']; // Neon colors

    if (cursorTrailContainer) {
        document.addEventListener('mousemove', (e) => {
            const particle = document.createElement('div');
            particle.classList.add('trail-particle');
            cursorTrailContainer.appendChild(particle);

            const size = Math.random() * 5 + 5; // Size between 5 and 10
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${e.clientX - size / 2}px`;
            particle.style.top = `${e.clientY - size / 2}px`;
            particle.style.backgroundColor = trailColors[Math.floor(Math.random() * trailColors.length)];

            anime({
                targets: particle,
                opacity: [1, 0],
                scale: [0, 1],
                translateX: () => anime.random(-10, 10),
                translateY: () => anime.random(-10, 10),
                duration: 800,
                easing: 'easeOutQuad',
                complete: () => {
                    particle.remove();
                }
            });
        });
    }


    // --- Tilt Effects on Developer Cards ---
    // This applies to .developer-card from workflow.html, but also .dev-card from index.html
    const allTiltCards = document.querySelectorAll('.developer-card, .dev-card');

    allTiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const rotateX = (mouseY - cardCenterY) / cardRect.height * 30; // Max 30 degrees
            const rotateY = (mouseX - cardCenterX) / cardRect.width * -30; // Max 30 degrees

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // --- Scroll Animations (Fade + Slide) ---
    // AOS is already handling scroll animations for index.html.
    // This custom scroll animation will be redundant or conflict.
    // I will disable this custom scroll animation for now, relying on AOS.
    // If the user wants to replace AOS with this, they should remove AOS links.

    // const animateOnScroll = (entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             anime({
    //                 targets: entry.target,
    //                 opacity: [0, 1],
    //                 translateY: [50, 0],
    //                 duration: 1000,
    //                 easing: 'easeOutQuad',
    //                 delay: 200 // Small delay for better effect
    //             });
    //             observer.unobserve(entry.target); // Only animate once
    //         }
    //     });
    // };

    // const observer = new IntersectionObserver(animateOnScroll, {
    //     root: null, // viewport
    //     threshold: 0.1 // Trigger when 10% of item is visible
    // });

    // // Observe sections or specific elements
    // const sectionsToAnimate = document.querySelectorAll('.page-title, .developer-grid-container, .workflow-container');
    // sectionsToAnimate.forEach(section => {
    //     observer.observe(section);
    // });
});
