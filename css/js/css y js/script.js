document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach((section) => {
            let sectionTop = section.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();
});
