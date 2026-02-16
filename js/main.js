const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const faqItems = document.querySelectorAll('.faq-item');

toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", !isOpen);
    nav.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => observer.observe(el));
});



faqItems.forEach(item => {
const questionBtn = item.querySelector('.faq-question');
const answer = item.querySelector('.faq-answer');
const icon = item.querySelector('.faq-icon');

questionBtn.addEventListener('click', () => {
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

    // Close all other items
    faqItems.forEach(otherItem => {
    const otherAnswer = otherItem.querySelector('.faq-answer');
    const otherIcon = otherItem.querySelector('.faq-icon');
    otherAnswer.style.maxHeight = null;
    otherIcon.textContent = '+';
    });

    // Toggle current item
    if (!isOpen) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.textContent = '−';
    } else {
    answer.style.maxHeight = null;
    icon.textContent = '+';
    }
});
});