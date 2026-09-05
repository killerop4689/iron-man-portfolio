/* js/core.js */
document.addEventListener('DOMContentLoaded', () => {
    const initBtn = document.getElementById('init-btn');
    
    // Check Session Storage to instantly bypass the intro on page refreshes
    if (sessionStorage.getItem('jarvis_booted') === 'true') {
        document.getElementById('boot-screen').style.display = 'none';
        document.getElementById('app-container').classList.add('reveal-app');
        document.body.classList.remove('overflow-lock');
        return;
    }

    initBtn.addEventListener('click', () => {
        // Clear out interaction button view layer
        document.getElementById('boot-screen').style.display = 'none';
        
        // Unhide core animation canvas tags
        document.getElementById('animation-screen').classList.remove('hidden');
        document.getElementById('flash-screen').classList.remove('hidden');
        
        // Mount native CSS keyframe timelines via classes
        document.getElementById('repulsor-hand').classList.add('run-hand');
        document.getElementById('repulsor-node').classList.add('run-node');
        document.getElementById('flash-screen').classList.add('run-flash');
        
        // Trigger preloaded audio clips via our audio sandbox layer
       // Change the timeout delay from 1100 to 1400 milliseconds
        if (window.AudioEngine) {
            window.AudioEngine.playCue('charge.mp3', 0.1);
            setTimeout(() => { window.AudioEngine.playCue('blast.mp3', 0.5); }, 1400);
        }

        // Swap layout components behind the laser flare whitewash peak
        setTimeout(() => {
            document.getElementById('app-container').classList.add('reveal-app');
            document.body.classList.remove('overflow-lock');
            sessionStorage.setItem('jarvis_booted', 'true');
        }, 1300);

        // Fully erase heavy overlay animation DOM structures from memory
        setTimeout(() => {
            const animScreen = document.getElementById('animation-screen');
            const flashScreen = document.getElementById('flash-screen');
            if (animScreen) animScreen.remove();
            if (flashScreen) flashScreen.remove();
        }, 2500);
    });
});
