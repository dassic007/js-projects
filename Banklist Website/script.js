///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Cookie message

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improving user experience. <button class="cookie-btn"> Got it!</button>';

// Appending message to header
header.prepend(message);

// Close cookies functionality
document.querySelector('.cookie-btn').addEventListener('click', function () {
    message.remove();
});

//Implementing scroll to by down arrow

const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

const navlinks = document.querySelectorAll('.nav__link');


btnscrollto.addEventListener('click', function (event) {
    // Old School way of doing this

    // const s1coord = section1.getBoundingClientRect();

    // // Not smooth
    // // window.scrollTo(s1coord.left + window.pageXOffset, s1coord.top + window.pageYOffset);

    // //smooth
    // window.scrollTo({
    //     left: s1coord.left + window.pageXOffset,
    //     top: s1coord.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });

    // Modern way
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation (Old way)
// navlinks.forEach(function (element) {
//     element.addEventListener('click', function (e) {
//         e.preventDefault();
//         const section = this.getAttribute('href');
//         document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
//     })
// });

// Page navigation (new way)
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
        const section = e.target.getAttribute('href');
        document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
    }
});

// Tabbed Components

const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');

tabscontainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    // Remove active classes
    tabs.forEach(el => el.classList.remove('operations__tab--active'));
    content.forEach(el => el.classList.remove('operations__content--active'));

    // Activate Tab
    clicked.classList.add('operations__tab--active');

    // Activate content
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu Fade animation

const nav = document.querySelector('.nav');

const menuFade = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const clicked = e.target;
        const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
        const logo = clicked.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== clicked) {
                el.style.opacity = this;
                logo.style.opacity = this;
            }
        })
    }
};

nav.addEventListener('mouseover', menuFade.bind(0.5));

nav.addEventListener('mouseout', menuFade.bind(1));

// Sticky Nav Bar
const navheight = nav.getBoundingClientRect().height;

const stickNav = function (entries) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting)
        nav.classList.add('sticky');
    else
        nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navheight}px`,
});
headerObserver.observe(header);


// Revealing elements on scroll
const section = document.querySelectorAll('.section');

const reveal = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(reveal, {
    root: null,
    threshold: 0.15,
});

section.forEach((sect) => {
    sectionObserver.observe(sect);
    sect.classList.add('section--hidden');
});

// Lazy load of images
const imgtargets = document.querySelectorAll('img[data-src]');

const revealimg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(revealimg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});
imgtargets.forEach(el => imgObserver.observe(el));

// Implementing slider
const slides = document.querySelectorAll('.slide');
const sliderRight = document.querySelector('.slider__btn--right');
const sliderLeft = document.querySelector('.slider__btn--left');

let currentSlide = 0;
const maxSlides = slides.length;

const gotoSlide = function (slide) {
    slides.forEach((sl, i) => {
        sl.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
};

gotoSlide(0);

const nextSlide = function () {
    if (currentSlide == maxSlides - 1)
        currentSlide = 0;
    else
        currentSlide++;

    gotoSlide(currentSlide);
}

const prevSlide = function () {
    if (currentSlide == 0)
        currentSlide = maxSlides - 1;
    else
        currentSlide--;

    gotoSlide(currentSlide);
}

sliderRight.addEventListener('click', nextSlide);
sliderLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight')
        nextSlide();
    else if (e.key === 'ArrowLeft')
        prevSlide();
});