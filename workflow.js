// workflow.js

document.addEventListener('DOMContentLoaded', () => {
    const workflowStatusPanel = document.getElementById('workflow-status');
    const approveBtn = document.getElementById('approve-btn');
    const declineBtn = document.getElementById('decline-btn');

    // Helper function to update status
    const updateStatus = (panel, message) => {
        panel.querySelector('p').textContent = `Status: ${message}`;
    };

    

    // --- Latecomer Approval Workflow ---
    const workflowMock = {
        sender: { name: "Alice", role: "Student" },
        receiver: { name: "Prof. Smith", role: "Faculty" },
        action: ["approve", "decline"]
    };

    const animateLatecomerWorkflow = async (action) => {
        const aliceBubble = document.getElementById('alice-bubble');
        const profSmithBubble = document.getElementById('prof-smith-bubble');
        const requestPacket = document.getElementById('request-packet');

        // Reset for replay
        anime.set(requestPacket, { translateX: 0, translateY: 0, opacity: 0, scale: 1 });
        updateStatus(workflowStatusPanel, 'Initializing Latecomer Approval Workflow...');
        approveBtn.disabled = true;
        declineBtn.disabled = true;

        const alicePos = { x: aliceBubble.offsetLeft + aliceBubble.offsetWidth / 2, y: aliceBubble.offsetTop + aliceBubble.offsetHeight / 2 };
        const profSmithPos = { x: profSmithBubble.offsetLeft + profSmithBubble.offsetWidth / 2, y: profSmithBubble.offsetTop + profSmithBubble.offsetHeight / 2 };

        // Step 1: Alice sends request
        updateStatus(workflowStatusPanel, `${workflowMock.sender.name} (${workflowMock.sender.role}) ➜ sends latecomer request`);
        await anime({
            targets: aliceBubble,
            boxShadow: ['0 0 20px rgba(0, 188, 212, 0.7)', '0 0 5px rgba(0, 188, 212, 0.3)'],
            duration: 800,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: 2
        }).finished;

        anime.set(requestPacket, { opacity: 1, left: alicePos.x, top: alicePos.y });

        // Packet moves along curved path
        await anime({
            targets: requestPacket,
            translateX: profSmithPos.x - alicePos.x,
            translateY: profSmithPos.y - alicePos.y,
            duration: 2000,
            easing: 'easeInOutQuad',
            // Optional: Add glow trail effect (CSS or dynamic element creation)
        }).finished;

        // Step 2: Prof. Smith receives
        updateStatus(workflowStatusPanel, `${workflowMock.receiver.name} (${workflowMock.receiver.role}) ➜ receives request`);
        await anime({
            targets: profSmithBubble,
            translateX: [-5, 5, -5, 5, 0],
            duration: 500,
            easing: 'easeInOutSine'
        }).finished;

        updateStatus(workflowStatusPanel, `${workflowMock.receiver.name} is reviewing...`);
        approveBtn.disabled = false;
        declineBtn.disabled = false;
    };

    // Step 3: Prof. Smith Clicks Approve/Decline
    const finalizeWorkflow = async (action) => {
        const profSmithBubble = document.getElementById('prof-smith-bubble');
        const requestPacket = document.getElementById('request-packet');

        approveBtn.disabled = true;
        declineBtn.disabled = true;

        if (action === 'approve') {
            updateStatus(workflowStatusPanel, `${workflowMock.receiver.name} ➜ Approved latecomer request!`);
            await anime({
                targets: profSmithBubble,
                boxShadow: ['0 0 20px var(--neon-green)', '0 0 5px rgba(40, 167, 69, 0.3)'],
                scale: [1, 1.1, 1],
                duration: 1000,
                easing: 'easeInOutQuad'
            }).finished;
        } else { // decline
            updateStatus(workflowStatusPanel, `${workflowMock.receiver.name} ➜ Declined latecomer request.`);
            await anime({
                targets: profSmithBubble,
                boxShadow: ['0 0 20px var(--neon-red)', '0 0 5px rgba(220, 53, 69, 0.3)'],
                translateX: [-10, 10, -10, 10, 0],
                duration: 800,
                easing: 'easeInOutSine'
            }).finished;
        }

        anime({
            targets: requestPacket,
            opacity: 0,
            duration: 500
        });
    };

    approveBtn.addEventListener('click', () => finalizeWorkflow('approve'));
    declineBtn.addEventListener('click', () => finalizeWorkflow('decline'));

    // Initial calls
    animateLatecomerWorkflow(); // Start the workflow animation
});
