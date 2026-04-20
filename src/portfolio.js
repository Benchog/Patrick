// Particle animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const smallScreen = window.innerWidth < 768;
    const lowPowerDevice = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    const particleCount = smallScreen ? 18 : (lowPowerDevice ? 26 : 42);
    const frag = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        frag.appendChild(particle);
    }
    particlesContainer.textContent = '';
    particlesContainer.appendChild(frag);
}

// Rotating text animation
function animateRotatingText() {
    const texts = ['App Builder', 'Problem Solver', 'Innovator', 'AI Builder', 'Solution Creator', 'Dream Chaser'];
    const rotatingElement = document.getElementById('rotatingText');
    if (!rotatingElement) return;
    let currentIndex = 0;
    
    setInterval(() => {
        rotatingElement.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            rotatingElement.textContent = texts[currentIndex];
            rotatingElement.style.opacity = '1';
        }, 300);
    }, 3000);
}

function setTheme(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    document.querySelectorAll('.theme-option-btn[data-theme-choice]').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.theme-option-btn[data-theme-choice="${isDark ? 'dark' : 'light'}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}


// Dark mode toggle
function toggleDarkMode() {
    setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
}

// Load dark mode preference
function loadDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === null || darkMode === '') {
        setTheme('dark');
        return;
    }
    setTheme(darkMode === 'enabled' ? 'dark' : 'light');
}


function openThemePanel() {
    const panel = document.getElementById('themePanel');
    const backdrop = document.getElementById('themePanelBackdrop');
    if (!panel || !backdrop) return;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    const trigger = document.getElementById('themePanelOpen');
    if (trigger) trigger.classList.add('active');
    const firstBtn = panel.querySelector('.theme-option-btn');
    if (firstBtn) firstBtn.focus();
}

function closeThemePanel() {
    const panel = document.getElementById('themePanel');
    const backdrop = document.getElementById('themePanelBackdrop');
    if (!panel || !backdrop) return;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    const trigger = document.getElementById('themePanelOpen');
    if (trigger) trigger.classList.remove('active');
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.length < 2) {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                if (this.closest('.nav-links')) {
                    document.querySelectorAll('.nav-links a').forEach(function (l) {
                        l.classList.remove('active');
                    });
                    this.classList.add('active');
                    const nl = document.querySelector('.nav-links');
                    if (nl) nl.classList.remove('open');
                    const mt = document.getElementById('menuToggle');
                    if (mt) mt.setAttribute('aria-expanded', 'false');
                }
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Project filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const track = document.getElementById('projectsCarouselTrack');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            if (track) track.scrollLeft = 0;
        });
    });
}

function initProjectsCarousel() {
    const track = document.getElementById('projectsCarouselTrack');
    const prev = document.querySelector('[data-projects-carousel="prev"]');
    const next = document.querySelector('[data-projects-carousel="next"]');
    if (!track || !prev || !next) return;

    function step(direction) {
        const amount = track.clientWidth;
        track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () {
        step(-1);
    });
    next.addEventListener('click', function () {
        step(1);
    });
}

function initPricingCarousel() {
    const track = document.getElementById('pricingCarouselTrack');
    const prev = document.querySelector('[data-pricing-carousel="prev"]');
    const next = document.querySelector('[data-pricing-carousel="next"]');
    if (!track || !prev || !next) return;

    function step(direction) {
        const amount = track.clientWidth;
        track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () {
        step(-1);
    });
    next.addEventListener('click', function () {
        step(1);
    });
}

function initSectionCarousel(trackId, prevSelector, nextSelector) {
    const track = document.getElementById(trackId);
    const prev = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);
    if (!track || !prev || !next) return;

    function step(direction) {
        const amount = track.clientWidth;
        track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () {
        step(-1);
    });
    next.addEventListener('click', function () {
        step(1);
    });
}

function initPromptVaultProtection() {
    const lockedAreas = document.querySelectorAll('.prompt-vault-card, [data-prompt-protected="1"]');
    if (!lockedAreas.length) return;

    ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart'].forEach(function (evt) {
        lockedAreas.forEach(function (locked) {
            locked.addEventListener(evt, function (e) {
                e.preventDefault();
            });
        });
    });
}

// Typing effect for hero tagline
function initTypingEffect() {
    const tagline = document.querySelector('.hero .tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            tagline.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    }, 1500);
}

// Voice greeting (simulated)
function initVoiceGreeting() {
    // Check if it's the user's first visit
    if (!sessionStorage.getItem('hasVisited')) {
        setTimeout(() => {
            // Create a visual notification for the voice greeting
            const greeting = document.createElement('div');
            greeting.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--gradient-bg);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1000;
                animation: slideInRight 0.5s ease;
                max-width: 250px;
            `;
            greeting.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <svg class="icon-lucide" style="width:1.35em;height:1.35em;color:var(--accent-gold);flex-shrink:0" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                    <span>"Welcome to Patrick's world — let's create something legendary!"</span>
                </div>
                <button onclick="this.parentElement.remove()" style="position: absolute; top: 5px; right: 10px; background: none; border: none; color: white; cursor: pointer;">×</button>
            `;
            
            document.body.appendChild(greeting);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (greeting.parentElement) {
                    greeting.remove();
                }
            }, 5000);
            
            sessionStorage.setItem('hasVisited', 'true');
        }, 3000);
    }
}

// Cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Parallax scrolling effect
function initParallaxScrolling() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const particles = document.getElementById('particles');
        
        if (hero && particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
    });
}

function initSmartMediaLoading() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach(function (img) {
        if (img.closest('#hero')) return;
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });
}

const galleryState = {
    filter: 'all',
    items: [],
    filtered: [],
    spotlightIndex: 0,
    currentIndex: 0,
    stripTimer: null
};

function titleFromFilename(name) {
    if (!name) return '';
    return name
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getFilteredGalleryItems(filter) {
    if (!filter || filter === 'all') return galleryState.items.slice();
    return galleryState.items.filter(it => it.category === filter);
}

function inferGalleryCategory(file) {
    const raw = (file || '').trim();
    const f = raw.toLowerCase();
    const base = raw.split(/[/\\]/).pop().toLowerCase();

    const designComposites = new Set([
        'aj 1.png',
        'aj 3-.png',
        'aj ofori 2-.png',
        'kof-01.png',
        'off-01.png',
        'patience_business.png'
    ]);
    if (designComposites.has(base)) return 'design';

    if (f.includes('wmremove')) return 'photography';
    if (f.startsWith('file_')) return 'photography';
    if (f.startsWith('psx_')) {
        if (f.includes('065920') || f.includes('060905') || f.includes('164557')) return 'design';
        return 'photography';
    }

    if (
        f.includes('poster') ||
        f.includes('welcome') ||
        f.includes('nominations') ||
        f.includes('committee') ||
        f.includes('vetting') ||
        f.includes('design') ||
        f.includes('product') ||
        f.includes('social media') ||
        f.includes('web')
    ) return 'design';

    return 'design';
}

function normalizeGalleryItems(items) {
    const arr = Array.isArray(items) ? items : [];
    const normalized = arr
        .map(it => {
            if (!it) return null;
            if (typeof it === 'string') return { file: it };
            if (typeof it.file !== 'string' || !it.file.trim()) return null;
            return it;
        })
        .filter(Boolean)
        .map(it => {
            const file = it.file.trim();
            const t = typeof it.title === 'string' ? it.title.trim() : '';
            return {
                file,
                title: t || titleFromFilename(file),
                category: inferGalleryCategory(file)
            };
        });

    // de-dupe by filename
    const seen = new Set();
    return normalized.filter(it => {
        const key = it.file.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

async function loadGalleryFromManifest() {
    if (window.__GALLERY_MANIFEST__ && Array.isArray(window.__GALLERY_MANIFEST__.items)) {
        return normalizeGalleryItems(window.__GALLERY_MANIFEST__.items);
    }

    const res = await fetch('gallery.manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('manifest not found');
    const data = await res.json();
    const items = normalizeGalleryItems(data && data.items ? data.items : data);
    if (!items.length) throw new Error('manifest empty');
    return items;
}

function renderGalleryStrip() {
    const strip = document.getElementById('galleryStrip');
    if (!strip) return;
    const items = galleryState.filtered;
    if (!items.length) {
        strip.innerHTML = '';
        return;
    }

    strip.innerHTML = items.map((it, idx) => {
        const src = encodeURI(it.file);
        const title = it.title || titleFromFilename(it.file);
        const active = idx === galleryState.spotlightIndex ? ' is-active' : '';
        return (
            '<button type="button" class="gallery-thumb' + active + '" data-gallery-thumb="' + idx + '" role="listitem" aria-label="' + escapeHtml(title) + '">' +
            '<img src="' + src + '" alt="" loading="lazy" decoding="async" fetchpriority="low">' +
            '</button>'
        );
    }).join('');
}

function scheduleGalleryStripRender() {
    if (galleryState.stripTimer) {
        clearTimeout(galleryState.stripTimer);
    }
    galleryState.stripTimer = setTimeout(() => {
        renderGalleryStrip();
        updateSpotlightUI();
        galleryState.stripTimer = null;
    }, 0);
}

function updateSpotlightUI() {
    const items = galleryState.filtered;
    const stageImg = document.getElementById('galleryStageImg');
    const stageTitle = document.getElementById('galleryStageTitle');
    const stagePill = document.getElementById('galleryStagePill');
    const foot = document.getElementById('galleryFoot');
    const strip = document.getElementById('galleryStrip');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxOpen = !!(lightbox && lightbox.classList.contains('is-open'));
    if (!stageImg || !stageTitle || !stagePill) return;

    if (!items.length) {
        stageImg.removeAttribute('src');
        stageTitle.textContent = '';
        stagePill.textContent = '';
        if (foot) foot.textContent = '';
        return;
    }

    const i = Math.max(0, Math.min(items.length - 1, galleryState.spotlightIndex));
    galleryState.spotlightIndex = i;
    const it = items[i];
    const title = it.title || titleFromFilename(it.file);
    if (!lightboxOpen) {
        const nextSrc = encodeURI(it.file);
        if (stageImg.getAttribute('data-gallery-src') !== nextSrc) {
            stageImg.setAttribute('data-gallery-src', nextSrc);
            stageImg.src = nextSrc;
        }
        stageImg.alt = title;
    }
    stageTitle.textContent = title;
    stagePill.textContent = it.category === 'photography' ? 'Photography' : 'Design';
    if (foot) foot.textContent = (i + 1) + ' / ' + items.length;

    if (strip) {
        const thumbs = strip.querySelectorAll('.gallery-thumb');
        thumbs.forEach((el, idx) => {
            el.classList.toggle('is-active', idx === i);
        });
    }
}

function renderGallery(filter) {
    galleryState.filter = filter || 'all';
    galleryState.filtered = getFilteredGalleryItems(galleryState.filter);
    galleryState.spotlightIndex = 0;

    const studio = document.getElementById('galleryStudio');
    const loadNote = document.getElementById('galleryLoadNote');

    if (!galleryState.filtered.length) {
        if (studio) studio.style.display = 'none';
        if (loadNote) {
            loadNote.style.display = 'block';
            loadNote.textContent = 'No pieces match this filter yet.';
        }
        return;
    }

    if (studio) studio.style.display = '';
    if (loadNote) {
        loadNote.style.display = 'none';
        loadNote.textContent = '';
    }

    const strip = document.getElementById('galleryStrip');
    if (strip) strip.innerHTML = '';
    updateSpotlightUI();
    scheduleGalleryStripRender();
}

function stagePrev() {
    const max = galleryState.filtered.length;
    if (!max) return;
    galleryState.spotlightIndex = (galleryState.spotlightIndex - 1 + max) % max;
    updateSpotlightUI();
}

function stageNext() {
    const max = galleryState.filtered.length;
    if (!max) return;
    galleryState.spotlightIndex = (galleryState.spotlightIndex + 1) % max;
    updateSpotlightUI();
}

function openGalleryLightbox(index) {
    const modal = document.getElementById('galleryLightbox');
    if (!modal) return;
    const max = galleryState.filtered.length;
    if (!max) return;
    const i = Math.max(0, Math.min(max - 1, index || 0));
    galleryState.currentIndex = i;
    galleryState.spotlightIndex = i;
    updateSpotlightUI();
    updateGalleryLightbox();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeGalleryLightbox() {
    const modal = document.getElementById('galleryLightbox');
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    galleryState.spotlightIndex = galleryState.currentIndex;
    updateSpotlightUI();
}

function updateGalleryLightbox() {
    const img = document.getElementById('galleryLightboxImg');
    const cap = document.getElementById('galleryLightboxCaption');
    if (!img || !cap) return;
    const it = galleryState.filtered[galleryState.currentIndex];
    if (!it) return;
    const title = it.title || titleFromFilename(it.file);
    img.src = encodeURI(it.file);
    img.alt = title;
    cap.textContent = title + (it.category ? (' • ' + (it.category === 'photography' ? 'Photography' : 'Design')) : '');
}

function galleryPrev() {
    const max = galleryState.filtered.length;
    if (!max) return;
    galleryState.currentIndex = (galleryState.currentIndex - 1 + max) % max;
    updateGalleryLightbox();
    galleryState.spotlightIndex = galleryState.currentIndex;
    updateSpotlightUI();
}

function galleryNext() {
    const max = galleryState.filtered.length;
    if (!max) return;
    galleryState.currentIndex = (galleryState.currentIndex + 1) % max;
    updateGalleryLightbox();
    galleryState.spotlightIndex = galleryState.currentIndex;
    updateSpotlightUI();
}

function initGallery() {
    const buttons = document.querySelectorAll('.gallery-filter-btn[data-gallery-filter]');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.getAttribute('data-gallery-filter'));
        });
    });

    const strip = document.getElementById('galleryStrip');
    if (strip) {
        strip.addEventListener('click', function (e) {
            const t = e.target && e.target.closest ? e.target.closest('.gallery-thumb[data-gallery-thumb]') : null;
            if (!t) return;
            const idx = parseInt(t.getAttribute('data-gallery-thumb'), 10);
            if (Number.isFinite(idx)) {
                galleryState.spotlightIndex = idx;
                updateSpotlightUI();
            }
        });
    }

    const stageOpen = document.getElementById('galleryStageOpen');
    if (stageOpen) {
        stageOpen.addEventListener('click', function () {
            openGalleryLightbox(galleryState.spotlightIndex);
        });
    }

    const sp = document.getElementById('galleryStagePrev');
    const sn = document.getElementById('galleryStageNext');
    if (sp) sp.addEventListener('click', function (e) { e.stopPropagation(); stagePrev(); });
    if (sn) sn.addEventListener('click', function (e) { e.stopPropagation(); stageNext(); });

    const modal = document.getElementById('galleryLightbox');
    if (modal) {
        modal.querySelectorAll('[data-close-gallery]').forEach(el => {
            el.addEventListener('click', closeGalleryLightbox);
        });
        const prevBtn = modal.querySelector('[data-gallery-prev]');
        const nextBtn = modal.querySelector('[data-gallery-next]');
        if (prevBtn) prevBtn.addEventListener('click', galleryPrev);
        if (nextBtn) nextBtn.addEventListener('click', galleryNext);
    }

    const studio = document.getElementById('galleryStudio');
    const loadNote = document.getElementById('galleryLoadNote');
    if (loadNote) {
        loadNote.style.display = 'block';
        loadNote.textContent = 'Loading gallery…';
    }
    if (studio) studio.style.display = 'none';

    loadGalleryFromManifest()
        .then(items => {
            galleryState.items = items;
            if (loadNote) {
                loadNote.style.display = 'none';
                loadNote.textContent = '';
            }
            renderGallery('all');
        })
        .catch(() => {
            galleryState.items = [];
            if (studio) studio.style.display = 'none';
            if (loadNote) {
                loadNote.style.display = 'block';
                loadNote.textContent = 'Gallery data not found. Run: node generate-gallery-manifest.mjs';
            }
        });
}

function openCollectionModal(kind) {
    const modal = document.getElementById('collectionModal');
    if (!modal) return;

    const titleEl = document.getElementById('collectionTitle');
    const introEl = document.getElementById('collectionIntro');
    const kickerEl = document.getElementById('collectionKicker');

    const isPhoto = kind === 'photography';
    if (kickerEl) kickerEl.textContent = isPhoto ? 'Photography' : 'Design';
    if (titleEl) titleEl.textContent = isPhoto ? 'Photography Gallery' : 'Design Gallery';
    if (introEl) {
        introEl.textContent = isPhoto
            ? 'A visual timeline of portraits and edits — moments, light, and detail. Tap any piece to expand, then move left/right to travel through the set.'
            : 'A visual timeline of posters and social creatives — clean hierarchy, strong contrast, and deliberate layout choices. Tap any piece to expand, then move left/right through the set.';
    }
    document.querySelectorAll('.gallery-filter-btn[data-gallery-filter]').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-gallery-filter') === kind);
    });
    renderGallery(kind);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeCollectionModal() {
    const modal = document.getElementById('collectionModal');
    if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('modal-open');
}

function initCollectionModal() {
    const modal = document.getElementById('collectionModal');
    if (!modal) return;
    modal.querySelectorAll('[data-close-collection]').forEach(function (el) {
        el.addEventListener('click', closeCollectionModal);
    });
}

const PROJECT_CATALOG = {
    optimist: {
        title: 'The Optimist',
        subtitle: 'Personal Finance Intelligence System',
        liveUrl: 'https://theoptimist.pages.dev/',
        liveLabel: 'Open live app ↗',
        tags: ['Cross-platform', 'Cloud backend', 'Supabase', 'AI-accelerated'],
        detailSections: [
            { title: 'Summary', body: 'A full-featured personal finance system designed to help users track, manage, and grow their money with complete clarity and control.' },
            { title: 'The Problem', body: 'Many people struggle with managing their finances, not because they don\'t earn enough, but because they lack visibility into where their money goes. This leads to overspending, poor savings habits, and financial stress.' },
            { title: 'The Solution', body: 'I designed and built a complete personal finance management system that allows users to track income, expenses, savings, and debts in one place, while receiving real-time insights and alerts.' },
            { title: 'Key Features', items: [
                'Expense and income tracking',
                'Smart budgeting with real-time alerts',
                'Savings tracking across multiple accounts',
                'Debt management system',
                'AI-powered financial coach',
                'Financial reports generation',
                'Goal tracking and group savings (Arena & Split features)',
                'Cross-device data synchronization'
            ]},
            { title: 'Impact', body: 'This system transforms financial confusion into structured, trackable insights, helping users make better financial decisions and stay in control of their money.' },
            { title: 'Tech Stack', body: 'Cross-platform product stack · Supabase / Firebase · expert AI-native workflows (Cursor, Claude, modern assistants)' },
            { title: 'My Role', body: 'Designed the system structure, led AI-accelerated implementation, shipped core features, and owned testing and iteration.' },
            { title: 'What I Learned', body: 'Improved my ability to design complex systems, manage multiple financial features, and effectively use AI tools to accelerate development.' }
        ],
        gallery: [
            { file: 'Dashboard.png', caption: 'Main dashboard' },
            { file: 'Money.png', caption: 'Money & accounts' },
            { file: 'Coach.png', caption: 'AI Finance Coach' },
            { file: 'Reports.png', caption: 'Reports' },
            { file: 'Arena.png', caption: 'Arena' },
            { file: 'About.png', caption: 'About' }
        ]
    },
    stockpulse: {
        title: 'StockPulse',
        subtitle: 'Intelligent Inventory Tracker',
        liveUrl: 'https://stockpulse-pb.pages.dev/',
        liveLabel: 'Open live app ↗',
        tags: ['Cross-platform', 'Automation', 'Inventory systems', 'Reports'],
        detailSections: [
            { title: 'Summary', body: 'A smart inventory management system built to eliminate repetitive manual stock counting and streamline reporting.' },
            { title: 'The Problem', body: 'Manual stock counting is time-consuming, stressful, and prone to human error, especially when dealing with large quantities of items weekly.' },
            { title: 'The Solution', body: 'I built a system that allows one-time stock recording and tracks daily usage automatically, eliminating the need for full recounts every week.' },
            { title: 'Key Features', items: [
                'One-time stock capture',
                'Daily usage logging',
                'Automated stock calculations',
                'Weekly stock reminders',
                'WhatsApp report sharing',
                'PDF report generation'
            ]},
            { title: 'Impact', body: 'Reduces hours of manual work, improves accuracy, and simplifies the entire stock management process.' },
            { title: 'Tech Stack', body: 'Cross-platform product stack · Backend integration · expert AI-native development (Cursor, Claude)' },
            { title: 'My Role', body: 'Designed the workflow, built the system using AI tools, and implemented automation for stock tracking and reporting.' },
            { title: 'What I Learned', body: 'Learned how to design efficient tracking systems and automate repetitive real-world tasks.' }
        ],
        gallery: [
            { file: 'SP-Dashboard.png', caption: 'Supervisor dashboard' },
            { file: 'SP-Pages.png', caption: 'Navigation & pages' },
            { file: 'SP-Log Stock.png', caption: 'Log stock usage' },
            { file: 'SP-Log Reg.png', caption: 'Registration / log' },
            { file: 'SP-Stock Count.png', caption: 'Stock count' },
            { file: 'SP-Insights.png', caption: 'Insights' },
            { file: 'SP-Reports.png', caption: 'Reports' },
            { file: 'SP-Supervisor.png', caption: 'Supervisor tools' }
        ]
    },
    ims: {
        title: 'IMS Fee App',
        subtitle: 'Smart Client Payment System',
        liveUrl: 'https://nia-fees.pages.dev/',
        liveLabel: 'Open live app ↗',
        tags: ['Cross-platform', 'Non-citizens Ghana', 'Live fees', 'Client operations'],
        detailSections: [
            { title: 'Summary', body: 'A dynamic fee management system that helps clients know exactly what to pay before visiting the office.' },
            { title: 'The Problem', body: 'Clients often travel long distances without knowing the exact fees or requirements, leading to wasted time, money, and frustration.' },
            { title: 'The Solution', body: 'I built a system where the admin updates the weekly dollar rate, and the app automatically calculates service fees while displaying all requirements clearly to clients.' },
            { title: 'Key Features', items: [
                'Real-time fee calculation',
                'Weekly rate updates by admin',
                'Clear service requirements display',
                'Simple and user-friendly interface'
            ]},
            { title: 'Impact', body: 'Eliminates confusion, reduces unnecessary travel, and improves overall client experience and operational efficiency.' },
            { title: 'Tech Stack', body: 'Cross-platform product stack · Backend logic integration · expert AI-native development (Cursor, Claude)' },
            { title: 'My Role', body: 'Identified the problem, designed the solution, and shipped the build with expert AI-led engineering workflows.' },
            { title: 'What I Learned', body: 'Improved my ability to build solutions that directly impact real users and solve operational challenges.' }
        ],
        gallery: [
            { file: 'IMS-Dash.png', caption: 'Main dashboard' },
            { file: 'IMS-Dash-1.png', caption: 'Dashboard view' },
            { file: 'IMS-Dash-2.png', caption: 'Dashboard detail' },
            { file: 'IMS-Sign In.png', caption: 'Sign in' },
            { file: 'IMS-Admin.png', caption: 'Admin' },
            { file: 'IMS-Req.png', caption: 'Requirements' },
            { file: 'IMS-Expiry.png', caption: 'Expiry / notices' }
        ]
    },
    furniture: {
        title: 'Furniture Sales Dashboard',
        subtitle: 'Excel analytics · Sales & profit',
        liveUrl: '',
        liveLabel: '',
        tags: ['Excel', 'Sales analytics', 'Profit insights'],
        detailSections: [
            { title: 'Summary', body: 'An Excel-based analytics dashboard built to uncover performance insights and profit inefficiencies in furniture sales data.' },
            { title: 'The Problem', body: 'Businesses often generate high sales but struggle to understand why profits remain low due to hidden inefficiencies in operations and pricing.' },
            { title: 'The Solution', body: 'I developed a dashboard that analyzes sales, profit, delivery, and category performance to reveal actionable insights.' },
            { title: 'Key Features', items: [
                'Sales and profit analysis',
                'City-level performance breakdown',
                'Product category insights',
                'Delivery time analysis',
                'Shipping mode distribution'
            ]},
            { title: 'Key Insights', items: [
                'Over $741K in total sales but only $18.5K profit',
                'New York contributed over 31% of total revenue',
                'Chairs generated 44% of total sales',
                '59% of orders used standard shipping',
                'Heavy discounting reduced profitability'
            ]},
            { title: 'Impact', body: 'Helps decision-makers identify profit leaks, optimize logistics, and improve pricing strategies.' },
            { title: 'Tools Used', body: 'Microsoft Excel · Data visualization techniques' },
            { title: 'My Role', body: 'Followed a guided structure and independently analyzed the dataset to extract insights and build a clear, decision-focused dashboard.' },
            { title: 'What I Learned', body: 'Strengthened my ability to turn raw data into meaningful business insights and tell compelling data stories.' }
        ],
        gallery: [
            { file: 'Furniture_Sales_Dashboard-.png', caption: 'Full dashboard', fallback: 'Furniture_Sales_Dashboard.png', fallback2: 'Furniture_Sales_Dashboard.svg' }
        ]
    },
    marketing: {
        title: 'Marketing Campaign Dashboard',
        subtitle: 'Campaign effectiveness & ROI',
        liveUrl: '',
        liveLabel: '',
        tags: ['Excel', 'Campaign analytics', 'ROI'],
        detailSections: [
            { title: 'Summary', body: 'A data analytics dashboard built to evaluate the effectiveness and ROI of a large-scale marketing campaign.' },
            { title: 'The Problem', body: 'Marketing campaigns often generate high visibility but fail to convert that attention into actual value.' },
            { title: 'The Solution', body: 'I analyzed campaign data across multiple cities to understand performance across impressions, clicks, conversions, and ROI.' },
            { title: 'Key Features', items: [
                'Conversion funnel analysis',
                'City-level performance comparison',
                'ROI evaluation',
                'Customer acquisition cost analysis'
            ]},
            { title: 'Key Insights', items: [
                '1.1 billion impressions generated',
                '110 million clicks recorded',
                'Only 8% conversion rate',
                'High acquisition cost (~$12.5K)',
                'Miami delivered the highest ROI'
            ]},
            { title: 'Impact', body: 'Reveals where marketing efforts succeed, where value is lost, and where future investment should be focused.' },
            { title: 'Tools Used', body: 'Microsoft Excel · Data visualization techniques' },
            { title: 'My Role', body: 'Built the dashboard based on guided learning and independently derived insights from the dataset.' },
            { title: 'What I Learned', body: 'Developed strong skills in analyzing marketing data and identifying performance gaps in conversion funnels.' }
        ],
        gallery: [
            { file: 'Marketing_Performance_Dashboard .png', caption: 'Full dashboard', fallback: 'Marketing_Performance_Dashboard.png', fallback2: 'Marketing_Performance_Dashboard_.png', fallback3: 'Marketing_Performance_Dashboard.svg' }
        ]
    },
    primed: {
        title: 'PrimeDraft Services',
        paragraphs: [
            'A professional website for PrimeDraft — a document editing and proofreading service. Built with clean design, service breakdowns, client testimonials, and a quote request flow. Fully deployed and live.'
        ],
        liveUrl: 'https://primedraftservices.vercel.app',
        liveLabel: 'Visit live site ↗',
        tags: ['Website', 'Business', 'Deployed'],
        gallery: [
            { file: 'PrimeDraft-Home.png', caption: 'Homepage', fallback: 'Primed.png' },
            { file: 'PrimeDraft-Services.png', caption: 'Services section' },
            { file: 'PrimeDraft-Process.png', caption: 'Work process / workflow' },
            { file: 'PrimeDraft-Reviews.png', caption: 'Client reviews' },
            { file: 'PrimeDraft-Contact.png', caption: 'Contact section' }
        ]
    },
    benchtech: {
        title: 'BenchTech Support',
        paragraphs: [
            'A professional tech support website for BenchTech — Windows installation, Office setup, antivirus, software configuration, and emergency IT support. Fast, reliable, and remote-friendly. Fully deployed and live.'
        ],
        liveUrl: 'https://benchog.github.io/BenchTech-Support/',
        liveLabel: 'Visit live site ↗',
        tags: ['Website', 'IT Services', 'Deployed'],
        gallery: [
            { file: 'BenchTech-Dashboard.png', caption: 'Homepage / dashboard', fallback: 'BenchTech.png' },
            { file: 'BenchTech-Services.png', caption: 'Services section' },
            { file: 'BenchTech-About.png', caption: 'About section' },
            { file: 'BenchTech-Contact.png', caption: 'Contact section' },
            { file: 'BenchTech-Book Service.png', caption: 'Book service flow' }
        ]
    },
    promptvault: {
        title: 'Prompt Vault: Elite AI Templates',
        subtitle: 'Protected prompt systems for high-output teams',
        liveUrl: '',
        liveLabel: '',
        tags: ['Prompt Engineering', 'Template Systems', 'AI Ops'],
        detailSections: [
            { title: 'Summary', body: 'A premium prompt library designed for fast, high-quality output in product strategy, marketing, operations, and technical workflows.' },
            { title: 'Included Preview Set', body: '10 sample prompts are shown publicly using Role + Task + Context + Format structure. Critical blocks remain blurred until paid access is granted.' },
            { title: 'What Is Inside', items: [
                'Role + objective prompt frameworks',
                'Multi-step system prompts for consistent outputs',
                'Business-ready templates for strategy and execution',
                'Technical templates for rapid prototyping and docs'
            ]},
            { title: 'Access Model', body: 'Visitors see a partial preview. Protected blocks remain locked and blurred. Full access is provided only after purchase or authorized onboarding.' },
            { title: 'Why It Matters', body: 'Cuts prompt drafting time dramatically while improving consistency, clarity, and output quality across use-cases.' }
        ],
        gallery: [
            { file: 'Dashboard.png', caption: 'Protected template preview' }
        ]
    }
};

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function isPromptOwnerUnlocked() {
    return localStorage.getItem('ownerPromptAccess') === 'true';
}

function buildPromptSamplesHtml(unlocked) {
    const prompts = [
        ['1) CFO Copilot Web App', 'You are a senior fintech product architect and CFO operations advisor.', 'Design a full-featured cashflow web app for SMEs, including requirements, architecture, and build plan.', unlocked ? 'SME in Ghana with weekly revenue fluctuations, delayed receivables, and reconciliation overhead from multiple mobile-money wallets.' : 'SME in Ghana with weekly revenue fluctuations and <span class="blur-line">[private cash-cycle assumptions hidden]</span>.', 'Return: user roles, database schema, API contract, UI screens, 4-sprint delivery plan, acceptance criteria.'],
        ['2) Clinic Queue & Triage App', 'You are a health-tech systems engineer.', 'Generate a mobile + web queue system for walk-in and booked patients.', unlocked ? 'Community clinic with 3 doctors, 2 nurses, mixed emergency/non-emergency load, manual queue failures.' : 'Community clinic with mixed emergency load and <span class="blur-line">[protected triage decision rules hidden]</span>.', 'Return: workflow map, patient states, notifications logic, reporting dashboard, security model.'],
        ['3) School ERP MVP', 'You are an education platform architect.', 'Create an ERP blueprint for attendance, grading, fees, and parent communication.', unlocked ? 'Multi-campus school using spreadsheets with errors in fee reconciliation and attendance records.' : 'Multi-campus school with legacy sheets and <span class="blur-line">[private migration strategy hidden]</span>.', 'Return: module breakdown, DB entities, parent/student portals, rollout plan, QA checklist.'],
        ['4) Retail Inventory Forecasting', 'You are a supply-chain AI product lead.', 'Design an inventory app with demand forecasting and reorder automation.', unlocked ? '4 warehouse operation with stockouts and dead stock due to poor forecasting and delayed procurement.' : '4 warehouses with stock instability and <span class="blur-line">[sensitive reorder algorithm hidden]</span>.', 'Return: data model, forecasting pipeline, alerts logic, KPI dashboard, deployment steps.'],
        ['5) Construction Project Tracker', 'You are a field operations systems architect.', 'Build a construction execution app for milestones, approvals, and incident logging.', unlocked ? 'Multiple project sites suffering from delayed sign-offs, poor visibility, and weak accountability trails.' : 'Multi-site execution with delay issues and <span class="blur-line">[confidential accountability matrix hidden]</span>.', 'Return: role permissions, workflow states, audit logging, file structure, escalation process.'],
        ['6) Legal Intake Website Funnel', 'You are a conversion-focused web strategist and UX writer.', 'Generate a legal services website structure that increases qualified client inquiries.', unlocked ? 'Small legal practice with low conversion despite traffic; needs trust-first messaging and clear onboarding.' : 'Legal practice requiring trust-first funnel plus <span class="blur-line">[private persuasion framework hidden]</span>.', 'Return: sitemap, page-by-page copy blocks, CTA strategy, FAQ schema, SEO metadata.'],
        ['7) Logistics Dispatch Platform', 'You are a real-time routing systems engineer.', 'Design a dispatch app with route assignment and proof-of-delivery tracking.', unlocked ? 'Last-mile delivery team with route overlaps, poor ETA accuracy, and missed delivery windows.' : 'Last-mile delivery team with routing inefficiencies and <span class="blur-line">[protected geo-priority formula hidden]</span>.', 'Return: dispatcher UI, courier app flow, route assignment logic, event model, SLA dashboard.'],
        ['8) Property Management SaaS', 'You are a SaaS systems designer.', 'Create an MVP for property management including rent tracking, tickets, and owner reporting.', unlocked ? '500-unit portfolio with fragmented payment channels and unresolved maintenance backlog.' : '500-unit portfolio with mixed payments and <span class="blur-line">[sensitive owner reporting model hidden]</span>.', 'Return: core entities, billing logic, ticket lifecycle, tenant portal, admin analytics.'],
        ['9) Manufacturing QA Tracker', 'You are an industrial quality systems engineer.', 'Design a quality tracking app for defects, root causes, and corrective actions.', unlocked ? 'Manufacturing line losing margin due to repeat defects and weak traceability.' : 'Manufacturing defects with traceability gaps and <span class="blur-line">[private defect taxonomy hidden]</span>.', 'Return: defect form schema, RCA workflow, CAPA flow, reporting matrix, implementation roadmap.'],
        ['10) Government Service Portal', 'You are a public-sector digital transformation architect.', 'Generate a citizen-service portal for applications, tracking, and notifications.', unlocked ? 'High-demand public service with long queues and manual verification bottlenecks.' : 'High-demand service with compliance requirements and <span class="blur-line">[restricted policy mapping hidden]</span>.', 'Return: modules, identity verification workflow, security controls, phased release plan, SLA matrix.']
    ];

    const cards = prompts.map(function (p) {
        return '<article class="project-modal-prompt-card">' +
            '<h4>' + escapeHtml(p[0]) + '</h4>' +
            '<p><strong>Role:</strong> ' + escapeHtml(p[1]) + '</p>' +
            '<p><strong>Task:</strong> ' + escapeHtml(p[2]) + '</p>' +
            '<p><strong>Context:</strong> ' + p[3] + '</p>' +
            '<p><strong>Format:</strong> ' + escapeHtml(p[4]) + '</p>' +
            '</article>';
    }).join('');

    return '<section class="project-modal-prompt-samples ' + (unlocked ? 'is-unlocked' : 'is-locked') + '" data-prompt-protected="' + (unlocked ? '0' : '1') + '">' +
        '<h3 class="project-modal-section-title">Premium Prompt Samples</h3>' +
        '<p class="project-modal-lead">' + (unlocked ? 'Owner preview unlocked on this device.' : 'Protected preview only. Full templates unlock after purchase.') + '</p>' +
        '<div class="project-modal-prompt-grid">' + cards + '</div>' +
        (unlocked ? '' : '<div class="project-modal-prompt-lock"><a href="#service-request" class="btn-project-live">Unlock full templates</a></div>') +
        '</section>';
}

function buildProjectDetailBody(data) {
    if (data.detailSections && data.detailSections.length) {
        var html = '';
        if (data.subtitle) {
            html += '<p class="project-modal-subtitle">' + escapeHtml(data.subtitle) + '</p>';
        }
        data.detailSections.forEach(function (sec) {
            html += '<div class="project-modal-section">';
            html += '<h3 class="project-modal-section-title">' + escapeHtml(sec.title) + '</h3>';
            if (sec.body) {
                html += '<p class="project-modal-lead">' + escapeHtml(sec.body) + '</p>';
            }
            if (sec.items && sec.items.length) {
                html += '<ul class="project-modal-list">';
                sec.items.forEach(function (item) {
                    html += '<li>' + escapeHtml(item) + '</li>';
                });
                html += '</ul>';
            }
            html += '</div>';
        });
        return html;
    }
    if (data.paragraphs) {
        return data.paragraphs.map(function (p) {
            return '<p class="project-modal-lead">' + escapeHtml(p) + '</p>';
        }).join('');
    }
    return '';
}

function bindImgFallbackChain(root) {
    const el = root && root.querySelectorAll ? root : document;
    el.querySelectorAll('img.img-fallback-chain[data-fallback-srcs]').forEach(function (img) {
        if (img.dataset.fallbackBound === '1') return;
        img.dataset.fallbackBound = '1';
        const parts = img.getAttribute('data-fallback-srcs').split(',').map(function (s) {
            return s.trim();
        }).filter(Boolean);
        let i = 0;
        img.addEventListener('error', function () {
            if (i < parts.length) {
                img.src = parts[i];
                i += 1;
            }
        });
    });
}

function initActiveNavOnScroll() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sectionIds = ['hero', 'skills', 'services', 'projects', 'pricing', 'contact'];
    const sections = sectionIds.map(function (id) {
        return document.getElementById(id);
    }).filter(Boolean);

    function updateActive() {
        const offset = Math.min(160, window.innerHeight * 0.32);
        const scrollPos = window.scrollY + offset;
        let activeId = 'hero';
        sections.forEach(function (sec) {
            if (sec && sec.offsetTop <= scrollPos) {
                activeId = sec.id;
            }
        });
        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateActive();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    updateActive();
}

function openProjectModal(slug) {
    const data = PROJECT_CATALOG[slug];
    if (!data) return;

    const modal = document.getElementById('projectModal');
    const body = document.getElementById('projectModalBody');
    const tagsHtml = data.tags.map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + '</span>';
    }).join('');

    const detailHtml = buildProjectDetailBody(data);

    const galleryHtml = data.gallery.map(function (g) {
        const src = encodeURI(g.file);
        const extras = [];
        if (g.fallback) extras.push(g.fallback);
        if (g.fallback2) extras.push(g.fallback2);
        if (g.fallback3) extras.push(g.fallback3);
        let imgTag = '<img src="' + src + '" alt="' + escapeHtml(g.caption) + '" loading="lazy"';
        if (extras.length) {
            imgTag += ' class="img-fallback-chain" data-fallback-srcs="' +
                extras.map(function (f) { return encodeURI(f); }).join(',') + '"';
        }
        imgTag += '>';
        return '<figure>' + imgTag +
            '<figcaption>' + escapeHtml(g.caption) + '</figcaption></figure>';
    }).join('');

    let actionsHtml = '';
    if (data.liveUrl) {
        actionsHtml = '<div class="project-modal-actions">' +
            '<a href="' + escapeHtml(data.liveUrl) + '" class="btn-project-live" target="_blank" rel="noopener">' +
            escapeHtml(data.liveLabel) + '</a></div>';
    }

    const promptSamplesHtml = slug === 'promptvault' ? buildPromptSamplesHtml(isPromptOwnerUnlocked()) : '';

    body.innerHTML =
        '<h2 id="projectModalTitle">' + escapeHtml(data.title) + '</h2>' +
        '<div class="project-tags">' + tagsHtml + '</div>' +
        detailHtml +
        actionsHtml +
        '<h3 class="project-modal-gallery-heading">Screens &amp; detail</h3>' +
        '<div class="project-modal-gallery">' + galleryHtml + '</div>' +
        promptSamplesHtml;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const scrollEl = document.querySelector('#projectModal .project-modal-scroll');
    if (scrollEl) scrollEl.scrollTop = 0;
    bindImgFallbackChain(body);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    document.querySelectorAll('.btn-view-project').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const slug = btn.getAttribute('data-project');
            if (slug) openProjectModal(slug);
        });
    });

    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            if (e.target === el) closeProjectModal();
        });
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeProjectModal();
    });
}

let portfolioRuntimeStarted = false;

export function initPortfolioRuntime() {
    if (portfolioRuntimeStarted) return;
    portfolioRuntimeStarted = true;

    const ownerMode = new URLSearchParams(window.location.search).get('ownerPrompt');
    if (ownerMode === '1') localStorage.setItem('ownerPromptAccess', 'true');
    if (ownerMode === '0') localStorage.removeItem('ownerPromptAccess');

    const menuToggle = document.getElementById('menuToggle');
    const navLinksEl = document.querySelector('.nav-links');
    function setNavOpenState(isOpen) {
        if (!navLinksEl) return;
        navLinksEl.classList.toggle('open', !!isOpen);
        if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    if (menuToggle && navLinksEl) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            setNavOpenState(!navLinksEl.classList.contains('open'));
        });
    }

    document.addEventListener('click', function (e) {
        if (!navLinksEl || !navLinksEl.classList.contains('open')) return;
        if (e.target.closest && e.target.closest('#menuToggle')) return;
        if (navLinksEl.contains(e.target)) return;
        setNavOpenState(false);
    });

    createParticles();
    animateRotatingText();
    loadDarkMode();
    document.getElementById('themePanelOpen').addEventListener('click', function () {
        setNavOpenState(false);
        toggleDarkMode();
    });
    initSmoothScrolling();
    initScrollAnimations();
    initProjectFiltering();
    initProjectsCarousel();
    initPricingCarousel();
    initSectionCarousel('skillsCarouselTrack', '[data-skills-carousel="prev"]', '[data-skills-carousel="next"]');
    initSectionCarousel('servicesCarouselTrack', '[data-services-carousel="prev"]', '[data-services-carousel="next"]');
    initProjectModal();
    initGallery();
    initCollectionModal();
    bindImgFallbackChain(document.getElementById('projects'));
    initSmartMediaLoading();
    initActiveNavOnScroll();
    initTypingEffect();
    initVoiceGreeting();
    // Chat widget and theme hint intentionally disabled for a cleaner recruiter-first experience.
    //initCursorTrail();
    initParallaxScrolling();
    initPromptVaultProtection();

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setNavOpenState(false);
            closeThemePanel();
            closeProjectModal();
            closeCollectionModal();
            closeGalleryLightbox();
            document.querySelectorAll('.greeting, .modal').forEach(el => el.remove());
        }
        const activeTag = document.activeElement && document.activeElement.tagName;
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
        if (e.key.toLowerCase() === 't' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
            e.preventDefault();
            toggleDarkMode();
        }

        const galleryModal = document.getElementById('galleryLightbox');
        if (galleryModal && galleryModal.classList.contains('is-open')) {
            if (e.key === 'ArrowLeft') galleryPrev();
            if (e.key === 'ArrowRight') galleryNext();
        }
    });

    document.querySelectorAll('.btn-view-gallery[data-gallery-kind]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const kind = btn.getAttribute('data-gallery-kind');
            openCollectionModal(kind === 'photography' ? 'photography' : 'design');
        });
    });

    window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
    injectPortfolioExtraStyles();
}

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function injectPortfolioExtraStyles() {
    if (document.getElementById('portfolio-runtime-extra-css')) return;
    const style = document.createElement('style');
    style.id = 'portfolio-runtime-extra-css';
    style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    /* Small phones — complements main stylesheet (avoid overriding fluid type) */
    @media (max-width: 480px) {
        .hero-cta-row {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 340px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-button {
            padding: 0.85rem 1.75rem;
            font-size: 1rem;
            width: 100%;
            justify-content: center;
        }

        .glass-button.slide-in-up {
            width: 100%;
            justify-content: center;
        }

        .contact-card {
            padding: 1.75rem 1rem;
        }

        .social-links {
            flex-wrap: wrap;
            gap: 0.85rem;
        }

        .social-link {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
        }
    }
    
    /* Loading animation */
    .loading {
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
    
    /* Enhanced accessibility */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Focus styles for better accessibility */
    .cta-button:focus,
    .btn-view-project:focus,
    .filter-btn:focus,
    .social-link:focus,
    .projects-carousel-btn:focus {
        outline: 2px solid var(--ui-icon-accent, #f472b6);
        outline-offset: 2px;
    }
    /* Dark mode cards — glass + cyan edge (matches premium theme in index.css) */
    .dark-mode .project-card,
    .dark-mode .contact-card {
    background: rgba(15, 23, 42, 0.58);
    color: #FAFAFA;
    border: 1px solid rgba(192, 132, 252, 0.22);
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(14px) saturate(145%);
    }
    .dark-mode .cta-button:not(.cta-button--ghost) {
    background: var(--ui-gradient, linear-gradient(135deg, #f472b6 0%, #c084fc 48%, #f59e0b 100%));
    color: #020617 !important;
    border: none;
    box-shadow: 0 10px 34px rgba(192, 132, 252, 0.28);
    }
    .dark-mode .cta-button:not(.cta-button--ghost):hover {
    filter: brightness(1.06);
    box-shadow: 0 14px 42px rgba(244, 114, 182, 0.32);
    }
    .dark-mode .cta-button--ghost {
    background: transparent !important;
    color: #e2e8f0 !important;
    border: 1px solid rgba(192, 132, 252, 0.45);
    box-shadow: none !important;
    }
    /* Dark mode project filter buttons */
    .dark-mode .filter-btn {
    background: rgba(15, 23, 42, 0.65);
    color: #e2e8f0;
    border: 1px solid rgba(192, 132, 252, 0.35);
    }
    .dark-mode .filter-btn.active {
    background: var(--ui-gradient, linear-gradient(135deg, #f472b6 0%, #c084fc 48%, #f59e0b 100%));
    color: #020617;
    border-color: transparent;
    }
`;
    document.head.appendChild(style);
}
