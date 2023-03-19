# TODO:

[] Move images for pub046 (Isoperms) to this repo and fix links

## Thumbnail conversion

```ruby
desc 'Generate thumbnails for CLIR report publications'
task 'thumbnails' do
    Dir['assets/publications/reports/*.pdf'].each do |pdf|
        base = File.basename(pdf, '.pdf')
        dir = File.dirname(pdf)
        puts "Generating thumbnail for #{pdf}" unless File.exist?("#{dir}/#{base}.png")
        command = "convert -thumbnail x600 '#{pdf}[0]' '#{dir}/#{base}.png'"
        system(command) unless File.exist?("#{dir}/#{base}.png")
    end
end
```

