document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#cba6f7", "#89b4fa", "#74c7ec", "#89dceb", "#94e2d5", "#a6e3a1"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

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
