const { request, response } = require('express');
const { uploadFile } = require('../helpers/uploads-files');

const uploadFiles = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: 'No files were uploaded.' });
  }

  try {
    const uploadedFile = await uploadFile(req.files);
    res.status(200).json({ uploadedFile });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateImg = async (req = request, res = response) => {
  const { collection, id } = req.params;
  res.json({ collection, id });
};

module.exports = {
  uploadFiles,
  updateImg,
};
