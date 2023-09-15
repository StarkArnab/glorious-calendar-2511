const categoryContainer = document.querySelector(".category-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const itemWidth = categoryContainer.querySelector(".category-item").offsetWidth;
let currentIndex = 0;

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= categoryContainer.children.length) {
        currentIndex = 0;
    }
    updateSlider();
});

prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = categoryContainer.children.length - 1;
    }
    updateSlider();
});

function updateSlider() {
    const offset = -currentIndex * itemWidth;
    categoryContainer.style.transform = `translateX(${offset}px)`;
}

// Auto-infinite scrolling
function autoSlide() {
    currentIndex++;
    if (currentIndex >= categoryContainer.children.length) {
        currentIndex = 0;
    }
    updateSlider();
    setTimeout(autoSlide, 2000); // Change slide every 2 seconds
}

autoSlide(); // Start auto sliding