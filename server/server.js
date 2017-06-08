const express = require("express");

const path = require("path");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.get("/", (req, res) => {

})

app.listen(port, () => {
  console.log(`App started on ${port}`);
})
