require 'yaml'

def yaml
  YAML.load_file(File.join(Dir.pwd, 'releases.yml'))
end

def game_releases
  yaml['releases'].sort_by { |release| Date.parse(release['time']) }.select { |release| Date.parse(release['time']) >= Date.today - 3 }
end
