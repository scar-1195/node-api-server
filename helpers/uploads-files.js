const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  folder = '',
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const [ext] = file.name.split('.').reverse();

    if (!allowedExtensions.includes(ext)) {
      return reject(
        `The ${ext} extension is not allowed - ${allowedExtensions}`,
      );
    }

    const fileName = `${uuidv4()}.${ext}`;
    uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

    //* Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, err => {
      if (err) reject(err);
      resolve(fileName);
    });
  });
};

module.exports = {
  uploadFile,
};
