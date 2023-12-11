const handleScroll = (action) => {
  const noScrollClass = 'no-scroll';

  if (action === 'on') { document.body.classList.remove(noScrollClass); }
  if (action === 'off') { document.body.classList.add(noScrollClass); }
  if (action === 'toggle') { document.body.classList.toggle(noScrollClass); }
};

export default handleScroll;
