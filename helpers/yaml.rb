require 'yaml'
require 'json'

def yaml
  YAML.load_file(File.join(Dir.pwd, 'releases.yml'))
end

def game_releases
  yaml['releases'].sort_by { |release| Date.parse(release['time']) }
end

def events_yaml
  YAML.load_file(File.join(Dir.pwd, 'events.yml'))
end

def game_events
  events_yaml['events'].sort_by { |event| Date.parse(event['time']) }
end

