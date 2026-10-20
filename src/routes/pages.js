const express = require("express")
const authcontroller = require("../controllers/auth.js");
const mysql = require("mysql")
const router = express.Router()

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })


router.get("/login", (req, res) => {
    res.render("login.hbs")
})
router.get("/register", (req, res) => {
    res.render("register.hbs")
})
router.get("/map", (req, res) => {
    res.render("map.hbs")
})
router.get("/", (req, res) => {
    res.render("initial.ejs")
})
router.get("/map_route", (req, res) => {
    res.render("map_route.ejs")
})
router.get("/home", (req, res) => {
    res.render("home.ejs")
})
router.get("/StudyMode", (req, res) => {
    res.render("Studymode.ejs")
})
router.get("/CausalMode", (req, res) => {
    res.render("Causalmode.ejs")
})
router.get("/Recommendation", (req, res) => {
    res.render("Recommendation.ejs")
})
router.get("/Traffic", (req, res) => {
    res.render("Traffic.ejs")
})
router.get("/Traffic_cal", (req, res) => {
    res.render("Traffic(cal).ejs")
})
router.get("/Searching", (req, res) => {
    res.render("Searching.ejs")
})
router.get("/Surroundings", (req, res) => {
    res.render("surroundings.ejs")
})
router.get("/SurroundingsCausal", (req, res) => {
    res.render("surroundings(Causal).ejs")
})
router.get("/mapc", (req, res) => {
    res.render("mapc.hbs")
})
router.get("/Bycar", (req, res) => {
    res.render("Bycar.ejs")
})
router.get("/Bycarcal", (req, res) => {
    res.render("Bycar(cal).ejs")
})
router.get("/Bybus", (req, res) => {
    res.render("Bybus.ejs")
})
router.get("/Bybuscal", (req, res) => {
    res.render("Bybus(cal).ejs")
})
router.get("/onfeet", (req, res) => {
    res.render("Onfeet.ejs")
})
router.get("/locatedip", (req, res) => {
    res.render("locatedip.ejs")
})



router.get("/sample_data", function(request, response, next){

	var query = "SELECT * FROM history";

	db.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data.ejs', {title:'History Searched', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});

router.get("/routes/pages.js/add", function(request, response, next){

	response.render("sample_data.ejs", {title:'Insert Data into MySQL', action:'add'});

});


router.get('/routes/pages.js/edit/:idd', function(request, response, next){

	var idd = request.params.idd;

	db.query(`SELECT * FROM history WHERE idd = "${idd}"`, function(error, data){

		response.render('sample_data.ejs', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});


router.get('/routes/pages.js/delete/:idd', function(request, response, next){

	var idd = request.params.idd; 

	db.query(`DELETE FROM history WHERE idd = "${idd}"`, function(error, data){

		if(error)
		{
			throw (error);
		}
		else
		{
			request.flash('success', 'Sample Data Deleted');
			response.redirect("/sample_data");
		}

	});

});
// router.get("/views/sample_data", (req, res) => {
//     res.render("sample_data.ejs")
// })
// router.get('/login',authcontroller.isLoggedIn, (req, res) => {
//     res.sendFile("home.ejs", { root: './public/' })
// });

router.get("/Favourite", function(request, response, next){

	var query = "SELECT * FROM favourite";

	db.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('Favourite.ejs', {title:'LIKED DESTINATION', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});

router.get('/routes/pages.js/delet/:idd', function(request, response, next){

	var idd = request.params.idd; 

	// var query = `DELETE FROM history WHERE idd = "${idd}"`;

	db.query(`DELETE FROM favourite WHERE idd = "${idd}"`, function(error, data){

		if(error)
		{
			throw (error);
		}
		else
		{
			request.flash('success', 'Sample Data Deleted');
			response.redirect("/Favourite");
		}

	});

});

router.get('/routes/pages.js/edi/:idd', function(request, response, next){

	var idd = request.params.idd;

	// var query = `SELECT * FROM history WHERE idd = "${idd}"`;

	db.query(`SELECT * FROM favourite WHERE idd = "${idd}"`, function(error, data){

		response.render('Favourite.ejs', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.get("/routes/pages.js/ad", function(request, response, next){

	response.render("Favourite.ejs", {title:'Insert Data into MySQL', action:'add'});

});

router.get("/travellinghistory", function(request, response, next){

	var query = "SELECT * FROM travellinghistory";

	db.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('travellinghistory.ejs', {title:'History Traveled', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});

module.exports = router