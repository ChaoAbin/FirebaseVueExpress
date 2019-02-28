const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const express = require('express');
const admin = require('firebase-admin');
const app = express();

const serviceAccount = require(functions.config().config.path + "serviceAccountKey.json");
let appConfig = require(functions.config().config.path + "firebaseKey.json");
appConfig['credential'] = admin.credential.cert(serviceAccount);
admin.initializeApp(appConfig);

app.get('/test1', (request, response) => {
    response.send(`${Date.now()}`);
});

app.get('/test2', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
});

app.get('/testConfig', (request, response) => {
    console.log('config: ', functions.config().config.path);
    // console.log('config: ', functions.config().config.path, process.env.FIREBASE_CONFIG, process.env.RESOURCE_DIR);
    response.send(functions.config().config);
});

exports.app = functions.https.onRequest(app);
