const path = require('path')

// Main server/app configuration
module.exports = {
    http: {
        port: 5400,
        favicon: path.join(__dirname,'..', 'src/client/assets/favicon.ico'),
        robots: 'User-agent: *\nDisallow:',
        static: [
            {
                url:'/public', path : path.join(__dirname,'..', 'public/')
            }
        ]
    },
    webpack:{
        dev_port: 8080
    },
    db: {
        mongo: 'mongodb://localhost/test'
    }
}