const express = require("express");
const mongoose = require("mongoose");
const HomeRouter = require("./routers/ HomeRouter");
const path = require("path");
const app = express();

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for html form data

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// set view engine
app.set("view engine", "ejs");

// database connect

mongoose
  .connect(
    "mongodb+srv://iamaaasif:ThisIsPassPlaceHolder@cluster0.61lfx.mongodb.net/BusRoute?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connection Successfull");
  })
  .catch((err) => {
    console.log(
      "Sorry, Database Connection Failed!.  There is some error occured."
    );
    // console.log(err);
  });

app.use("/", HomeRouter);

app.listen(3000, () => {
  console.log("Server is listening at port 3000.\n Address : localhost:3000 ");
});
