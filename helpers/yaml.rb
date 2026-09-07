require 'yaml'
require 'json'

def events_yaml
  YAML.load_file(File.join(Dir.pwd, 'events.yml'))
end

def game_events
  events_yaml['events'].sort_by { |event| Date.parse(event['time']) }
end

