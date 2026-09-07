require 'town_portal'

def game_releases
  @game_releases ||= TownPortal::Client.new.rows('releases')
end
