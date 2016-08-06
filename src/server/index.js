const path = require('path')

//-----------
// Spawn webpack as a separate process ( prevents pointless garbage collection in the same process )
//-----------
let webpackconfig = path.join(__dirname, '../../config/webpack.config.'+((process.env.NODE_ENV === 'production') ? 'prod' : 'dev'))
require('child_process').spawn('node',[webpackconfig], { stdio: 'inherit' })

//-----------
// Setup and launch server
//-----------
require('./server.js')