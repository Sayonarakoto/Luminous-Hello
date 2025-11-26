document.addEventListener('DOMContentLoaded', () => {
    // Mock Data
    const mockData = {
        student: {
            name: "Alice",
            // avatar: "student.png" // Not used in this minimal setup
        },
        faculty: {
            name: "Prof. Smith",
            // avatar: "faculty.png" // Not used in this minimal setup
        },
        request: {
            type: "Latecomer Entry",
            time: "9:15 AM",
            reason: "Traffic Jam",
            status: "pending"
        }
    };

    // DOM Elements
    const aliceEl = document.getElementById('alice');
    const profSmithEl = document.getElementById('prof-smith');
    const gencSystemEl = document.getElementById('genc-system');
    const aliceRequestCard = document.getElementById('alice-request-card');
    const profSmithApprovalCard = document.getElementById('prof-smith-approval-card');
    const approveBtn = document.getElementById('approve-btn');
    const declineBtn = document.getElementById('decline-btn');
    const aliceStatusPopup = document.getElementById('alice-status-popup');
    const statusTitle = document.getElementById('status-title');
    const checkmark = aliceStatusPopup.querySelector('.checkmark');
    const cross = aliceStatusPopup.querySelector('.cross');

    const connectorAliceSystem = document.getElementById('connector-alice-system');
    const connectorSystemProf = document.getElementById('connector-system-prof');
    const connectorProfAlice = document.getElementById('connector-prof-alice');
    const connectorSvg = document.querySelector('.connector-svg'); // Get the SVG element

    // Set initial data for cards
    document.getElementById('request-time').textContent = mockData.request.time;
    document.getElementById('request-reason').textContent = mockData.request.reason;
    document.getElementById('approval-student-name').textContent = mockData.student.name;
    document.getElementById('approval-time').textContent = mockData.request.time;
    document.getElementById('approval-reason').textContent = mockData.request.reason;

    // Function to animate a packet along an SVG path
    const animatePacket = (pathEl, color, duration) => {
        const packet = document.createElement('div');
        packet.classList.add('packet');
        packet.style.backgroundColor = color;
        connectorSvg.appendChild(packet); // Append to SVG for positioning context

        const path = anime.path(pathEl);

        return anime({
            targets: packet,
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: duration,
            autoplay: true,
            complete: () => {
                packet.remove();
            }
        });
    };

    // Function to draw SVG path between two elements
    const drawConnector = (pathEl, startEl, endEl) => {
        const start = getElementCenter(startEl);
        const end = getElementCenter(endEl);

        const svgRect = pathEl.ownerSVGElement.getBoundingClientRect();
        const startX = start.x - svgRect.left;
        const startY = start.y - svgRect.top;
        const endX = end.x - svgRect.left;
        const endY = end.y - svgRect.top;

        // Calculate control point for a curved line
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        let controlX, controlY;

        // Adjust control point based on direction for a nice curve
        if (Math.abs(startX - endX) > Math.abs(startY - endY)) { // More horizontal movement
            controlX = midX;
            controlY = midY - 100; // Curve upwards
        } else { // More vertical movement
            controlX = midX + 100; // Curve to the right
            controlY = midY;
        }

        pathEl.setAttribute('d', `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`);
        pathEl.style.opacity = 1;
        const length = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = length;
        pathEl.style.strokeDashoffset = length;
        return length;
    };

    // Function to animate a packet along an SVG path
    const animatePacket = (pathEl, color, duration) => {
        const packet = document.createElement('div');
        packet.classList.add('packet');
        packet.style.backgroundColor = color;
        connectorSvg.appendChild(packet); // Append to SVG for positioning context

        const path = anime.path(pathEl);

        return anime({
            targets: packet,
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: duration,
            autoplay: true,
            complete: () => {
                packet.remove();
            }
        });
    };

    // Function to animate a packet along an SVG path
    const animatePacket = (pathEl, color, duration) => {
        const packet = document.createElement('div');
        packet.classList.add('packet');
        packet.style.backgroundColor = color;
        connectorSvg.appendChild(packet); // Append to SVG for positioning context

        const path = anime.path(pathEl);

        return anime({
            targets: packet,
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: duration,
            autoplay: true,
            complete: () => {
                packet.remove();
            }
        });
    };

    // --- Animation Scenes ---

    const initScene = () => {
        // Hide all elements initially
        anime.set([aliceRequestCard, gencSystemEl, profSmithApprovalCard, aliceStatusPopup], { opacity: 0, scale: 0.8 });
        anime.set([connectorAliceSystem, connectorSystemProf, connectorProfAlice], { opacity: 0 });
        anime.set([checkmark, cross], { opacity: 0, display: 'none' });

        // Start idle animations for characters
        anime({
            targets: aliceEl,
            translateY: [
                { value: -5, duration: 1000, easing: 'easeInOutSine' },
                { value: 0, duration: 1000, easing: 'easeInOutSine' }
            ],
            loop: true,
            direction: 'alternate',
            autoplay: true
        });
        anime({
            targets: profSmithEl,
            translateY: [
                { value: -5, duration: 1000, easing: 'easeInOutSine' },
                { value: 0, duration: 1000, easing: 'easeInOutSine' }
            ],
            loop: true,
            direction: 'alternate',
            autoplay: true
        });
    };

    const scene1AliceSubmits = () => {
        return anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        })
        .add({
            targets: aliceEl,
            translateY: [
                { value: -10, duration: 100, easing: 'easeOutQuad' },
                { value: 0, duration: 200, easing: 'easeOutBounce' }
            ],
            delay: 200
        })
        .add({
            targets: aliceRequestCard,
            opacity: [0, 1],
            translateX: ['-100%', '0%'],
            scale: [0.8, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .5)', // Dynamic entry
            offset: '-=500'
        })
        .add({
            begin: () => {
                const length = drawConnector(connectorAliceSystem, aliceRequestCard, gencSystemEl);
                anime({
                    targets: connectorAliceSystem,
                    strokeDashoffset: [length, 0],
                    opacity: [0, 1],
                    duration: 1500,
                    easing: 'linear'
                });
                animatePacket(connectorAliceSystem, mockData.request.color || '#5AB3FF', 1500); // Animate packet
            },
            offset: '-=200'
        });
    };

    const scene2GENCProcessing = () => {
        return anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        })
        .add({
            targets: gencSystemEl,
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [-10, 0], // Subtle rotation
            duration: 800,
            delay: 500,
            easing: 'easeOutElastic(1, .5)' // More dynamic entry
        })
        .add({
            targets: gencSystemEl,
            scale: [1, 1.1, 1], // More pronounced pulse
            rotate: [0, 5, -5, 0], // Subtle shake during pulse
            duration: 1500,
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate',
            offset: '-=200'
        })
        .add({
            targets: aliceRequestCard,
            translateX: [getElementCenter(aliceRequestCard).x - getElementCenter(gencSystemEl).x, 0], // Move towards system
            translateY: [getElementCenter(aliceRequestCard).y - getElementCenter(gencSystemEl).y, 0],
            opacity: 0, // Fade out as it's "processed"
            duration: 1000,
            easing: 'easeInQuad',
            offset: '-=1000' // Overlap with system pulse
        })
        .add({
            targets: connectorAliceSystem,
            opacity: 0, // Fade out connector
            duration: 500,
            offset: '-=500'
        })
        .add({
            begin: () => {
                anime.remove(gencSystemEl); // Stop pulsing
                const length = drawConnector(connectorSystemProf, gencSystemEl, profSmithApprovalCard);
                anime({
                    targets: connectorSystemProf,
                    strokeDashoffset: [length, 0],
                    opacity: [0, 1],
                    duration: 1500,
                    easing: 'linear'
                });
            },
            offset: '+=500' // After system processing
        });
    };

    const scene3ProfSmithReceives = () => {
        return anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        })
        .add({
            targets: profSmithEl,
            translateY: [
                { value: -10, duration: 100, easing: 'easeOutQuad' },
                { value: 0, duration: 200, easing: 'easeOutBounce' }
            ],
            delay: 500
        })
        .add({
            targets: profSmithApprovalCard,
            opacity: [0, 1],
            translateY: ['-100%', '0%'],
            scale: [0.8, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .5)', // Dynamic entry
            offset: '-=500'
        })
        .add({
            targets: [approveBtn, declineBtn],
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            delay: anime.stagger(100),
            offset: '-=300'
        })
        .add({
            targets: connectorSystemProf,
            opacity: 0, // Fade out connector
            duration: 500,
            offset: '-=500'
        });
    };

    const animateCheckmark = () => {
        checkmark.style.display = 'block';
        return anime.timeline({
            easing: 'easeOutQuad',
            duration: 500
        })
        .add({
            targets: checkmark.querySelector('.checkmark__circle'),
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 600,
            easing: 'cubicBezier(0.65, 0, 0.45, 1)'
        })
        .add({
            targets: checkmark.querySelector('.checkmark__check'),
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 300,
            easing: 'cubicBezier(0.65, 0, 0.45, 1)',
            offset: '-=300'
        })
        .add({
            targets: checkmark,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            offset: '-=500'
        });
    };

    const animateCross = () => {
        cross.style.display = 'block';
        return anime.timeline({
            easing: 'easeOutQuad',
            duration: 500
        })
        .add({
            targets: cross.querySelector('.cross__circle'),
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 600,
            easing: 'cubicBezier(0.65, 0, 0.45, 1)'
        })
        .add({
            targets: cross.querySelectorAll('.cross__path'),
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 300,
            easing: 'cubicBezier(0.65, 0, 0.45, 1)',
            offset: '-=300'
        })
        .add({
            targets: cross,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            offset: '-=500'
        });
    };

    const approveFlow = () => {
        return anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        })
        .add({
            targets: approveBtn,
            scale: [1, 1.1, 1],
            backgroundColor: ['#4CAF50', '#66BB6A'],
            duration: 300,
            easing: 'easeOutQuad'
        })
        .add({
            targets: profSmithApprovalCard,
            scale: [1, 1.05],
            duration: 500,
            offset: 0
        })
        .add({
            targets: profSmithApprovalCard,
            opacity: 0,
            duration: 500,
            offset: '+=500'
        })
        .add({
            targets: profSmithEl,
            translateY: [
                { value: -10, duration: 100, easing: 'easeOutQuad' },
                { value: 0, duration: 200, easing: 'easeOutBounce' }
            ],
            offset: '-=500'
        })
        .add({
            targets: gencSystemEl,
            opacity: 0, // Hide system card
            duration: 300,
            offset: '-=800'
        })
        .add({
            begin: () => {
                aliceStatusPopup.style.backgroundColor = 'rgba(76, 175, 80, 0.1)'; // Green background
                statusTitle.textContent = 'Request Approved!';
                animateCheckmark(); // Call the anime.js function
                const length = drawConnector(connectorProfAlice, profSmithEl, aliceEl);
                anime({
                    targets: connectorProfAlice,
                    strokeDashoffset: [length, 0],
                    opacity: [0, 1],
                    stroke: '#4CAF50', // Green line
                    filter: 'drop-shadow(0 0 5px #4CAF50)',
                    duration: 1500,
                    easing: 'linear'
                });
                animatePacket(connectorProfAlice, '#4CAF50', 1500); // Animate packet
            },
            targets: aliceStatusPopup,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            offset: '-=500'
        })
        .add({
            targets: connectorProfAlice,
            opacity: 0,
            duration: 500,
            delay: 1000
        });
    };

    const declineFlow = () => {
        return anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        })
        .add({
            targets: declineBtn,
            scale: [1, 1.1, 1],
            backgroundColor: ['#F44336', '#EF5350'],
            duration: 300,
            easing: 'easeOutQuad'
        })
        .add({
            targets: profSmithApprovalCard,
            translateX: [-5, 5, 0], // Shake effect
            duration: 300,
            easing: 'easeInOutSine',
            offset: 0
        })
        .add({
            targets: profSmithApprovalCard,
            opacity: 0,
            duration: 500,
            offset: '+=500'
        })
        .add({
            targets: profSmithEl,
            translateX: [
                { value: -5, duration: 100, easing: 'easeOutQuad' },
                { value: 5, duration: 100, easing: 'easeOutQuad' },
                { value: 0, duration: 100, easing: 'easeOutQuad' }
            ],
            offset: '-=500'
        })
        .add({
            targets: gencSystemEl,
            opacity: 0, // Hide system card
            duration: 300,
            offset: '-=800'
        })
        .add({
            begin: () => {
                aliceStatusPopup.style.backgroundColor = 'rgba(244, 67, 54, 0.1)'; // Red background
                statusTitle.textContent = 'Request Declined!';
                animateCross(); // Call the anime.js function
                const length = drawConnector(connectorProfAlice, profSmithEl, aliceEl);
                anime({
                    targets: connectorProfAlice,
                    strokeDashoffset: [length, 0],
                    opacity: [0, 1],
                    stroke: '#F44336', // Red line
                    filter: 'drop-shadow(0 0 5px #F44336)',
                    duration: 1500,
                    easing: 'linear'
                });
                animatePacket(connectorProfAlice, '#F44336', 1500); // Animate packet
            },
            targets: aliceStatusPopup,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            offset: '-=500'
        })
        .add({
            targets: connectorProfAlice,
            opacity: 0,
            duration: 500,
            delay: 1000
        });
    };

    // Event Listeners for buttons
    approveBtn.addEventListener('click', () => {
        anime.remove([approveBtn, declineBtn, profSmithApprovalCard]); // Stop any ongoing animations
        approveFlow();
    });

    declineBtn.addEventListener('click', () => {
        anime.remove([approveBtn, declineBtn, profSmithApprovalCard]); // Stop any ongoing animations
        declineFlow();
    });

    // Reset Button
    const resetBtn = document.getElementById('reset-btn');
    const resetAnimation = () => {
        anime.remove('*'); // Stop all animations
        // Reset elements to initial state
        anime.set([aliceRequestCard, gencSystemEl, profSmithApprovalCard, aliceStatusPopup], { opacity: 0, scale: 0.8, translateX: '0%', translateY: '0%', rotate: 0 });
        anime.set([connectorAliceSystem, connectorSystemProf, connectorProfAlice], { opacity: 0, strokeDashoffset: anime.setDashoffset });
        anime.set([checkmark, cross], { opacity: 0, display: 'none' });
        aliceStatusPopup.style.backgroundColor = ''; // Clear background color
        statusTitle.textContent = ''; // Clear status text

        // Re-start idle animations for characters
        anime({
            targets: aliceEl,
            translateY: [
                { value: -5, duration: 1000, easing: 'easeInOutSine' },
                { value: 0, duration: 1000, easing: 'easeInOutSine' }
            ],
            loop: true,
            direction: 'alternate',
            autoplay: true
        });
        anime({
            targets: profSmithEl,
            translateY: [
                { value: -5, duration: 1000, easing: 'easeInOutSine' },
                { value: 0, duration: 1000, easing: 'easeInOutSine' }
            ],
            loop: true,
            direction: 'alternate',
            autoplay: true
        });

        runWorkflow(); // Restart the workflow
    };
    resetBtn.addEventListener('click', resetAnimation);

    // Orchestrate the scenes
    const runWorkflow = async () => {
        initScene();
        await scene1AliceSubmits().finished;
        await scene2GENCProcessing().finished;
        await scene3ProfSmithReceives().finished;
        // User interaction will trigger approveFlow or declineFlow
    };

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    runWorkflow();
});
