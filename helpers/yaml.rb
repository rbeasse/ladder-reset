require 'yaml'

def yaml
  YAML.load_file(File.join(Dir.pwd, 'releases.yml'))
end

def game_releases
  yaml['releases'].sort_by { |release| Date.parse(release['time']) }
end

def upcoming_releases
  game_releases.select do |release|
    release_time = Time.parse(release['time'])
    release_time >= Time.now
  end
end

def historical_releases
  game_releases.select do |release|
    release_time = Time.parse(release['time'])
    release_time < Time.now
  end
end
