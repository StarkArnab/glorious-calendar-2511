document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const featureContainer = document.querySelector(".feature-container");
    const featureItems = document.querySelectorAll(".feature-item");
    const scrollAmount = featureItems[0].offsetWidth * 2 + 20; // Scroll two items at a time

    let currentIndex = 0;

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex -= 2; // Scroll two items back
            scrollToIndex();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < featureItems.length - 2) {
            currentIndex += 2; // Scroll two items forward
            scrollToIndex();
        }
    });

    function scrollToIndex() {
        featureContainer.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
    }
});
