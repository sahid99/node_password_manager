const express = require("express");
const morgan = require("morgan");
// const connection = require("./db/db");
const app = express();
const authRoutes = require("./routes/auth");

//settings
app.set("port", process.env.PORT || 3000)

// middlewares 
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routes
app.use(require("./routes/index"));
app.use("/auth", authRoutes);

//db


// Empezando el servidor
app.listen(app.get("port"), () => {
    console.log(`Server at http://localhost:${app.get("port")}`);
}); 
