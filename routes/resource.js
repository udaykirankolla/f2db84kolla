var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var door_controller = require('../controllers/door');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// DOOR ROUTES ///
// POST request for creating a Door.
router.post('/door', door_controller.door_create_post);
// DELETE request to delete Door.
router.delete('/door/:id', door_controller.door_delete);
// PUT request to update Door.
router.put('/door/:id', door_controller.door_update_put);
// GET request for one Door.
router.get('/door/:id', door_controller.door_detail);
// GET request for list of all Door items.
router.get('/door', door_controller.door_list);
module.exports = router;