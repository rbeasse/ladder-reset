var ParticlesController = class extends Stimulus.Controller {
  connect() {
    particlesJS.load(this.element.id, 'assets/javascript/particles.json')
  }
}
