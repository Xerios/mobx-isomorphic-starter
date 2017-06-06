/*

import mongoose from 'mongoose'
import config from '../../../config/server.config'

// Use bluebird
mongoose.Promise = global.Promise

// Initialize our database
mongoose.connect(config.db.mongo)

const db = mongoose.connection
db.on('error', (err) => console.error('Mongodb error:', err))
db.once('open', () => console.info('Mongodb started on port 27017'))

// Initialize our models
export default db

*/

// What the hell is this? ( for newbs )  
// --------------
// This format is made for this kind of usage : import {Test, Account, Todo} from './yourpath/database.js'
//

//export const Test = db.model('Test', require('../models/Test'))
//export const Account = db.model('Account', require('../models/Account'))
//export const Todo = db.model('Todo', require('../models/Todo'))
