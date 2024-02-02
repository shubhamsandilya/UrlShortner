const express = require("express");
const app = express();
const staticRoute=require('./routes/staticRouter')
const path = require("path");
const { connectToDb } = require("./dbConnection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const PORT = 8001;
app.use(express.json());

connectToDb("mongodb://localhost:27017/url-shortner").then(() =>
  console.log("Db Connection successfull")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/url", urlRoute);

app.use('/',staticRoute)

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(redirectedURL);
});

app.listen(PORT, () => console.log("server Activated"));
