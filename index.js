const Server = require("./src/app");


async function init(){   
const app = new Server(process.env.PORT); 
 await app.start();

}

init()