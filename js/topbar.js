/* js/topbar.js */
document.addEventListener('DOMContentLoaded', () => {
    // 1. RUN 24-HOUR MILITARY CLOCK ENGINE
    const clockEl = document.getElementById('hud-clock');
    function updateClock() {
     const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.innerText = `${hours}:${minutes}:${seconds}`;
    }
    updateClock();
    setInterval(updateClock, 1000); // Ticks every second

    // 2. BACKGROUND MUSIC TOGGLE
    const musicBtn = document.getElementById('music-toggle');
    musicBtn.addEventListener('click', () => {
    if (window.AudioEngine) {
        window.AudioEngine.toggleBackgroundLoop(musicBtn);
        musicBtn.classList.toggle('music-active', !window.AudioEngine.isMuted);
    }
    }); 
    // 3. DARK / LIGHT THEME ENGINE CONTROLLER
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            themeBtn.innerText = " DARK";
        } else {
            body.classList.add('light-theme');
            themeBtn.innerText = " LIGHT";
        }
    });
});
