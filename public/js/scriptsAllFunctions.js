//=======================Global Functions=================================
//Global Variables

import {uploadMedsCloudinary, deleteMeds, updateMeds,
editMedsButton, addMeds, getMeds, clearContent} from './allFunctions';


//Waits until document is ready and allows the user to
//use all these specific buttons
$(document).on("click", ".deleteMed", deleteMeds);
$(document).on("click", ".editBtn", editMedsButton);
$(document).on("click", "#clear-content", clearContent);
$(document).on("click", ".uploadBtn", uploadPic);
$(document).on("click", "#add-med", addMeds);
$(document).on("click", ".save", updateMeds);


//initialize all modals
$('.modal').modal();
//or by click on trigger
$('.modal-trigger').modal();


//  nav  color
$(".nav-wrapper").css("background-color", "#19B5BA");
//     Card Color links
$(".card .card-action a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating)").css("color", "#19B5BA");

//=======================Home Page Functions================================
//    scroll function
var $root = $('html, body');

$('a[href^="#about"]').click(function () {
    $root.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
});
//=====================User Page Functions================================

//Modal Popo at beginning
$('.modal').modal();

$(window).on('load', function () {
    $('#alertModal').modal('open');
});

getMeds();