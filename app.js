const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv');
const app = express();
const authRoutes = require("./routes/auth");
const passwordManager = require("./routes/password_manager");

//settings
dotenv.config({ path: './.env' });
app.set("port", process.env.PORT || 3000)

// middlewares 
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routes
app.use(require("./routes/index"));
app.use("/auth", authRoutes);
app.use("/password", passwordManager)

//db


// Empezando el servidor
app.listen(app.get("port"), () => {
    console.log(`Server at http://localhost:${app.get("port")}`);
}); 
