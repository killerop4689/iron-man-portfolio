/* js/audio.js */
window.AudioEngine = {
    backgroundMusic: null, isMuted: true,
    preloadedCharge: new Audio('assets/sounds/charge.mp3'),
    preloadedBlast: new Audio('assets/sounds/blast.mp3'),
    
    // NEW SEQUENTIAL AUDIO PRELOAD MATRICES
    soundImIronMan: new Audio('assets/sounds/iamironman.mp3'),
    soundSnap: new Audio('assets/sounds/snap.mp3'),
    soundDonate: new Audio('assets/sounds/donate.mp3'),
    soundExtinguisher: new Audio('assets/sounds/extinguisher.mp3'),

    playCue(filename) {
        try {
            if (filename === 'charge.mp3') { this.preloadedCharge.volume = 0.4; this.preloadedCharge.play().catch(()=>{}); }
            else if (filename === 'blast.mp3') { this.preloadedBlast.volume = 0.5; this.preloadedBlast.play().catch(()=>{}); }
            
            // PROJECT SPECIFIC TRIGGERS
            else if (filename === 'iamironman.mp3') { this.soundImIronMan.volume = 0.6; this.soundImIronMan.play().catch(()=>{}); }
            else if (filename === 'snap.mp3') { this.soundSnap.volume = 0.6; this.soundSnap.play().catch(()=>{}); }
            else if (filename === 'donate.mp3') { this.soundDonate.volume = 0.6; this.soundDonate.play().catch(()=>{}); }
            else if (filename === 'extinguisher.mp3') { this.soundExtinguisher.volume = 0.5; this.soundExtinguisher.play().catch(()=>{}); }
        } catch (e) {}
    },
    // ... rest of toggleBackgroundLoop script stays the same ...


    toggleBackgroundLoop(buttonEl) {
        try {
            if (!this.backgroundMusic) {
                this.backgroundMusic = new Audio('assets/sounds/ambient.mp3');
                this.backgroundMusic.loop = true;
                this.backgroundMusic.volume = 0.3;
            }
            if (this.isMuted) {
                this.backgroundMusic.play().then(() => {
                    this.isMuted = false;
                    buttonEl.innerText = "MUSIC: ON";
                }).catch(()=>{});
            } else {
                this.backgroundMusic.pause();
                this.isMuted = true;
                buttonEl.innerText = "MUSIC: OFF";
            }
        } catch (err) {}
    }
};
