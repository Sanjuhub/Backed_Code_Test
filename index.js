const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;
const app = express();

//MongoDb connection
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API server is up and running...");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT);
