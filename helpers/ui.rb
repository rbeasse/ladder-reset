def button(key, url)
  if url.nil? || url.empty?
    <<~HTML
      <span class="btn btn-disabled">
        #{titleize(key)}
      </span>
    HTML
  else
    <<~HTML
      <a href="#{url}" target="_blank" class="btn">
        #{titleize(key)}
      </a>
    HTML
  end
end

private

def titleize(string)
  string.split('_').map(&:capitalize).join(' ')
end