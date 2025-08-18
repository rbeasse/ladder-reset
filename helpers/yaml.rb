require 'yaml'

def yaml
  YAML.load_file(File.join(Dir.pwd, 'releases.yml'))
end
