const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const app = express();
//Firebase Admin SDK private key
const serviceAccount = require(functions.config().config.path + "serviceAccountKey.json");
//Firebase Web SDK API key
const appConfig = require(functions.config().config.path + "firebaseKey.json");

admin.initializeApp(
	Object.assign({
		'credential': admin.credential.cert(serviceAccount)
	}, appConfig)
);

app.get('/test1', (request, response) => {
    response.send(`${Date.now()}`);
});

app.get('/test2', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
});

app.get('/testConfig', (request, response) => {
    response.send(functions.config().config);
});

exports.app = functions.https.onRequest(app);
