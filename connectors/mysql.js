const mysql = require('mysql2')

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
}

const pool = mysql.createPool(config)

const mysqlexport = {
  getConnection(callback) {
    pool.getConnection((err, conn) => {
      if (err != null) {
        console.log(`[ERROR] Failed to getConnection from mySQL READ REPLICA - ${err}`, true)
        if (conn != null) {
          conn.release()
        }
        if (callback != null) {
          if (process.env.LOG_MYSQL_LATENCY) console.timeEnd('mysql_latency')
          callback('DB error')
        }
      } else {
        callback(err, conn)
      }
    })
  },

  query(query, params, callback) {
    if (process.env.LOG_MYSQL_LATENCY) console.time('mysql_latency')
    pool.getConnection((err, conn) => {
      if (err != null) {
        console.log(`[ERROR] Failed to getConnection from mySQL - ${err}`)
        if (conn != null) {
          conn.release()
        }
        if (callback != null) {
          if (process.env.LOG_MYSQL_LATENCY) console.timeEnd('mysql_latency')
          return callback('DB error')
        }
      }
      conn.query(query, params, (_err, rows) => {
        if (process.env.LOG_MYSQL_LATENCY) console.timeEnd('mysql_latency')
        if (_err != null) {
          console.log(_err)
        }
        conn.release()
        if (callback != null) {
          return callback(_err, rows)
        }
      })
    })
  },

  end(callback) {
    pool.end(callback)
  },
}

module.exports = mysqlexport
