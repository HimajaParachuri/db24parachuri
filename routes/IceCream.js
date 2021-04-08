var express = require('express');
var router = express.Router();

const icecream_controlers= require('../controllers/icecream');

/* GET home page. */
router.get('/', icecream_controlers.icecream_view_all_Page );
module.exports = router;