const express = require('express')
const app = express()
const mysql = require('mysql2/promise')

const conPromise = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: '123456789',
  database: 'ecommerce'
})

conPromise.then(conn=>{
  console.log('Connected DB successfully..')
  let resultPromise = conn.query('SELECT * from customers WHERE id=2')
  // let resultPromise = conn.query('INSERT INTO lists (title,due_date) VALUES ("Meeting","2021-05-20")')
  return resultPromise
})
.then(result => console.log(result))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  conn.query(
    'SELECT * from customers',
    (err,results,field) => {
      console.log(results[1].name)
    }
  )
  res.send({data: 'Hello'})
})

app.listen(8080, ()=> console.log('Server on 8080...'))