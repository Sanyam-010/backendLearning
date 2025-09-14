import multer from "multer";

const storage = multer.diskStorage({
  // Configure multer storage
  //using disk storage to save files to disk and not in memory
  //destination is where the file will be stored
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); //cb is a callback function
  },
  //filename is the name of the file
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
// export default upload;
