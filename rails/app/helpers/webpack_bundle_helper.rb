require "open-uri"

module WebpackBundleHelper
    class BundleNotFound < StandardError; end

   def javascript_bundle_tag(entry, **options)
     path = asset_bundle_path("#{entry}.js")

     options = {
       src: path,
       defer: true,
     }.merge(options)

     options.delete(:defer) if options[:async]

     javascript_include_tag "", **options
   end

   def stylesheet_bundle_tag(entry, **options)
     path = asset_bundle_path("#{entry}.css")

     options = {
       href: path,
     }.merge(options)

     stylesheet_link_tag "", **options
   end

   private

   def asset_server
     port = Rails.env === "development" ? "3000" : "3000"
     "http://#{request.host}:#{port}"
   end

   def pro_manifest
     File.read("public/packs/manifest.json")
   end

   def dev_manifest
     OpenURI.open_uri("#{asset_server}/public/packs/manifest.json").read
   end

   def asset_bundle_path(entry, **options)
       valid_file?(entry)
       asset_path("#{asset_server}/public/packs/" + manifest.fetch(entry), **options)
   end

   def manifest
     return @manifest ||= JSON.parse(pro_manifest)
   end

   def valid_file?(entry)
       return true if manifest.key?(entry)
       raise BundleNotFound, "Could not find bundle with name #{entry}"
   end
end
