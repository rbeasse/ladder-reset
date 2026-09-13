require 'minitest/autorun'
require_relative '../helpers/releases'
require_relative '../helpers/predictions'

class PredictionsTest < Minitest::Test
  def test_fetches_predictions_once_from_the_configured_endpoint
    client = Minitest::Mock.new
    row = prediction
    client.expect(:rows, [row], ['predictions'])
    TownPortal::Client.stub(:new, client) do
      helper = Object.new
      assert_same helper.send(:game_predictions), helper.send(:game_predictions)
    end
    client.verify
  end

  def test_rough_eta_stays_broad_when_accuracy_is_low_or_history_is_short
    helper = Object.new
    assert_equal 'End of October', helper.send(:prediction_eta, prediction.merge('release_date' => '2026-10-28'))
    assert_equal 'Mid October', helper.send(:prediction_eta, prediction)
    assert_equal 'Mid October', helper.send(:prediction_eta, prediction.merge('timing_accuracy' => 100, 'backtest_count' => 2))
    assert_equal 'Around October 15', helper.send(:prediction_eta, prediction.merge('timing_accuracy' => 100))
  end

  def test_windows_are_readable_across_months_and_years
    helper = Object.new
    assert_equal 'Oct 3–27', helper.send(:prediction_window, prediction)
    assert_equal 'Oct 3 – Nov 27', helper.send(:prediction_window, prediction.merge('latest_date' => '2026-11-27'))
    assert_equal 'Oct 3, 2026 – Jan 8, 2027', helper.send(:prediction_window, prediction.merge('latest_date' => '2027-01-08'))
  end

  private

  def prediction
    {'release_date' => '2026-10-15', 'timing_accuracy' => 60, 'backtest_count' => 5,
     'earliest_date' => '2026-10-03', 'latest_date' => '2026-10-27'}
  end
end
