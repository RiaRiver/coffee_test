// eslint-disable-next-line import/extensions
import IntervalTimer from './_timer.js';

class Slider {
  constructor(sliderSelector, speed = 0.5) {
    this.slider = document.querySelector(sliderSelector);
    this.slides = this.slider.querySelector('.slides');
    this.speed = speed;
    this.currentSlide = 1;
    this.lastSlide = this.slider.querySelectorAll('.slide').length;
    this.bullets = this.slider.querySelector('.pagination').children;

    this.slides.style.transition = `translate ${this.speed}s`;
  }

  activateBullet() {
    // eslint-disable-next-line no-restricted-syntax
    for (const bullet of this.bullets) {
      bullet.removeAttribute('data-active');
    }

    this.bullets[this.currentSlide - 1].setAttribute('data-active', '');
  }

  changeSlide() {
    const targetTranslate = (this.currentSlide - 1) * -100;

    this.slides.style.translate = `${targetTranslate}%`;
    this.activateBullet();
  }

  next() {
    this.currentSlide = this.currentSlide === this.lastSlide ? 1 : this.currentSlide + 1;
    this.changeSlide();
  }

  prev() {
    this.currentSlide = this.currentSlide === 1 ? this.lastSlide : this.currentSlide - 1;
    this.changeSlide();
  }

  left() {
    this.next();
  }

  right() {
    this.prev();
  }

  stop = (event) => {
    if (event.target.closest('.slide > div')) {
      this.interval.pause();
    }
  };

  play = (event) => {
    if (event.target.closest('.slide > div')) {
      event.preventDefault();
      this.interval.start();
    }
  };

  handleSlider = (event) => {
    const { target } = event;
    const isBtn = !!target.classList.contains('slider__btn');
    const isSwipeOnSlide = event.type === 'swipe' && target.closest('.slide');

    if (!isBtn && !isSwipeOnSlide) return;

    const direction = target.dataset.direction || event.detail.direction;

    this[direction]();
    this.interval.start();
  };

  startPagination() {
    const root = document.querySelector(':root');

    setInterval(() => {
      const scale = (this.interval.elapsedTime / this.interval.delay).toFixed(3);

      root.style.setProperty('--bullet-scale', scale);
    }, 100);
  }

  init() {
    this.interval = new IntervalTimer(this.next.bind(this), 7000);
    this.interval.start();

    this.startPagination();
    this.slider.addEventListener('click', this.handleSlider);
    this.slider.addEventListener('swipe', this.handleSlider);
    this.slider.addEventListener('mouseover', this.stop);
    this.slider.addEventListener('mouseout', this.play);
    this.slider.addEventListener('touchstart', this.stop);
    this.slider.addEventListener('touchend', this.play);
  }
}

export default Slider;
