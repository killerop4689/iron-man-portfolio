/* js/navigation.js */
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.sub-nav-btn');
    const sections = document.querySelectorAll('.portfolio-section');

    // 1. STANDARD SECTIONS DASHBOARD VIEW SWITCHER
    function switchView(targetId, pushHistory = true) {
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
        });
        sections.forEach(sec => {
            sec.classList.toggle('active-view', sec.id === targetId);
        });
        
        // Reset sub-project detail panels if shifting completely away from the primary project tab
        if (targetId !== 'projects') {
            const gridView = document.getElementById('projects-grid-view');
            if (gridView) {
                gridView.style.display = 'block';
                gridView.classList.remove('ash-disintegrate');
            }
            document.querySelectorAll('.project-detail-view').forEach(v => v.style.display = 'none');
        }

        if (pushHistory) {
            history.pushState({ view: targetId }, '', `#${targetId}`);
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchView(button.getAttribute('data-target'));
        });
    });

    // 2. PROJECT SELECTION CLICK ROUTERS WITH STARK ANIMATIONS
    const viewProjBtns = document.querySelectorAll('.view-proj-btn');
    const backGridBtns = document.querySelectorAll('.back-grid-btn');

    viewProjBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenProj = btn.getAttribute('data-project');
            const gridView = document.getElementById('projects-grid-view');

            if (chosenProj === 'proj-1') {
                // --- PROJECT 1 TIMELINE ENGINE: INFINITY GAUNTLET ASHE SNAP ---
                const screen1 = document.getElementById('proj1-animation-screen');
                const gauntlet = document.getElementById('infinity-gauntlet');

                if (screen1 && gauntlet) {
                    screen1.classList.remove('hidden');
                    gauntlet.classList.add('snap-lift');

                    if (window.AudioEngine) {
                        window.AudioEngine.playCue('iamironman.mp3');
                        setTimeout(() => { window.AudioEngine.playCue('snap.mp3'); }, 2000);
                    }

                    // Fire dust disintegration timeline exactly at the snap cue frame
                    setTimeout(() => {
                        gridView.classList.add('ash-disintegrate');
                    }, 2000);

                    // Seamless content loading swap once disintegration completes
                    setTimeout(() => {
                        gridView.style.display = 'none';
                        document.getElementById('detail-proj-1').style.display = 'block';
                        screen1.classList.add('hidden');
                        gauntlet.classList.remove('snap-lift');
                    }, 3200);
                }

            } else if (chosenProj === 'proj-2') {
                // --- PROJECT 2 TIMELINE ENGINE: DUM-E FIRE EXTINGUISHER SMOKE CORE ---
                const screen2 = document.getElementById('proj2-animation-screen');
                const robotArm = document.getElementById('dume-robot-arm');
                const smokeCloud = document.getElementById('smoke-cloud-layer');

                if (screen2 && robotArm && smokeCloud) {
                    screen2.classList.remove('hidden');
                    robotArm.classList.add('dume-sweep');

                    if (window.AudioEngine) {
                        window.AudioEngine.playCue('donate.mp3');
                        setTimeout(() => { window.AudioEngine.playCue('extinguisher.mp3'); }, 1800);
                    }

                    // Drop chemical smoke cover overlay down the viewport space
                    smokeCloud.classList.add('run-smoke');

                    // Swap cards silently behind the thick smoke screen
                    setTimeout(() => {
                        gridView.style.display = 'none';
                        document.getElementById('detail-proj-2').style.display = 'block';
                    }, 2400);

                    // Clean up animation canvas flags from memory tree
                    setTimeout(() => {
                        screen2.classList.add('hidden');
                        robotArm.classList.remove('dume-sweep');
                        smokeCloud.classList.remove('run-smoke');
                    }, 3200);
                }
            }
        });
    });

    // Close directive action buttons to reverse project subviews back to grids
    backGridBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const gridView = document.getElementById('projects-grid-view');
            if (gridView) {
                gridView.classList.remove('ash-disintegrate');
                gridView.style.display = 'block';
            }
            document.querySelectorAll('.project-detail-view').forEach(v => v.style.display = 'none');
        });
    });

    // 3. POPSTATE ROUTING ENGINE BACK INTERCEPTORS FOR PHONE PREFERENCE KEYS
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.view) {
            switchView(e.state.view, false);
        } else {
            switchView('intro', false);
        }
    });
});
