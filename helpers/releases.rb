require 'town_portal'
require 'json'
require 'time'

def game_releases
  @game_releases ||= TownPortal::Client.new.rows('releases').map do |row|
    %w[name title time].each { |key| row.fetch(key) }
    Time.iso8601(row.fetch('time'))
    buttons = row.fetch('buttons', '{}')
    buttons = JSON.parse(buttons) if buttons.is_a?(String)
    raise TownPortal::Error, 'Release buttons must be an object' unless buttons.is_a?(Hash)
    row.merge('buttons' => buttons)
  end.sort_by { |release| Time.iso8601(release.fetch('time')) }
end
