module Lokka
  module ElasticAdminMenu
    def self.registered(app)
      app.before do
        path = request.env['PATH_INFO']
        if /^\/admin/ =~ path
          haml :"plugin/lokka-elastic_admin_menu/views/elastic_admin_menu", :layout => false
        end
      end
    end
  end
end
