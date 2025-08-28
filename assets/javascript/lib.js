function localizeTime(element) {
  const date = new Date(element.textContent);
  const container = document.querySelector('main.container');
  const containerWidth = container ? container.offsetWidth : window.innerWidth;

  let options;
  
  if (containerWidth < 500) {
    options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
  } else {
    options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  }

  element.textContent = date.toLocaleDateString('en-US', options);
}

function updateCountdown(element) {
  const releaseTime    = new Date(element.dataset.time);
  const currentTime    = new Date();
  const timeDifference = releaseTime - currentTime;
  const timeSpan       = element.querySelector('span');
  const releaseBlock   = element.closest('.release-block');

  if (timeDifference <= 0) {
    _timeSince(element);
    return;
  }
  
  const days    = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days < 7) {
    timeSpan.classList.add('text-catppuccin-green');
  } else {
    timeSpan.classList.remove('text-catppuccin-green');
  }

  timeSpan.textContent = `${days}d ${hours}h ${minutes}m`;
}

function _timeSince(element) {
  const releaseTime = new Date(element.dataset.time);
  const currentTime = new Date();
  const timeDifference = currentTime - releaseTime;
  const timeSpan = element.querySelector('span');
  
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    timeSpan.textContent = 'Today';
  } else {
    timeSpan.textContent = `${days} day${days === 1 ? '' : 's'} ago`;
  }
}

const timeHelper = {
  localizeTime: localizeTime,
  updateCountdown: updateCountdown
};