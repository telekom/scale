exports.setTrasitionToZero = () => {
  const transitions = [
    '--scl-motion-duration-immediate',
    '--scl-motion-duration-fast',
    '--scl-motion-duration-slower',
    '--scl-motion-duration-deliberate',
  ];

  transitions.forEach((transitionSpeed) => {
    document.body.style.setProperty(transitionSpeed, '0s');
  });
};
