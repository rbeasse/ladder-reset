require 'minitest/autorun'
require_relative '../helpers/releases'

class ReleasesTest < Minitest::Test
  def test_fetches_once_per_build_and_decodes_buttons
    calls = []
    client = Object.new
    client.define_singleton_method(:rows) do |slug|
      calls << slug
      [
        { 'name' => 'Later', 'title' => 'Season 2', 'time' => '2025-09-01T12:00:00Z', 'buttons' => '{"video":{"url":"https://example.com","icon":"youtube"}}' },
        { 'name' => 'Earlier', 'title' => 'Season 1', 'time' => '2025-08-01T12:00:00Z', 'buttons' => '{}' }
      ]
    end
    TownPortal::Client.stub(:new, client) do
      assert_equal %w[Earlier Later], game_releases.map { |row| row['name'] }
      assert_equal 'https://example.com', game_releases.last['buttons']['video']['url']
      assert_equal ['releases'], calls
    end
  end

  def test_remote_errors_abort_instead_of_falling_back_to_yaml
    client = Object.new
    client.define_singleton_method(:rows) { |_| raise TownPortal::Error, 'Tristram returned HTTP 401' }
    TownPortal::Client.stub(:new, client) do
      assert_raises(TownPortal::Error) { game_releases }
    end
  end
end
