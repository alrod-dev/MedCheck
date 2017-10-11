// Author: Alfredo Rodriguez, Brooklee Wilson, Mya Nguyen
// File: JS - htmlRoutes.js
// Date: 10/10/2017

var path = require("path");

module.exports = function getSites(app){

    // Basic route that sends the user first to the AJAX Page
    //Main Page Route
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //Creating a friendList route
    app.get("/logged", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/user-page.html"));
    })


    // app.get('/', function (req, res) {
    //     res.render('index', { title: 'MedCheck | Home', css: 'public/assets/css/style.css',
    //         icon: "http://res.cloudinary.com/alrod909/image/upload/v1507336746/pillBootle_ozj0ra.png"
    //
    //         // stylesheet: ['https://fonts.googleapis.com/css?family=Ubuntu',
    //         //     'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
    //         //     'https://fonts.googleapis.com/icon?family=Material+Icons',
    //         //     'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css']
    //     });
    // });
    //
    // app.get('/logged', function (req, res) {
    //     res.render('user-page', { title: 'MedCheck | Home', css: 'public/assets/css/style.css',
    //         icon: "http://res.cloudinary.com/alrod909/image/upload/v1507336746/pillBootle_ozj0ra.png"});
    // });


};

