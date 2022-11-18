var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Door', { title: 'Search Results for Door Class' });
});
var express = require('express');
const door_controlers= require('../controllers/door');
var router = express.Router();
/* GET doors */
router.get('/', door_controlers.door_view_all_Page );
/* GET detail door page */
router.get('/detail', door_controlers.door_view_one_Page);
/* GET create door page */
router.get('/create', door_controlers.door_create_Page);
/* GET create update page */
router.get('/update',door_controlers.door_update_Page);
router.get('/delete', door_controlers.door_delete_Page);
module.exports = router;

module.exports = router;