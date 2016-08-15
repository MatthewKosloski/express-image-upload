const filenameWithExt = (filename, mimetype) => {
	const ext = `.${mimetype.substring(mimetype.search(/(?!image\/)(jpeg|jpg|png)/))}`;
	return `${filename}${ext}`;
}

module.exports = {
	filenameWithExt
}