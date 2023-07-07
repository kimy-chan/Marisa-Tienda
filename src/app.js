const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routerAuth=require("./router/auth.router")
const routerUser = require("./router/user.router")
const cookieParser= require("cookie-parser")
const getConecction = require("../src/model/db");
const routerProduct= require("./router/product.router")
require("dotenv").config();

class Server{

    constructor(port){
       this.app = express();
       this.port= port; 
       this.middleware();
       this.settings();
       this.router() ;   
    }
    middleware(){
        this.app.use(morgan('dev'));
        this.app.use(cookieParser())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.json())

    }

    settings(){
        this.app.set('view engine', 'ejs');
        this.app.set('views',path.join(__dirname,'views'));

    }

    router(){
       this.app.use(routerAuth)
       this.app.use(routerUser)
       this.app.use(routerProduct)
    }
    
    start(){
        this.app.listen(this.port,async ()=>{
           await getConecction();
            console.log(`server on port ${this.port}`);
        })
        

    }


}

module.exports= Server;