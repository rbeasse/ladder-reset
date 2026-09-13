require 'date'

def game_predictions
  @game_predictions ||= TownPortal::Client.new.rows('predictions')
end

def prediction_eta(prediction)
  date = Date.iso8601(prediction.fetch('release_date'))
  accuracy = prediction['timing_accuracy']
  if accuracy && accuracy >= 90 && prediction.fetch('backtest_count', 0) >= 5
    return "Around #{date.strftime('%B %-d')}"
  end

  part = date.day <= 10 ? 'Early' : (date.day <= 20 ? 'Mid' : 'End of')
  "#{part} #{date.strftime('%B')}"
end

def prediction_window(prediction)
  first = Date.iso8601(prediction.fetch('earliest_date'))
  last = Date.iso8601(prediction.fetch('latest_date'))
  if first.year != last.year
    "#{first.strftime('%b %-d, %Y')} – #{last.strftime('%b %-d, %Y')}"
  elsif first.month == last.month
    "#{first.strftime('%b %-d')}–#{last.day}"
  else
    "#{first.strftime('%b %-d')} – #{last.strftime('%b %-d')}"
  end
end
