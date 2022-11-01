const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 4012;
// Load config
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();

// passport config
require("./config/passport")(passport);

// shows all http requests in console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlebars
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // cookie: { secure: true },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))
  .use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `Server running in ${process.env.NODE_ENV} and listening on ${PORT}`
  );
});
