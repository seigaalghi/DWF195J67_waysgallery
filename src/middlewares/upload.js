const multer = require('multer');
const path = require('path');

exports.fileUpload = (field1, field2) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          ' - ' +
          new Date().getFullYear() +
          '-' +
          new Date().getMonth() +
          '-' +
          new Date().getDate() +
          ' - ' +
          new Date().getHours() +
          '-' +
          new Date().getMinutes() +
          '-' +
          new Date().getSeconds() +
          '-' +
          new Date().getMilliseconds() +
          path.extname(file.originalname)
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
      req.fileValidationError = {
        message: 'Please select image files only',
      };
      return cb(new Error('Please select image files only'), false);
    }

    cb(null, true);
  };

  const fileSize = 5 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize,
    },
  }).fields([
    {
      name: field1,
    },
    {
      name: field2,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.files && !err) {
        return res.status(400).send({
          message: 'No files selected',
        });
      }
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file size exceeded (5Mb)',
          });
        }
      }
      return next();
    });
  };
};
