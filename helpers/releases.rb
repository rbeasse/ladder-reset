require 'town_portal'

def game_releases
  @game_releases ||= TownPortal::Client.new.rows('releases').map do |release|
    release.merge('buttons' => JSON.parse(release.fetch('buttons')))
  end
end
