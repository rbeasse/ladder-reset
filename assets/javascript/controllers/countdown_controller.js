var CountdownController = class extends Stimulus.Controller {
  static targets = ["display"]
  static values  = { time: String }

  connect() {
    this.tick()
    this.interval = setInterval(() => this.tick(), 5000)
  }

  disconnect() {
    clearInterval(this.interval)
  }

  tick() {
    const release = new Date(this.timeValue)
    const now     = new Date()
    const diff    = release - now

    if (diff <= 0) {
      const days = Math.floor((now - release) / 864e5)
      this.displayTarget.classList.remove('text-catppuccin-green')
      this.displayTarget.textContent = days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`
      return
    }

    const days    = Math.floor(diff / 864e5)
    const hours   = Math.floor((diff % 864e5) / 36e5)
    const minutes = Math.floor((diff % 36e5) / 6e4)

    this.displayTarget.classList.toggle('text-catppuccin-green', days < 7)
    this.displayTarget.textContent = `${days}d ${hours}h ${minutes}m`
  }
}
