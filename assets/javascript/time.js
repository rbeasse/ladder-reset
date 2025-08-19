function localizeTime(element) {
  const date = new Date(element.textContent);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  element.textContent = date.toLocaleDateString('en-US', options);
}

function updateCountdown(element) {
  const releaseTime    = new Date(element.dataset.time);
  const currentTime    = new Date();
  const timeDifference = releaseTime - currentTime;
  const timeSpan       = element.querySelector('span');
  const releaseBlock   = element.closest('.release-block');

  if (timeDifference <= 0) {
    return;
  }
  
  const days    = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days < 7) {
    timeSpan.classList.add('text-catppuccin-green');
    releaseBlock.classList.add('border-catppuccin-green');
    releaseBlock.classList.remove('border-catppuccin-text');
  } else {
    timeSpan.classList.remove('text-catppuccin-green');
    releaseBlock.classList.remove('border-catppuccin-green');
    releaseBlock.classList.add('border-catppuccin-text');
  }

  timeSpan.textContent = `${days}d ${hours}h ${minutes}m`;
}

const timeHelper = {
  localizeTime: localizeTime,
  updateCountdown: updateCountdown
};