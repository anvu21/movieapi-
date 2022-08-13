//dependencies & modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
//const authRoutes = require("./routes/authRoutes");
app.use(cookieParser()); //I hate myself
//routes
const userRoute = require("./routes/UserRoute");
const movieRoute = require("./routes/MoviesRoute");
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors({credentials: true}));
app.use("/_users", userRoute);
app.use("/movies", movieRoute);


//app.use("/", authRoutes);
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === 'production') {
  //server static conetent
  app.use(express.static(path.join(__dirname, "client/build")));
}
//connet to database
mongoose.connect(
  "mongodb+srv://cse297:RIjDW3Y6REVO8zuw@cluster0.sqbzi.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Databased Connected");
});


//app listen
let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
