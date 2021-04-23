var icecream = require('../models/icecream');

// List of all icecreams
exports.icecream_list = async function (req, res) {
    try {
        theicecreams = await icecream.find();
        res.send(theicecreams);
    }
    catch (err) {
        res.send( `{"error": ${err}}`);
        res.status(500);
    }
};
// for a specific icecream.
exports.icecream_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await icecream.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle icecream create on POST.
exports.icecream_create_post = async function (req, res) {
    console.log(req.body)
    let document = new icecream();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {{Brand :"Vadilal",Flavour:"Vanilla",Flavour:7.65}
    document.Brand = req.body.Brand;
    document.Flavour = req.body.Flavour;
    document.Cost = req.body.Cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.send(err)
        res.status(500);
    }
};
// Handle icecream delete form on DELETE.
exports.icecream_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await icecream.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};


// Handle icecream update form on PUT.
exports.icecream_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await icecream.findById( req.params.id)
        // Do updates of properties
        if(req.body.Brand) toUpdate.Brand = req.body.Brand;
        if(req.body.Flavour) toUpdate.Flavour = req.body.Flavour;
        if(req.body.Cost) toUpdate.Cost = req.body.Cost;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// Handle a show all view
exports.icecream_view_all_Page = async function (req, res) {
    try {
        theicecreams = await icecream.find();
        console.log("njfndw")
        res.render('icecream', { title: 'icecream Search Results', results: theicecreams });
    }
    catch (err) {
        res.send(`{"error": ${err}}`)
        res.status(500);
    }
};
// Handle a show one view with id specified by query
exports.icecream_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await icecream.findById( req.query.id)
        res.render('icecreamdetail', 
{ title: 'icecream Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a icecream.
// No body, no in path parameter, no query.
// Does not need to be async
exports.icecream_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('icecreamcreate', { title: 'icecream Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a icecream.
// query provides the id
exports.icecream_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await icecream.findById(req.query.id)
        console.log(result)
        res.render('icecreamupdate', { title: 'icecream Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.icecream_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await icecream.findById(req.query.id)
       
        res.render('icecreamdelete', { title: 'icecream Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


