const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const PORT = 5000;

const imageDB = [];

app.use(express.static("public"));
app.use(express.static("uploads"));

app.post("/image", upload.single("avatar"), function (req, res, next) {
  fs.rename(
    `uploads/${req.file.filename}`,
    `uploads/${req.body.fullname}`,
    (err) => {
      if (err) {
        throw err;
      } else {
        imageDB.push(req.body.fullname);
        res.send(`<img src='/${req.body.fullname}'></img>`);
      }
    }
  );
});

app.get("/image", (req, res) => {
  let html = "";
  imageDB.forEach((image) => {
    html += `<img width="50%" src='/${image}'></img>`;
  });
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
