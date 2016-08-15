const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const helpers = require('./helpers');

const router = express.Router();

const upload = multer({ 
	dest: 'temp',
	fileFilter: (req, file, cb) => {
		if(/image\/(jpeg|jpg|png)/.test(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
});

router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
	mkdirp('temp', (err) => {if (err) console.error(err)});
});

router.post('/', upload.single('photo'), (req, res, next) => {
	const uploadedPhoto = req.file;
	const {filename, mimetype} = uploadedPhoto;
	if(uploadedPhoto) {
		fs.readFile(uploadedPhoto.path, (err, data) => {
			if(err) return next(err);
			const filenameWithExt = helpers.filenameWithExt(filename, mimetype);
			fs.writeFile(filenameWithExt, data, {encoding: 'base64'}, (err) => {
				if(err) return next(err);
				fs.rename(filenameWithExt, path.join(__dirname, `public/images/${filenameWithExt}`), (err) => {
					if(err) return next(err);
					rimraf('temp', (err) => {if (err) console.log(err)});
					res.redirect('/images/' + filenameWithExt);
				});
			});
		});
	} else {
		let err = new Error('Only .jpeg, .jpg, or .png files are supported.');
		err.status = 401;
		return next(err);
	}
});

module.exports = router;