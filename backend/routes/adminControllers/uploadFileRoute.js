const express = require("express");
const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// checking file types && mimetype
function checkFileType(file, cb) {
  const fileType = /jpg|jpeg|png/; //must be of these types
  const extType = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);
  if (extType && mimeType) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    //cb(error,file Name)
  } else {
    cb("image only");
  }
}
//storage name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //destination cal from root
  },
  filename: function (req, file, cb) {
    checkFileType(file, cb);

    //cb will give file name
  },
});

const upload = multer({ storage: storage });

router.route("/").post(
  upload.single("image"), //
  asyncErrorHandler(async (req, res) => {
    res.send({
      message: "image uploaded",
      image: `/${req.file.path}`,
    });
    console.log(req.file);
  })
);
module.exports = router;
