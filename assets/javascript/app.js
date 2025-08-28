document.addEventListener('DOMContentLoaded', function() {
  particlesJS.load('particles-js', 'assets/javascript/particles.json');

  const timeElements       = document.querySelectorAll('.local-time');
  const countdownElements  = document.querySelectorAll('.countdown');

  // Localize all time elements
  timeElements.forEach(element => {
    timeHelper.localizeTime(element);
  });

  // Update all countdown elements and apply a interval so they auto-update
  countdownElements.forEach(element => {
    timeHelper.updateCountdown(element);

    setInterval(() => timeHelper.updateCountdown(element), 5000);
  });
});