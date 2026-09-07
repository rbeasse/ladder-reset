require 'minitest/autorun'
require_relative '../helpers/releases'

class ReleasesTest < Minitest::Test
  def test_decodes_buttons_for_the_templates
    with_releases([release]) do |helper|
      buttons = helper.send(:game_releases).first.fetch('buttons')

      assert_equal 'https://example.com/patch-notes', buttons.dig('patch_notes', 'url')
    end
  end

  def test_fetches_once_per_build_and_keeps_the_endpoint_order
    releases = [release('Diablo'), release('Last Epoch')]

    with_releases(releases) do |helper|
      first = helper.send(:game_releases)
      second = helper.send(:game_releases)

      assert_same first, second
      assert_equal ['Diablo', 'Last Epoch'], first.map { |row| row.fetch('name') }
    end
  end

  def test_stops_the_build_when_tristram_is_unavailable
    client = Minitest::Mock.new
    client.expect(:rows, nil) { raise TownPortal::Error, 'Unable to reach Tristram' }

    TownPortal::Client.stub(:new, client) do
      assert_raises(TownPortal::Error) { Object.new.send(:game_releases) }
    end
  end

  private

  def with_releases(rows)
    client = Minitest::Mock.new
    client.expect(:rows, rows, ['releases'])

    TownPortal::Client.stub(:new, client) { yield Object.new }
    client.verify
  end

  def release(name = 'Diablo')
    {
      'name' => name,
      'title' => 'Season 1',
      'time' => '2025-08-01T12:00:00Z',
      'buttons' => JSON.generate(patch_notes: { url: 'https://example.com/patch-notes' })
    }
  end
end
