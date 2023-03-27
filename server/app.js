var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config({ path: "/etc/secrets/.env" });
// dotenv.config(); // for dev
var { allowOrigin } = require("./config");
console.log("allowOrigin", allowOrigin);

var indexRouter = require("./routes/index");

var app = express();

var corsOptions = {
  origin: allowOrigin,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/api", indexRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("no home");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
