const {pool, exec} = require("../db/dbcon");

exports.getAllTodos = async (req, res, next) => {
  try {
    let [rows] = await pool.execute("SELECT * FROM lists");
    res.json(rows);
  } catch (error) {
    next(error)
  }
};

exports.getById = async (req,res,next) => {
  let sql = 'SELECT * FROM lists where id=?'
  let p = [req.params.id]
  let rows = await exec(sql,p)
  res.json(rows)
}

exports.createTodo = async (req, res,next) => {
  try {
    let {title, status, dueDate} = req.body
    let sql = 'INSERT INTO lists (title, status, due_date) VALUES(?,?,?)'
    let p = [title, status, dueDate]
    let rs = await exec(sql,p)
    res.status(201).json({newTodo : {
      id: rs.insertId, title, status, dueDate
    }})
  } catch (error) {
    next(error)
  }
}

exports.deleteTodo = async (req,res,next) => {
  try {
    let {id} = req.params
    let sql = 'DELETE FROM lists WHERE id = ?'
    p= [id]
    let rs = await exec(sql,p)
    console.log('affectedRows : ',rs.affectedRows)
    if(rs.affectedRows===0)
      return res.status(400).json({msg : 'Cannot delete this ID'})
    res.status(200).json({msg: 'Deleted OK..'})
  } catch (error) {
    next(err)
  }
}

exports.updateTodo = async (req,res,next) => {
  let {title, status, dueDate} = req.body
  let sql = "UPDATE lists SET title=?, status=?, due_date=? WHERE id=?"
  let p = [title, status, dueDate, req.params.id]
  let rs = await exec(sql,p)
  if(rs.affectedRows===0)
    return res.status(400).json({msg : 'Update failed'})
  res.status(200).json({updateTodo : {
    id: req.params.id, title, status, dueDate
  }})
}


