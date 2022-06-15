/**
 * Copyright (c) 2022 tapiocode
 * https://github.com/tapiocode
 * MIT License
 */

/**
 * Adds an event listener to the scroll event which updates CSS variables used to create the 3D effect.
 */
(function() {
  // Upper and lower (plus and minus) limits of degrees to prevent overskewing
  const degreesLimit = 60;
  // From 0.0 (viewport top) to 1.0 (viewport bottom), the point at which skewing is zero
  const zeroDegreesAtHeight = 0.7;

  function skew() {
    const viewportHeight = window.innerHeight;
    const elems = document.getElementsByClassName('wraparound');

    for (const elem of elems) {
      const dims = elem.getBoundingClientRect();
      const elemOffset = dims.top - zeroDegreesAtHeight * viewportHeight;
      const diffFromZeroLevel = elemOffset/viewportHeight;
      const degreesClamped = Math.min(degreesLimit,
        Math.max(degreesLimit * -1, diffFromZeroLevel * degreesLimit * -1));

      elem.style.setProperty('--skew-deg', degreesClamped);
      elem.style.setProperty('--elem-height', dims.height);
      elem.style.setProperty('--elem-background-color', window.getComputedStyle(elem).backgroundColor);
      elem.style.setProperty('--diff-from-zero-level', diffFromZeroLevel);
    }
  }
  skew();
  document.addEventListener('scroll', skew);
})();
