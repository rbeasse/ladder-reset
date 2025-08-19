def button(key, url, icon: nil)
  if url.nil? || url.empty?
    <<~HTML
      <span class="button disabled">
        #{svg_icon(icon)}#{titleize(key)}
      </span>
    HTML
  else
    <<~HTML
      <a href="#{url}" target="_blank" class="button">
        #{svg_icon(icon)}#{titleize(key)}
      </a>
    HTML
  end
end

def svg_icon(name)
  svg_content = File.read("assets/images/#{name}.svg")

  "<span class=\"button-icon\">#{svg_content}</span>"
end

private

def titleize(string)
  string.split('_').map(&:capitalize).join(' ')
end