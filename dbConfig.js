var config = {
	development: {
	    //url to be used in link generation
	    url: 'http://localhost',
	    //mongodb connection settings
	    database: {
	        host:   'localhost',
	        port:   '27017',
	        db:     'hrms'
	    },
	    //server details
	    server: {
	        host: '127.0.0.1',
	        port: '4200'
	    }
	},
	production: {
	    //url to be used in link generation
	    url: 'http://my.site.com',
	    //mongodb connection settings
	    database: {
	        host: '127.0.0.1',
	        port: '27017',
	        db:     'site'
	    },
	    //server details
	    server: {
	        host:   '127.0.0.1',
	        port:   '3421'
	    }
	}
};

module.exports = config;