var IcalController = class extends Stimulus.Controller {
  copy() {
    const url = new URL('/releases.ics', window.location.origin).href
    navigator.clipboard.writeText(url)

    const original = this.element.innerHTML
    this.element.textContent = 'Copied!'

    setTimeout(() => { this.element.innerHTML = original }, 2000)
  }
}
