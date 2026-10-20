const mysql = require("mysql")
const jwet = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { query } = require("express")


const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })

exports.login = (req, res) => {

    console.log(req.body)
    let account = req.body.account
    let password = req.body.password
    db.query(`SELECT * FROM ap_list`,[account,password], function(error, result) {
        if(error){
            console.log(error)
        }

        if(account || password){
            for(i = 0; i < result.length; i++){
                if(account === result[i].account && password === result[i].password){ 
                    return res.render('home.ejs', {
                    })
                }
            }
            return res.render('login.hbs', {
                message: 'Incorrect password or account'
            })
        }
    })
}



exports.register = (req, res) => {
    console.log(req.body)
    const {account, password} = req.body

    db.query('SELECT account FROM ap_list WHERE account = ?', [account], async (error, result) => {
        if(error){
            console.log(error)
        }

        if(result.length > 0){
            return res.render('register.hbs', {
                message: 'The account has been used'
            })
        }
        db.query('INSERT INTO ap_list SET ?', {account: account, password: password}, (error, result) => {
            if(error){
                console.log(error)
            }else{
                console.log(result)
                return res.render('login.hbs', {
                message: 'User registered'
            })
            }
        })
    })
}


exports.history = (req, res) => {
    console.log(req.body)
    const {tipinput} = req.body

    db.query('INSERT INTO history SET ?', {tipinput: tipinput}, (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result)
            return res.render('map.hbs')
        }
    })
}

exports.favourite = (req, res) => {
    console.log(req.body)
    const {tipinput} = req.body

    db.query('INSERT INTO favourite SET ?', {tipinput: tipinput}, (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result)
            return res.render('Recommendation.ejs')
        }
    })
}

exports.edit_sample_data = (request, response) => {
    var idd = request.params.first_name;
	var idd = request.body.first_name;
	var last_name = request.body.last_name;
	var query = `UPDATE history SET tipinput = "${last_name}" WHERE idd = "${idd}"`;

	db.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Edited');
			response.redirect('/sample_data');
		}
	});
}

exports.add_sample_data = (request, response) => {
	var last_name = request.body.last_name;

	var query = `INSERT INTO history (tipinput) VALUES ("${last_name}")`;

	db.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			request.flash('success', 'Sample Data Inserted');
			response.redirect("/sample_data");
		}

	});
}

exports.edit_sample_data_cal = (request, response) => {
    var idd = request.params.first_name;

	var idd = request.body.first_name;

	var last_name = request.body.last_name;


	// var age = request.body.age;

	// var gender = request.body.gender;

	var query = `UPDATE history SET tipinput = "${last_name}" WHERE idd = "${idd}"`;

	db.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Edited');
			response.redirect('/Favourite');
		}

	});
}

exports.add_sample_data_cal = (request, response) => {
    // var idd = request.body.idd;

	var last_name = request.body.last_name;

	// var age = request.body.age;

	// var gender = request.body.gender;

	var query = `INSERT INTO favourite (tipinput) VALUES ("${last_name}")`;

	db.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			request.flash('success', 'Sample Data Inserted');
			response.redirect("/Favourite");
		}

	});
}

exports.travellinghistory = (req, res) => {
    console.log(req.body)
    const {tipinput,tepinput,topinput,twpinput,choice} = req.body

    db.query('INSERT INTO travellinghistory SET ?', {tipinput: tipinput, tepinput:tepinput, topinput:topinput, twpinput:twpinput, choice:choice}, (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result)
            return res.render('Bybus.ejs')
        }
    })
}

exports.travellinghistorycal = (req, res) => {
    console.log(req.body)
    const {tipinput,tepinput,topinput,twpinput,choice} = req.body

    db.query('INSERT INTO travellinghistory SET ?', {tipinput: tipinput, tepinput:tepinput, topinput:topinput, twpinput:twpinput, choice:choice}, (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result)
            return res.render('Bybus(cal).ejs')
        }
    })
}

exports.travellinghistorycar = (req, res) => {
    console.log(req.body)
    const {tipinput,tepinput,topinput,twpinput,choice} = req.body

    db.query('INSERT INTO travellinghistory SET ?', {tipinput: tipinput, tepinput:tepinput, topinput:topinput, twpinput:twpinput, choice:choice}, (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result)
            return res.render('Bycar.ejs')
        }
    })
}

exports.travellinghistorycarcal = (req, res) => {
    console.log(req.body)
    const {tipinput,tepinput,topinput,twpinput,choice} = req.body

    db.query('INSERT INTO travellinghistory SET ?', {tipinput: tipinput, tepinput:tepinput, topinput:topinput, twpinput:twpinput, choice:choice}, (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result)
            return res.render('Bycar(cal).ejs')
        }
    })
}