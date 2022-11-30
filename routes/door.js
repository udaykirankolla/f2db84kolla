var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Door', { title: 'Search Results for Door Class' });
});
var express = require('express');
const door_controlers= require('../controllers/door');
var router = express.Router();
// A little function to check if we have an authorized user and continue on 
//or
// redirect to login. 
const secured = (req, res, next) => { 
  if (req.user){ 
    return next(); 
  } 
  req.session.returnTo = req.originalUrl; 
  res.redirect("/login"); 
}
/* GET doors */
router.get('/', door_controlers.door_view_all_Page );
/* GET detail door page */
router.get('/detail', door_controlers.door_view_one_Page);
/* GET create door page */
router.get('/create', door_controlers.door_create_Page);
/* GET create update page */
router.get('/update',secured,door_controlers.door_update_Page);
router.get('/delete',secured, door_controlers.door_delete_Page);
/* GET create update page */ 
router.get('/update',secured, door_controlers.door_update_Page);

module.exports = router;