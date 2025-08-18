document.addEventListener('DOMContentLoaded', function() {
  const timeElements = document.querySelectorAll('p.bg-catppuccin-surface0');
  
  timeElements.forEach(element => {
    const timeString = element.textContent.trim();
    const date = new Date(timeString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: date.getMinutes() === 0 ? undefined : 'numeric',
      hour12: true
    };
    element.title = timeString;
    element.textContent = date.toLocaleDateString('en-US', options).replace(' at ', ' - ');
  });

  const countdownElements = document.querySelectorAll('.countdown');
  
  function updateCountdowns() {
    countdownElements.forEach(element => {
      const targetTime = new Date(element.dataset.target);
      const now = new Date();
      const diff = targetTime - now;
      
      if (diff <= 0) {
        element.querySelector('span').textContent = 'Released!';
        element.closest('.release-block').classList.add('border-catppuccin-red');
        element.closest('.release-block').classList.remove('border-catppuccin-text', 'border-catppuccin-green');
        element.style.display = 'none';
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      
      const span = element.querySelector('span');
      span.textContent = parts.join(' ');
      
      if (days < 7) {
        span.classList.add('text-catppuccin-green');
        element.closest('.release-block').classList.add('border-catppuccin-green');
        element.closest('.release-block').classList.remove('border-catppuccin-text');
      } else {
        span.classList.remove('text-catppuccin-green');
        element.closest('.release-block').classList.remove('border-catppuccin-green');
        element.closest('.release-block').classList.add('border-catppuccin-text');
      }
    });
  }
  
  updateCountdowns();
  setInterval(updateCountdowns, 60000);
});
