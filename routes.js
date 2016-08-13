const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const upload = multer({ 
	dest: 'temp/' ,
	fileFilter: (req, file, cb) => {
		if(/image\/(jpeg|jpg|png)/.test(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
});

router.post('/', upload.single('photo'), (req, res, next) => {
	const uploadedPhoto = req.file;
	if(uploadedPhoto) {
		fs.readFile(uploadedPhoto.path, (err, data) => {
			if(err) return next(err);
			const {filename, mimetype} = uploadedPhoto;
			const ext = `.${mimetype.substring(mimetype.search(/(?!image\/)(jpeg|jpg|png)/))}`;
			var filenameWithExt = `${uploadedPhoto.filename}${ext}`;
			fs.writeFile(filenameWithExt, data, {encoding: 'base64'}, (err) => {
				if(err) return next(err);
				fs.rename(filenameWithExt, path.join(__dirname, `public/images/${filenameWithExt}`), (err) => {
					if(err) return next(err);
					res.redirect('/images/' + filenameWithExt);
				});
			});
		});
	} else {
		var err = new Error('Only .jpeg, .jpg, or .png files are supported.');
		err.status = 401;
		return next(err);
	}
});

module.exports = router;