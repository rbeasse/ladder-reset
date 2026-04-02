var BlocksController = class extends Stimulus.Controller {
  static targets = ["container", "template", "navUpcoming", "navHistory"]

  async connect() {
    const response   = await fetch('/releases.json')
    this.releases    = await response.json()
    this.filter      = 'upcoming'
    this.render()
  }

  showUpcoming() {
    this.filter = 'upcoming'
    this.navUpcomingTarget.classList.add('active')
    this.navHistoryTarget.classList.remove('active')
    this.render()
  }

  showHistory() {
    this.filter = 'history'
    this.navHistoryTarget.classList.add('active')
    this.navUpcomingTarget.classList.remove('active')
    this.render()
  }

  render() {
    const now = new Date()

    const visible = this.releases.filter(release => {
      const releaseTime = new Date(release.time)
      if (this.filter === 'upcoming') return releaseTime >= now
      return releaseTime < now
    })

    this.containerTarget.innerHTML = ''
    visible.forEach(release => {
      const clone = this.templateTarget.content.cloneNode(true)
      this.__populate(clone, release)
      this.containerTarget.append(clone)
    })
  }

  __field(clone, name) {
    return clone.querySelector(`[data-field="${name}"]`)
  }

  __populate(clone, release) {
    const block = clone.querySelector('.release-block')
    block.classList.add(release.game_class)
    block.dataset.target = release.time

    this.__field(clone, 'name').textContent          = release.name
    this.__field(clone, 'title').textContent         = release.title
    this.__field(clone, 'time').dataset.timeIsoValue = release.time

    this.__setButtons(clone, release.buttons)
    this.__field(clone, 'countdown').dataset.countdownTimeValue = release.time
  }

  __setButtons(clone, buttons) {
    const buttonBar  = this.__field(clone, 'buttons')
    const buttonList = buttons || []
    buttonBar.insertAdjacentHTML('beforeend', buttonList.map(this.__buttonHTML).join(''))
  }

  __buttonHTML(button) {
    const isLink    = !!button.url
    const tag       = isLink ? 'a' : 'span'
    const linkAttrs = isLink ? ` href="${button.url}" target="_blank"` : ''
    const classes   = isLink ? 'button' : 'button disabled'
    const icon      = button.icon_svg ? `<span class="button-icon">${button.icon_svg}</span>` : ''
    return `<${tag}${linkAttrs} class="${classes}">${icon}${button.label}</${tag}>`
  }
}
