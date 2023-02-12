/* Node Imports */
var dotenv = require("dotenv");
dotenv.config();
var path = require("path");

/* Framework Imports */
var admin = require("firebase-admin");

/* Local Imports */

var firebase_creds = {
  apiKey: "AIzaSyBBx1jz701hqdbEZNe5j6CwR-bCzqNW9Rw",
  authDomain: "inspiretostudy-a40ed.firebaseapp.com",
  projectId: "inspiretostudy-a40ed",
  storageBucket: "inspiretostudy-a40ed.appspot.com",
  messagingSenderId: "1012418849639",
  appId: "1=1012418849639=web=7d6219ebd941d28b589dc2",
  measurementId: "G-B2TGTJZ436",
};

admin.initializeApp(firebase_creds);

const bucket = admin.storage().bucket();

uploadImage = async (images) => {
  var images_urls = [];
  var promises = [];

  await images.map(async (image) => {
    const filename = `${Date.now()}_${Math.random() * 10000}${path.extname(
      image.originalname
    )}`;
    var imageRef = bucket.file("images/" + filename, {
      public: true,
      metadata: {
        contentType: image.mimetype,
      },
    });
    promises.push(
      imageRef.save(image.buffer, (err) => {
        if (err) {
          console.error(`Error Uploading: ${filename} with error: ${error}`);
          return;
        }
        imageRef.makePublic();
        images_urls.push(imageRef.publicUrl());
      })
    );
  });
  await Promise.all(promises);
  return images_urls;
};

module.exports = {
  uploadImage,
};
