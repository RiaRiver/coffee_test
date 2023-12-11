const initSwipe = () => {
  const swipeState = {};

  const handleMove = (event) => {
    swipeState.endX = event.clientX || event.changedTouches[0].clientX;

    const dist = (swipeState.startX - swipeState.endX);
    const direction = dist > 0 ? 'left' : 'right';

    if (Math.abs(dist) > 75) {
      const swipeEvent = new CustomEvent('swipe', {
        bubbles: true,
        detail: {
          direction,
        },
      });

      event.target.dispatchEvent(swipeEvent);
    }
  };

  const handleStart = (event) => {
    swipeState.startX = event.clientX || event.touches[0].clientX;
  };

  document.addEventListener('mousedown', handleStart);
  document.addEventListener('mouseup', handleMove);
  document.addEventListener('touchstart', handleStart);
  document.addEventListener('touchend', handleMove);
};

export default initSwipe;
