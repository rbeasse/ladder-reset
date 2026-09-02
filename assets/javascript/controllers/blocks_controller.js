var BlocksController = class extends Stimulus.Controller {
  static targets = ["container", "template", "eventTemplate", "navUpcoming", "navHistory", "navEvents"]

  async connect() {
    const [releasesResponse, eventsResponse] = await Promise.all([
      fetch('/releases.json'),
      fetch('/events.json')
    ])
    this.releases = await releasesResponse.json()
    this.events   = await eventsResponse.json()
    this.filter   = 'upcoming'
    this.render()
  }

  showUpcoming() {
    this.filter = 'upcoming'
    this.__setActiveNav(this.navUpcomingTarget)
    this.render()
  }

  showHistory() {
    this.filter = 'history'
    this.__setActiveNav(this.navHistoryTarget)
    this.render()
  }

  showEvents() {
    this.filter = 'events'
    this.__setActiveNav(this.navEventsTarget)
    this.render()
  }

  __setActiveNav(activeTarget) {
    const navTargets = [this.navUpcomingTarget, this.navHistoryTarget]
    if (this.hasNavEventsTarget) navTargets.push(this.navEventsTarget)

    navTargets.forEach(target => {
      target.classList.toggle('active', target === activeTarget)
    })
  }

  render() {
    const now = new Date()

    let visible
    if (this.filter === 'events') {
      visible = this.events
    } else {
      visible = this.releases.filter(release => {
        const releaseTime = new Date(release.time)
        if (this.filter === 'upcoming') return releaseTime >= now
        return releaseTime < now
      })
      if (this.filter === 'history') visible.reverse()
    }

    const template = this.filter === 'events' ? this.eventTemplateTarget : this.templateTarget

    this.containerTarget.innerHTML = ''
    visible.forEach(release => {
      const clone = template.content.cloneNode(true)
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
    this.__field(clone, 'time').dataset.timeIsoValue = release.time

    const titleField = this.__field(clone, 'title')
    if (titleField) titleField.textContent = release.title

    this.__setButtons(clone, release.buttons)

    const countdownField = this.__field(clone, 'countdown')
    if (countdownField) countdownField.dataset.countdownTimeValue = release.time
  }

  __setButtons(clone, buttons) {
    const buttonBar = this.__field(clone, 'buttons')
    if (!buttonBar) return

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
