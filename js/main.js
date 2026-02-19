const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".nav-overlay");
const navLinks = document.querySelectorAll(".nav-link");
const faqItems = document.querySelectorAll('.faq-item');
const submenuParents = document.querySelectorAll('.has-submenu');

/* ---------------- MOBILE NAV ---------------- */

const closeMenu = () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    toggle.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";

    // Close all submenus when menu closes
    submenuParents.forEach(parent => {
        parent.classList.remove('open');
        const btn = parent.querySelector('.submenu-toggle');
        if (btn) btn.setAttribute('aria-expanded', false);
    });
};

const openMenu = () => {
    nav.classList.add("active");
    overlay.classList.add("active");
    toggle.setAttribute("aria-expanded", true);
    document.body.style.overflow = "hidden";
};

toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
});

// Close when clicking overlay
overlay.addEventListener("click", closeMenu);

/* ---------------- NAV LINK BEHAVIOUR ---------------- */

// Close menu ONLY if it's a normal link (not submenu parent)
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const parent = link.closest('.has-submenu');
        const isMobile = window.innerWidth < 1024;

        // If this link has submenu (like "Practice")
        if (parent && isMobile) {
            const isOpen = parent.classList.contains('open');

            // First click opens submenu instead of navigating
            if (!isOpen) {
                //e.preventDefault();

                // Close other submenus
                submenuParents.forEach(p => {
                    p.classList.remove('open');
                    const btn = p.querySelector('.submenu-toggle');
                    if (btn) btn.setAttribute('aria-expanded', false);
                });

                parent.classList.add('open');

                const btn = parent.querySelector('.submenu-toggle');
                if (btn) btn.setAttribute('aria-expanded', true);

                return;
            }
        }

        // Otherwise close menu normally
        closeMenu();
    });
});

/* ---------------- SUBMENU TOGGLE BUTTON ---------------- */

submenuParents.forEach(parent => {
    const toggleBtn = parent.querySelector('.submenu-toggle');

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        const isOpen = parent.classList.contains('open');

        // Close all
        submenuParents.forEach(p => {
            p.classList.remove('open');
            const btn = p.querySelector('.submenu-toggle');
            if (btn) btn.setAttribute('aria-expanded', false);
        });

        // Open current
        if (!isOpen) {
            parent.classList.add('open');
            toggleBtn.setAttribute('aria-expanded', true);
        }
    });
});

/* ---------------- FADE IN ANIMATION ---------------- */

document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => observer.observe(el));
});

/* ---------------- FAQ ACCORDION ---------------- */

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    questionBtn.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

        // Close all
        faqItems.forEach(otherItem => {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-icon');

            otherAnswer.style.maxHeight = null;
            otherIcon.textContent = '+';
        });

        // Toggle current
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.textContent = '−';
        } else {
            answer.style.maxHeight = null;
            icon.textContent = '+';
        }
    });
});
