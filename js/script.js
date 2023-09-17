//Slider

const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");

let currentIndex = 0;

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

function updateSlider() {
    const translateX = -currentIndex * 100;
    slider.style.transform = 'translateX(' + translateX + '%)';
}

setInterval(nextSlide, 5000);

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
