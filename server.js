
require('dotenv/config');
const express = require("express")
const app = express();
const router = require("./router/movie-router")
const connectDb = require("./utils/db")
const errorMiddleware=require("./middlewares/error-middleware")
const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use("/api/auth", router);
app.use(errorMiddleware)
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running at port:${process.env.PORT}`)
    })
})

