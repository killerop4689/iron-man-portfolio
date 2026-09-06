/* js/navigation.js */
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.sub-nav-btn');
    const sections = document.querySelectorAll('.portfolio-section');


        const achievementsData = [
        { heading: "TCS AI HACKATHON — WINNER", lines: [
            "> Won 1st place at TCS AI Hackathon, building an AI-driven solution to a real enterprise problem statement.",
            "> Automated a manual, time-consuming workflow into an AI-powered pipeline, cutting operational hours.",
            "> Led ideation and implementation, turning a broad business problem into a working solution under time pressure."
        ]},
        
        { heading: "COMPETITIVE PROGRAMMING", lines: [
            "> Solved 450+ DSA problems across major platforms.",
            "> Regularly compete in weekly and bi-weekly coding contests.",
            "> Apply optimized data structures and algorithms to solve real-world style problems."
        ]}
    ];
    let achievementsTyped = false;

    function typeAchievements() {
        if (achievementsTyped) return;
        achievementsTyped = true;
        const el = document.getElementById('achievements-output');
        el.innerHTML = '';

        let blockIndex = 0, lineIndex = 0, charIndex = 0;

        function typeNext() {
            if (blockIndex >= achievementsData.length) return;
            const block = achievementsData[blockIndex];

            if (lineIndex === 0 && charIndex === 0) {
                const h = document.createElement('div');
                h.className = 'achv-heading';
                h.textContent = block.heading;
                el.appendChild(h);
            }

            if (lineIndex >= block.lines.length) {
                blockIndex++; lineIndex = 0; charIndex = 0;
                setTimeout(typeNext, 300);
                return;
            }

            let lineEl = el.lastChild.classList && el.lastChild.classList.contains('achv-line') ? el.lastChild : null;
            if (!lineEl || charIndex === 0) {
                lineEl = document.createElement('div');
                lineEl.className = 'achv-line';
                el.appendChild(lineEl);
            }

            const line = block.lines[lineIndex];
            lineEl.textContent = line.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex >= line.length) {
                lineIndex++; charIndex = 0;
            }
            setTimeout(typeNext, 12);
        }
        typeNext();
    }

    // 1. STANDARD SECTIONS DASHBOARD VIEW SWITCHER
    function switchView(targetId, pushHistory = true) {
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
        });
        sections.forEach(sec => {
            sec.classList.toggle('active-view', sec.id === targetId);
        });

       
        if (targetId === 'skills') typeAchievements();

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
                if (window.AudioEngine) {
                    window.AudioEngine.playCue('iamironman.mp3');
                    setTimeout(() => { window.AudioEngine.playCue('snap.mp3'); }, 2000);
                }
                gridView.classList.add('fade-out-view');
                setTimeout(() => {
                    gridView.style.display = 'none';
                    gridView.classList.remove('fade-out-view');
                    const detail = document.getElementById('detail-proj-1');
                    detail.style.display = 'block';
                    detail.classList.add('fade-in-view');
                }, 800);
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