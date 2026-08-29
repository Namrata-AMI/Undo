gsap.registerPlugin(ScrollTrigger);

gsap.from(".collection-img", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.25,
    ease: "power3.out",

    scrollTrigger: {
        trigger: ".collection-section",
        start: "top 75%",
        toggleActions: "restart none restart none"
    }
});


gsap.registerPlugin(ScrollTrigger);


// PRODUCT IMAGE
gsap.from(".product-image", {
    scale: 0.5,
    rotation: -15,
    y: 300,
    opacity: 0,

    duration: 1.5,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".product-showcase",
        start: "top 75%",
        toggleActions: "restart none restart none"
    }
});


// LEFT TEXT
gsap.from(".text-left", {
    x: -250,
    rotation: -8,
    opacity: 0,

    duration: 1.2,
    delay: 0.2,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".product-showcase",
        start: "top 70%",
        toggleActions: "restart none restart none"
    }
});


// RIGHT TEXT
gsap.from(".text-right", {
    x: 250,
    rotation: 8,
    opacity: 0,

    duration: 1.2,
    delay: 0.4,
    ease: "power4.out",

    scrollTrigger: {
        trigger: ".product-showcase",
        start: "top 70%",
        toggleActions: "restart none restart none"
    }
});


// BOTTOM RIGHT TEXT
gsap.from(".text-right-bottom", {
    x: 300,
    y: 100,
    rotation: 10,
    opacity: 0,

    duration: 1.3,
    delay: 0.6,
    ease: "back.out(1.7)",

    scrollTrigger: {
        trigger: ".product-showcase",
        start: "top 65%",
        toggleActions: "restart none restart none"
    }
});



//////////// images///////////
const images = document.querySelectorAll(".last-section img");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

images.forEach(img => {
    observer.observe(img);
});








/// 
document.addEventListener("DOMContentLoaded", () => {

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {

        question.addEventListener("click", () => {

            const currentItem = question.closest(".faq-item");

            // Close other FAQ items
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove("active");
                }
            });

            // Toggle current item
            currentItem.classList.toggle("active");

        });

    });

});