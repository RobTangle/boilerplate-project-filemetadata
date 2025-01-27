var express = require("express");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    // console.log(req.file);
    return res.status(200).send({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
