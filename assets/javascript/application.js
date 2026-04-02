const application = Stimulus.Application.start()

application.register('time',      TimeController)
application.register('countdown', CountdownController)
application.register('particles', ParticlesController)
application.register('blocks',    BlocksController)
application.register('ical',      IcalController)
