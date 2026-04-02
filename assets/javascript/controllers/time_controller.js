var TimeController = class extends Stimulus.Controller {
  static values = { iso: String }

  connect() {
    this.localize()
    this._onResize = () => this.localize()
    window.addEventListener('resize', this._onResize)
  }

  disconnect() {
    window.removeEventListener('resize', this._onResize)
  }

  localize() {
    const date  = new Date(this.isoValue)
    const width = document.querySelector('main')?.offsetWidth ?? window.innerWidth
    const opts  = width < 500
      ? { year: '2-digit', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true }
      : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    this.element.textContent = date.toLocaleDateString('en-US', opts)
  }
}
