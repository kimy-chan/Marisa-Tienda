const Server = require("./src/app");

const app = new Server(process.env.PORT);
app.start();


