var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlData = require('../controllers/documents');
var ctrlFolder = require('../controllers/folders');
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/documents', auth, ctrlData.documentsRead);
router.post('/adddoc', auth, ctrlData.documentAdd);
//router.post('/movedoc', auth, ctrlData.moveDocument);
router.get('/folders', auth, ctrlFolder.foldersRead);
router.post('/addfolder', auth, ctrlFolder.folderAdd);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
