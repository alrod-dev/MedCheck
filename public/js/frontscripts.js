
//=======================Global Functions=================================
//    Modal Function
   
       //initialize all modals
       $('.modal').modal();
       //or by click on trigger
       $('.modal-trigger').modal();

  


   $(window).on('load',function(){
        $('#alertModal').modal('open');
    });


    $("#save-change").hide();
    $("#edit-image").hide();


    $("#edit").on("click", function(event){
        event.preventDefault();
        $("#save-change").show();
        $(".userMed").prop('disabled', false);
        $("#edit-image").show();


        
    });

    $("#save-change").on("click", function(event){
        event.preventDefault();
        $("#save-change").hide();
        $(".userMed").prop('disabled', true);
        $("edit-image").hide();
    })

    $("#deleteMed").on("click",function(event){
        event.preventDefault();
        $("#myMeds").remove();
    });



//  nav  color
$(".nav-wrapper").css("background-color", "#19B5BA");
//     Card Color links
$ (".card .card-action a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating)").css("color","#19B5BA");

//=======================Home Page Functions================================
//    scroll function
var $root = $('html, body');

$('a[href^="#about"]').click(function () {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});
//=====================User Page Functions================================
//add medication
$("#add-med").on("click", function(event){
    event.preventDefault();

    var newMed = {
        medName: $("#med_name2").val().trim(),
        drugClass:$("#drug_class2").val().trim(),
        description:$("#med_desc2").val().trim(),
        dosage:$("#dosage2").val().trim(),
        frequency:$("#frequency2").val().trim(),
        quantity:$("#quantity2").val().trim(),
        img:$("#file-upload").val().trim(),
        doctor_Name:$("#doctor2").val().trim(),
        phoneNumber:$("#doctor_number2").val().trim(),
    };
    console.log(newMed);
});

//display images from Clodinary
var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alrod909/upload";
var CLOUDINARY_UPLOAD_PRESET = 'dov1tdtx';

var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');

$("#file-upload").on('click', function (event) {

    event.preventDefault();

    var file = event.target.files[0];
    var formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        data: formData
    }).then(function (res) {

        console.log(res);

        imgPreview.src = res.data.secure_url;


    }).catch(function (error) {

        console.error(error);

    })


});


$("#clear-content").on("click", function (event) {

    event.preventDefault();

    $("#med_name2").val("");
    $("#drug_class2").val("");
    $("#med_desc2").val("");
    $("#dosage2").val("");
    $("#frequency2").val("");
    $("#quantity2").val("");
    $("#doctor2").val("");
    $("#doctor_number2").val("");

});

//Google Sign Out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


