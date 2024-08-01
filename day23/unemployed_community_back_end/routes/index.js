const express = require('express');
const router = express.Router();

const page = require('./page.js');
const community = require('./community.js')

router.use('/', page);
router.use('/community', community);

module.exports = router;