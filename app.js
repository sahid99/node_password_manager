const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv');
const app = express();
const authRoutes = require("./routes/auth");
const passwordManager = require("./routes/password_manager");
const document = require("./routes/document");
const account = require("./routes/account");
const news = require("./routes/news");

//settings
dotenv.config({ path: './.env' });
app.set("port", process.env.PORT || 8022);

// middlewares 
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routes
app.use(require("./routes/index"));
app.use("/auth", authRoutes);
app.use("/password", passwordManager);
app.use("/document", document);
app.use("/cuentas", account);
app.use("/news", news);

// Empezando el servidor
app.listen(app.get("port"), () => {
    console.log(`Server at http://localhost:${app.get("port")}`);
}); 

module.exports = app;