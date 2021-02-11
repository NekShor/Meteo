const express = require("express"); 
const app = express()
const ejs = require("ejs");
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
//...
app.use(busboy()); 

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({host: 'localhost', user:'api', password: 'raspberry', database:'ATMOS'});




// conn.query("SELECT * FROM DATAS", (err, rows) => {

//     console.log(rows); //[ {val: 1}, meta: ... ]

// });





app.use(express.static('public'));



// res.render('index.ejs', {mess : files, vid: video, hum: humour, messs : emote, error: ''})


app.get('/', function (req, res) {

    console.log("requette")

    res.redirect("index.ejs")

})

app.get('/index.ejs', function (req, res) {

    res.render("index.ejs")

})


app.get('/index.html', function (req, res) {

    res.render("index.ejs")

})




app.get('/api.html', function (req, res) {

    // res.sendFile(__dirname + "/views/api.html")
    res.render("login.ejs", {mess : ""})

})

app.post('/api.html', function (req, res) {

    if(req.body.pwd == "Azerty1"){
        res.sendFile(__dirname + "/views/api.html")
    }else{
        res.render("login.ejs", {mess : "Mauvais mot de passe"})
    }


})









app.get('/map.html', function (req, res) {

    res.render("map.ejs")

})





app.get('/login.ejs', function (req, res) {

    res.render("login.ejs")

})


app.post('/login.ejs', function (req, res) {

    console.log("LOGIN")

})














app.post('/GetInfos', function (req, res) {

    console.log("PostInfo")
    var nbr = req.body.nombre


    conn.query("SELECT * FROM DATAS ORDER BY ID_DATAS DESC LIMIT " + `${nbr}` + "", (err, rows) => {
    
        res.send(rows)

    });


        // res.redirect("/api.html")
   

})


app.post('/ModifieData', function (req, res) {

    var identification = req.body.id
    var stamp = new Date().getTime()
    var temp = parseFloat(req.body.temperature)
    var hum = parseFloat(req.body.humidite)

    conn.query("UPDATE DATAS SET DATA_TEMPERATURE = '" + temp + "', DATA_HUMIDITE = '" + hum + "' WHERE ID_DATAS = '" + `${identification}` + "'", (err, rows) => {
        
        conn.query("SELECT * FROM DATAS ORDER BY ID_DATAS DESC LIMIT 20", (err, rows) => {
    
            console.log(rows); //[ {val: 1}, meta: ... ]
        
        });

    });

    console.log("Modify data")


    if(req.body.motdepasse == "Azerty1"){
        res.redirect("/api.html")
        console.log("API")

    }else if(req.body.motdepasse == "12345abc"){
        console.log("CAPTEUR")
        res.end()

    }else{
        res.redirect("/api.html")
        console.log("Faux motdepasse")

    }

})



app.post('/DeleteData', function (req, res) {

    var identification = req.body.id

    conn.query("DELETE FROM DATAS WHERE ID_DATAS = '" + identification + "'", (err, rows) => {
        
        console.log(rows)

    });


    if(req.body.motdepasse == "Azerty1"){
        res.redirect("/api.html")
        console.log("API")

    }else if(req.body.motdepasse == "12345abc"){
        console.log("CAPTEUR")
        res.end()
    }else{
        res.redirect("/api.html")
        console.log("Faux motdepasse")

    }

})












app.post('/capteur', function (req, res) {

   
    var temp = parseFloat(req.body.temperature)
    var hum = parseFloat(req.body.humidite)
    var stamp = new Date().getTime()

    console.log(temp + " Temperature")
    console.log(hum + " Humidité")
    console.log(stamp)

    
    


    if(req.body.motdepasse == "Azerty1" || req.body.motdepasse == "12345abc"){
        if(req.body.motdepasse == "Azerty1"){
            nom = "Interface"
    
        }else if(req.body.motdepasse == "12345abc"){
            nom = "Capteur 1"
    
        }else{
    
        }
        conn.query("INSERT INTO DATAS (DATA_DATE, DATA_TEMPERATURE, DATA_HUMIDITE, nomCapteur) VALUE (" + stamp + ", " + temp + ", " + hum + ", '" + nom + "')", (err, rows) => {
            console.log(err)
            console.log(rows); //[ {val: 1}, meta: ... ]
    
            conn.query("SELECT * FROM DATAS ORDER BY ID_DATAS DESC LIMIT 1", (err, rows) => {
    
                console.log(rows); //[ {val: 1}, meta: ... ]
            
            });
        
        });
    }


    if(req.body.motdepasse == "Azerty1"){
        res.redirect("/api.html")
        console.log("API")

    }else if(req.body.motdepasse == "12345abc"){
        console.log("CAPTEUR")

    }else{
        res.redirect("/api.html")
        console.log("Faux motdepasse")

    }

    res.end() 


    


    res.status(200)
})






app.use(express.static('views'));

app.listen(80, 
    () => console. log("server listening")
);

