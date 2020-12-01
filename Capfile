set :deploy_config_path, '../ops/capistrano/myhelsinki-react.rb'
set :stage_config_path, '../ops/capistrano/deploy/myhelsinki-react'

require 'capistrano/setup'
require 'capistrano/deploy'

# import tasks from the ops submodule
Dir.glob('../ops/capistrano/tasks/*.rake').each { |r| import r }
