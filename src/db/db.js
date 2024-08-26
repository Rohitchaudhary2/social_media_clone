//this is redundant file right now

import mysql from 'mysql2';
import db from '../config/db.config.js'

const connection = mysql.createConnection(db)

connection.connect((err) => {
    if(err) {
        console.log(`error connecting: ${err}`)
        return
    }
    else {
        console.log(`Database connected successfully`)
    }
})

export default connection