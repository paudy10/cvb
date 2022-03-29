const Router = require("express").Router();

Router.get("/",(req,res)=>{
    res.send("bot is run...")
})

module.exports = Router;