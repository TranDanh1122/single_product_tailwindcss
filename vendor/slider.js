// i feel some stuck when loading page here, so i try to load async
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src
    script.async = true
    script.defer = true
    script.onload = callback
    document.body.appendChild(script);
}
let initSlider = (thumbnail, main) => {
    const thumbnailSlider = new Swiper(`.${thumbnail}`, {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    let mainSlider = new Swiper(`.${main}`, {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: thumbnailSlider,
        },
    });
}
loadScript('https://cdn.jsdelivr.net/npm/swiper@latest/swiper-bundle.min.js', function () {
    initSlider('thumbnail-slider', 'main-slider')
});

let sliderOverLay = document.querySelector('.slider_overlay')
let slider = document.getElementById('sliderContent')
document.getElementById('main-image').addEventListener('click', function (e) {
    sliderOverLay.style.display = 'block'
    let sliderContent = slider.cloneNode('true')
    sliderContent.querySelector('.thumbnail-slider').classList.add('thumbnail-slider-clone')
    sliderContent.querySelector('.thumbnail-slider').classList.remove('thumbnail-slider')
    sliderContent.querySelector('.main-slider').classList.add('main-slider-clone')
    sliderContent.querySelector('.main-slider').classList.remove('main-slider')

    sliderContent.querySelector('.swiper-button-next').removeAttribute('hidden')
    sliderContent.querySelector('.swiper-button-prev').removeAttribute('hidden')

    sliderOverLay.innerHTML = ''
    sliderOverLay.insertAdjacentElement('beforeEnd', sliderContent)
    initSlider('thumbnail-slider-clone', 'main-slider-clone')
})
sliderOverLay.addEventListener('click', function (e) {
    console.log(e.target.classList.contains('slider_overlay'));

    if (e.target.classList.contains('slider_overlay') || e.target.parentElement.classList.contains('slider_overlay')) {
        sliderOverLay.style.display = "none"
    }
})