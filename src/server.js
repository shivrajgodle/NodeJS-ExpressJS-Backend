import express from "express";


//import routes

import movieRoutes from './routes/MovieRoutes.js'

const app = express();

//Api Routes
app.use("/movies",movieRoutes);


app.get("/hello",(req,res)=>{
    res.json({message: "hello world"})
})




const PORT = 5001;

const server = app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
})



