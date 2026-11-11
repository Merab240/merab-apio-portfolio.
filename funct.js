/* ================================================================
   funct.js — Merab Apio Portfolio
   Single-page version.
   Sections: #home · #about · #services · #projects · #contact
================================================================ */

// ── 1. TAB SYSTEM (About section) ────────────────────────────
// Works for both old .tab-links and new .about-tab-btn styles.
var tabLinks    = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function opentab(tabName, event) {
    // Hide all panels
    for (let tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }
    // Deactivate old-style tab links
    for (let tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }
    // Deactivate new pill-style buttons
    document.querySelectorAll(".about-tab-btn").forEach(btn => {
        btn.classList.remove("active-tab-btn");
        btn.setAttribute("aria-selected", "false");
    });

    // Activate the clicked element
    const clicked = event.currentTarget;
    clicked.classList.add(
        clicked.classList.contains("about-tab-btn") ? "active-tab-btn" : "active-link"
    );
    if (clicked.hasAttribute("aria-selected")) {
        clicked.setAttribute("aria-selected", "true");
    }

    // Show the target panel
    const panel = document.getElementById(tabName);
    if (panel) panel.classList.add("active-tab");
}

// ── 2. HIRE ME MODAL ─────────────────────────────────────────
const hireMeBtn     = document.getElementById("hireMeBtn");
const popupForm     = document.getElementById("popupForm");
const closeBtn      = document.querySelector(".close");       // legacy
const modalCloseBtn = document.getElementById("modalCloseBtn");

function openModal()  { if (popupForm) popupForm.style.display = "flex"; }
function closeModal() { if (popupForm) popupForm.style.display = "none"; }

if (hireMeBtn)     hireMeBtn.addEventListener("click", openModal);
if (closeBtn)      closeBtn.addEventListener("click", closeModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

if (popupForm) {
    window.addEventListener("click", e => { if (e.target === popupForm) closeModal(); });
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ── 3. SKILL CHIPS (Home section) ────────────────────────────
const skillData = {
    excel: {
        title: 'Excel & Power BI',
        icon: 'fa-solid fa-chart-line',
        items: [
            'PivotTables & PivotCharts',
            'Advanced formulas (VLOOKUP, INDEX/MATCH, IF)',
            'Data cleaning & transformation',
            'Interactive Power BI dashboards',
            'DAX measures & calculated columns',
            'KPI cards, slicers & drill-through reports',
            'Revenue & sales trend analysis',
        ]
    },
    sql: {
        title: 'SQL',
        icon: 'fa-solid fa-database',
        items: [
            'SELECT, JOIN, GROUP BY, subqueries',
            'Filtering & aggregating large datasets',
            'Writing queries for data extraction',
            'Data validation & integrity checks',
            'Working with relational databases',
        ]
    },
    webdev: {
        title: 'HTML / CSS / JavaScript',
        icon: 'fa-solid fa-code',
        items: [
            'Semantic HTML5 structure',
            'Responsive layouts with CSS Flexbox & Grid',
            'CSS custom properties & animations',
            'Vanilla JavaScript (DOM, events, fetch)',
            'Form validation & modal interactions',
            'Mobile-first responsive design',
            'Accessibility best practices',
        ]
    },
    uiux: {
        title: 'UI / UX Design',
        icon: 'fa-solid fa-pen-ruler',
        items: [
            'Wireframing & prototyping in Figma',
            'User-centred design principles',
            'Colour theory & visual hierarchy',
            'Typography selection & spacing',
            'Component-based design systems',
            'Accessibility & contrast standards',
        ]
    }
};

const skillPanel        = document.getElementById('skill-panel');
const skillPanelContent = document.getElementById('skill-panel-content');
const chips             = document.querySelectorAll('.chip[data-skill]');

if (skillPanel && skillPanelContent && chips.length) {
    let activeSkill = null;

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const skill = chip.dataset.skill;

            if (activeSkill === skill) {
                // Toggle off
                activeSkill = null;
                chip.classList.remove('chip-active');
                chip.setAttribute('aria-expanded', 'false');
                skillPanel.classList.remove('panel-open');
                return;
            }

            chips.forEach(c => {
                c.classList.remove('chip-active');
                c.setAttribute('aria-expanded', 'false');
            });

            chip.classList.add('chip-active');
            chip.setAttribute('aria-expanded', 'true');
            activeSkill = skill;

            const data = skillData[skill];
            skillPanelContent.innerHTML = `
                <h4><i class="${data.icon}"></i> ${data.title}</h4>
                <ul>${data.items.map(item => `<li>${item}</li>`).join('')}</ul>
            `;
            skillPanel.classList.add('panel-open');
        });
    });
}

// ── 4. PROJECT FILTER (Projects section) ─────────────────────
const filterBtns    = document.querySelectorAll('.proj-filter-btn');
const projCards     = document.querySelectorAll('.proj-card');
const projFeatured  = document.getElementById('projFeatured');

// Collapse/expand state
const collapsibleCards = document.querySelectorAll('.proj-collapsible');
const projToggleBtn    = document.getElementById('projToggleBtn');
let projExpanded       = false;

// Initially hide all cards except index 0
function initProjectCollapse() {
    if (!collapsibleCards.length || !projToggleBtn) return;
    collapsibleCards.forEach((card, i) => {
        if (i > 0) card.classList.add('proj-card--hidden');
    });
}

// Toggle expand / collapse
if (projToggleBtn) {
    projToggleBtn.addEventListener('click', () => {
        projExpanded = !projExpanded;
        const label = projToggleBtn.querySelector('.proj-toggle-label');
        const icon  = projToggleBtn.querySelector('.proj-toggle-icon');

        collapsibleCards.forEach((card, i) => {
            if (i > 0) {
                // Respect current filter — only show cards that match
                const activeFilter = document.querySelector('.proj-filter-btn.active-filter');
                const filter = activeFilter ? activeFilter.dataset.filter : 'all';
                const categoryMatch = filter === 'all' || card.dataset.category === filter;

                if (projExpanded && categoryMatch) {
                    card.classList.remove('proj-card--hidden');
                } else {
                    card.classList.add('proj-card--hidden');
                }
            }
        });

        label.textContent = projExpanded ? 'Show Less' : 'Show All Projects';
        projToggleBtn.setAttribute('aria-expanded', projExpanded);
        icon.style.transform = projExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
    });
}

initProjectCollapse();

if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            // Show/hide the featured card
            if (projFeatured) {
                const featMatch = filter === 'all' || projFeatured.dataset.category === filter;
                projFeatured.classList.toggle('proj-hidden', !featMatch);
            }

            // When filter changes, reset to collapsed state
            projExpanded = false;
            const label = projToggleBtn ? projToggleBtn.querySelector('.proj-toggle-label') : null;
            const icon  = projToggleBtn ? projToggleBtn.querySelector('.proj-toggle-icon') : null;
            if (label) label.textContent = 'Show All Projects';
            if (projToggleBtn) projToggleBtn.setAttribute('aria-expanded', 'false');
            if (icon) icon.style.transform = 'rotate(0deg)';

            // Show only first matching card, hide the rest
            let firstMatch = true;
            projCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                if (!match) {
                    card.classList.add('proj-hidden');
                    card.classList.add('proj-card--hidden');
                } else {
                    card.classList.remove('proj-hidden');
                    if (firstMatch) {
                        card.classList.remove('proj-card--hidden');
                        firstMatch = false;
                    } else {
                        card.classList.add('proj-card--hidden');
                    }
                }
            });

            // Show/hide toggle button — hide it if only 1 or 0 matching cards
            if (projToggleBtn) {
                const matchCount = Array.from(projCards).filter(c =>
                    filter === 'all' || c.dataset.category === filter
                ).length;
                projToggleBtn.parentElement.style.display = matchCount > 1 ? 'flex' : 'none';
            }
        });
    });
}

// ── 5. SMOOTH-SCROLL NAV + SCROLL-SPY ────────────────────────
// Only runs when the nav links with data-section are present
// (i.e. on the single-page index.html, not on project-detail pages).

const navLinks = document.querySelectorAll('.nav-link[data-section]');

if (navLinks.length) {

    // 5a. Smooth-scroll on click (href="#id" already triggers native
    //     smooth-scroll via CSS, but we also prevent any jump flash
    //     and close a mobile menu if one exists in future).
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            const target   = document.querySelector(targetId);
            if (!target) return;           // external page link — do nothing
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // 5b. Scroll-spy — highlight the active nav link as user scrolls.
    //     Uses IntersectionObserver for performance.
    const sectionIds = ['home', 'about', 'projects', 'contact'];
    const sections   = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    // Header height — used as rootMargin so the trigger fires just
    // below the sticky bar rather than at the very top of the viewport.
    const headerEl     = document.getElementById('site-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 65;

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            const isActive = link.dataset.section === sectionId;
            link.classList.toggle('nav-active', isActive);
        });
    }

    // Start with 'home' active on page load
    setActiveLink('home');

    const observerOptions = {
        root: null,
        // Fire when the top of a section crosses just below the header
        rootMargin: `-${headerHeight + 10}px 0px -55% 0px`,
        threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Edge-case: if the user is already near the bottom of the page
    // (contact section), make sure contact gets highlighted even if
    // IntersectionObserver doesn't fire (section is shorter than viewport).
    window.addEventListener('scroll', () => {
        const scrollBottom = window.scrollY + window.innerHeight;
        const docHeight    = document.documentElement.scrollHeight;
        if (scrollBottom >= docHeight - 10) {
            setActiveLink('contact');
        }
    }, { passive: true });
}
