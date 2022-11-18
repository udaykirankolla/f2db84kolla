var Door = require('../models/door');
// List of all Doors
exports.door_list = async function (req, res) {
    try {
        theDoors = await Door.find();
        res.send(theDoors);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};;
// for a specific Door.
exports.door_view_all_Page = async function (req, res) {
    try {
        theDoors = await Door.find();
        res.render('door', { title: 'Door Search Results', results: theDoors });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
exports.door_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Door detail: ' + req.params.id);
};
// Handle Door create on POST.
exports.door_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Door();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"door_type":"goat", "cost":12, "size":"large"}
    document.Door_Name = req.body.Door_Name;
    document.Door_company = req.body.Door_company;
    document.Door_size = req.body.Door_size;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle Door delete form on DELETE.
exports.door_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Door delete DELETE ' + req.params.id);
};
// Handle Door update form on PUT.

// for a specific door.
exports.door_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Door.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
//Handle door update form on PUT.
exports.door_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Door.findById(req.params.id)
        // Do updates of properties
        if (req.body.Door_Name)
            toUpdate.Door_Name = req.body.Door_Name;
        if (req.body.Door_company) 
            toUpdate.Door_company = req.body.Door_company;
        if (req.body.Door_size)
            toUpdate.Door_size = req.body.Door_size;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};
// Handle door delete on DELETE.
exports.door_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Door.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
   // Handle a show one view with id specified by query
exports.door_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Door.findById( req.query.id)
    res.render('doordetail',
   { title: 'door Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle building the view for creating a door.
// No body, no in path parameter, no query.
// Does not need to be async
exports.door_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('doorcreate', { title: 'door Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle building the view for updating a door.
// query provides the id
exports.door_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Door.findById(req.query.id)
    res.render('doorupdate', { title: 'door Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
exports.door_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Door.findById(req.query.id)
    res.render('Doordelete', { title: 'Door Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };