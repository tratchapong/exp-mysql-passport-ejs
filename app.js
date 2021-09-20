const express = require("express");
const app = express();
const todoRoute = require('./routes/todoRoute')
const userRoute = require('./routes/userRoute')
const userController = require('./controllers/userController')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/todos", todoRoute)
app.use("/users", userRoute)

app.get("/login", userController.login)
app.post("/login", userController.postLogin)
app.get("/register", userController.register)
app.post("/register", userController.postRegister)


app.get("/", async (req, res) => {
  res.render('index.ejs', {name: 'CodeCamp9'})
});

app.use((err,req,res,next) => {
  console.log('******************')
  console.log(err)
  console.log('******************')
})

app.listen(8080, () => console.log("Server on 8080..."));

