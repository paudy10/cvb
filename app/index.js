const mongoose = require("mongoose");
const { startBot } = require("./bot");
const express = require("express");
const Product = require("./model/product")
const Category = require("./model/category")
const Meme = require("./model/meme")
const twl = require("./model/telegrafWatchList")
const mwl = require("./model/myWatchList")
const routes = require("./routes")

class Application {
    constructor() {
        this.configApp();
        this.setupMongo();
        this.setupServer();
        // this.insert();
        startBot();
    }
    async insert(){
        const product = new Category({
            title : "اشتراک VIP | 💎"
        })
        await product.save()
    }

    setupServer(){
        const app = express();
        app.listen(process.env.PORT || 5000, ()=>{
            console.log("app listen to port 3000")
        })
        app.use(routes)
        app.set("view engine","ejs")
    }
    setupMongo(){
        mongoose.connect("mongodb+srv://Jvdpd:jvdpd1021@cluster.fh4ra.mongodb.net/cvbot").then(() =>{
            console.log("db connect");
        }).catch(err =>{
            console.log(err);
        })
    }
    
    configApp() {
        require("dotenv").config();

    }
}

module.exports = Application;
