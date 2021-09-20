const express = require("express");
const app = express();
const todoRoute = require('./routes/todoRoute')
// const userRoute = require('./routes/userRoute')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/todos", todoRoute)
// app.use("/users", userRoute)

// app.get("/", async (req, res) => {
//   res.redirect('/todos')
// });

app.use((err,req,res,next) => {
  console.log(err)
})

app.listen(8080, () => console.log("Server on 8080..."));

