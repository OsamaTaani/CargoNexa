// firebase middelware 
const admin = require('firebase-admin');

const serviceAccount = require('./firebase/cargonexa-8040f-firebase-adminsdk-epafa-353eb6fd1a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://cargonexa-8040f.appspot.com',
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = {
    bucket,
    uploadFileToFirebase: (file, fileName) => {
        return new Promise((resolve, reject) => {
            const fileUpload = bucket.file(fileName);
            const blobStream = fileUpload.createWriteStream();

            blobStream.on("finish", () => {
                const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
                    }/o/${encodeURIComponent(fileUpload.name)}?alt=media`;
                resolve(fileUrl);
            });

            blobStream.on("error", (error) => {
                reject(error);
            });

            blobStream.end(file.buffer);
        });
    },
};
