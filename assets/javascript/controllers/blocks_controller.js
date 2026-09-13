var BlocksController = class extends Stimulus.Controller {
  static targets = ["container", "template", "predictionTemplate", "predictionNote", "navUpcoming", "navHistory", "navPredictions"]

  async connect() {
    const [releasesResponse, predictionsResponse] = await Promise.all([
      fetch('/releases.json'),
      fetch('/predictions.json')
    ])
    this.releases = await releasesResponse.json()
    this.predictions = await predictionsResponse.json()
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

  showPredictions() {
    this.filter = 'predictions'
    this.__setActiveNav(this.navPredictionsTarget)
    this.render()
  }

  __setActiveNav(activeTarget) {
    const navTargets = [this.navUpcomingTarget, this.navHistoryTarget]
    navTargets.push(this.navPredictionsTarget)

    navTargets.forEach(target => {
      target.classList.toggle('active', target === activeTarget)
    })
  }

  render() {
    const now = new Date()

    let visible
    if (this.filter === 'predictions') {
      visible = this.predictions.filter(prediction => new Date(prediction.time) >= now)
    } else {
      visible = this.releases.filter(release => {
        const releaseTime = new Date(release.time)
        if (this.filter === 'upcoming') return releaseTime >= now
        return releaseTime < now
      })
      if (this.filter === 'history') visible.reverse()
    }

    const template = this.filter === 'predictions' ? this.predictionTemplateTarget : this.templateTarget

    this.predictionNoteTarget.hidden = this.filter !== 'predictions'
    this.containerTarget.innerHTML = ''
    if (!visible.length) {
      const message = document.createElement('p')
      message.className = 'text-sm text-catppuccin-subtext0'
      message.textContent = this.filter === 'predictions' ? 'No upcoming predictions available.' : 'No releases to show.'
      this.containerTarget.append(message)
    }
    visible.forEach(release => {
      const clone = template.content.cloneNode(true)
      if (this.filter === 'predictions') this.__populatePrediction(clone, release)
      else this.__populate(clone, release)
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

    this.__setPatchNotes(clone, release.patch_notes_url)

    const countdownField = this.__field(clone, 'countdown')
    if (countdownField) countdownField.dataset.countdownTimeValue = release.time
  }

  __populatePrediction(clone, prediction) {
    clone.querySelector('.release-block').classList.add(prediction.game_class)
    this.__field(clone, 'name').textContent = prediction.name
    this.__field(clone, 'title').textContent = prediction.title
    this.__field(clone, 'eta').textContent = prediction.eta
    this.__field(clone, 'window').textContent = `Likely window: ${prediction.window}`
    const accuracy = this.__field(clone, 'accuracy')
    accuracy.textContent = prediction.timing_accuracy === null ? 'Building timing history' : `${prediction.timing_accuracy}% timing accuracy`
    accuracy.title = `${prediction.backtest_hits} of ${prediction.backtest_count} recent forecasts landed within 7 days.`
  }

  __setPatchNotes(clone, url) {
    const buttonBar = this.__field(clone, 'patch-notes')
    if (!buttonBar || !url) return

    const link = new URL(url)
    if (!['https:', 'http:'].includes(link.protocol)) return

    const button = document.createElement('a')
    button.href = link.href
    button.target = '_blank'
    button.rel = 'noopener noreferrer'
    button.className = 'button'
    button.textContent = 'Patch Notes'
    buttonBar.append(button)
  }
}
