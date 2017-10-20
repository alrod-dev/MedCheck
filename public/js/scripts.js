//=======================Global Functions=================================
//Global Variables
var medsTable = $("#myMeds");

//Uploads information to CLoudinary
var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alrod909/upload";
var CLOUDINARY_UPLOAD_PRESET = 'dov1tdtx';

//Globar Variables
var imgPreview, fileUpload, medID, imgFormat;

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


// Form validation
// To validate all the info
function validateForm() {
    var isValid = true;

    $(".form-control").each(function () {
        if ($(this).val() === "")
            isValid = false;
    });

    return isValid;
}

//Hides edit button
function editMedsButton() {

    //Gets the id of THIS specific button
    medID = $(this).attr("id");

    //Id number
    medID = medID.replace("edit", "");

    //Shows the specific buttpn on that table row
    $("#save-change" + medID).show();
    $(".userMed" + medID).prop('disabled', false);
    $("#med_desc" + medID).prop('disabled', false);
    $("#edit-image" + medID).show();

}

//Deletes medications
function deleteMeds() {

    // Function for handling what happens when the delete button is pressed
    //Gets the id of THIS specific button
    medID = $(this).attr("id");

    //Id number
    medID = medID.replace("deleteMed", "");

    //AJAX/Post method that delete the specific id number
    $.ajax({
        method: "DELETE",
        url: "/api/meds/" + medID
    })
        .done(getMeds);

}

//Clears form box input field
function clearContent() {

    $("#med_name").val("");
    $("#drug_class").val("");
    $("#med_desc").val("");
    $("#dosage").val("");
    $("#frequency").val("");
    $("#quantity").val("");
    $("#doctor").val("");
    $("#doctor_number").val("");

}


//Adds a new medication
function addMeds() {

    // If all required fields are filled
    if (validateForm() === true) {
        // Create an object for the user's data
        var newMed = {
            //Grabs the value data
            medName: $("#med_name").val(),
            drugClass: $("#drug_class").val(),
            medDesc: $("#med_desc").val(),
            dosage: $("#dosage").val(),
            frequency: $("#frequency").val(),
            quantity: $("#quantity").val(),
            img: $("#imgAdd").attr("src"),
            doctor: $("#doctor").val(),
            drNumber: $("#doctor_number").val()
        };


        clearContent();
        // AJAX post the data to the friends API.
        $.post("/api/meds", newMed, function (data) {

            console.log("Success");

            console.log(data);


        });

        //Opens up modal after its added
        $('#successful-add').modal('open');


    }

    else {

        $('#fill-out').modal('open');
    }

    console.log(newMed);

    return false;

}

// Update a given post, bring user to the blog page when done
function updateMeds() {

    var updatedMeds;

    // Function for handling what happens when the delete button is pressed
    medID = $(this).attr("id");

    medID = medID.replace("save-change", "");


    // If all required fields are filled
    // Create an object for the user's data
    updatedMeds = {
        id: medID,
        medName: $("#med_name" + medID).val(),
        drugClass: $("#drug_class" + medID).val(),
        medDesc: $("#med_desc" + medID).val(),
        dosage: $("#dosage" + medID).val(),
        frequency: $("#frequency" + medID).val(),
        quantity: $("#quantity" + medID).val(),
        img: $("#imgAdd" + medID).attr("src"),
        doctor: $("#doctor" + medID).val(),
        drNumber: $("#doctor_number" + medID).val()
    };

    console.log(updatedMeds);

    $("#save-change" + medID).hide();
    $(".userMed" + medID).prop('disabled', true);
    $("#edit-image" + medID).hide();


    $.ajax({
        method: "PUT",
        url: "/api/meds",
        data: updatedMeds
    }).done(getMeds).catch(function (error) {

        console.log(error);

    })

}

//Uploads Pics to Cloudinary
function uploadPic() {

    // Gets the id of the specific upload button
    imgPreview = $(this).attr("id");

    var id = imgPreview.replace("edit-image", "");

    //Changes it to the to the image screen to store the image
    imgPreview = "imgAdd" + id;

    //Gets the whole tag based on the id
    imgPreview = document.getElementById(imgPreview);

    //
    fileUpload = "file-upload-addMedications" + id;

    //
    fileUpload = document.getElementById(fileUpload);

    //Waits until there is a chnage in the image and uploads it to the cloudinary
    $(document).on("change", fileUpload, uploadMedsCloudinary);
}

//Uploads the info/pic to the cloudinary api
function uploadMedsCloudinary(event) {

    event.preventDefault();

    //Gets the file that was appended to the site
    var file = event.target.files[0];

    console.log(file.name);

        //Checks for file format
        if(file.name.indexOf(".png"))
        {
            imgFormat = ".png";

        }

        else if(file.name.indexOf(".jpg"))
        {
            imgFormat = ".jpg";
        }

        else if(file.name.indexOf(".tif"))
        {
            imgFormat = ".tif";
        }

        else if(file.name.indexOf(".gif"))
        {
            imgFormat = ".gif";
        }

        else
        {

            alert("Invalid form of image format!")

        }

    var formData = new FormData();

    //Appends file and cloudinary upload key to the form data
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    //Post method that uploads it to cloudinary
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

        console.log("http://res.cloudinary.com/alrod909/image/upload/v1507098800/" + res.data.public_id + imgFormat);

        //Sets the image from cloudinary as the reference for the database

        imgPreview.src = "http://res.cloudinary.com/alrod909/image/upload/v1507098800/" + res.data.public_id + imgFormat;

    }).catch(function (error) {

        console.error(error);

    });

}


// A function for rendering the list of meds into the #myAdds div
function renderMeds(rows) {

    medsTable.children().not(":last").remove();

    if (rows.length) {

        medsTable.prepend(rows);
    }

    $('.collapsible').collapsible();

}


//Creates the table with all the information it needs
function addTables(medsData) {


    //Sets the id of medication as the first tag to identify later which to delete and update
    var newMeds = $("<div id=" + medsData.id + ">");

    newMeds.data("meds", medsData);

    newMeds.append("<div class='row'> <ul class=\"collapsible\" data-collapsible=\"accordion\">" + "<li>" +
        "<div class=\"collapsible-header\">" + "<ul class=\"collection\">" + "<li class=\"collection-item avatar\">" +
        "<i class=\"material-icons circle\">local_pharmacy</i>" +
        "<span class=\"title\"><h5>Medication: " + medsData.name + "</h5></span> <p>click to expand info<br>" + "</p>" + "</li>" + "</ul>" + "</div>" +
        "<div class=\"collapsible-body\">" + "<form method=\"GET\" class=\"col s12\">" + "<br>" +
        "<div class=\"row\">" + "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.name + "\" id=\"med_name" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\"for=\"med_name" + medsData.id + "\">Medication</label>" + "</div>" + "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.drugClass + "\" id=\"drug_class" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\"for=\"drug_class" + medsData.id + "\">Drug Class</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" +
        "<div class=\"input-field col s12\"><input disabled=\"\" value=\"" + medsData.description + "\" id=\"med_desc" + medsData.id + "\" " +
        "type=\"text\" class= \"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\" for=\"med_desc" + medsData.id + "\">Description</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" + "<div class=\"input-field col s12\">" +
        "<input disabled=\"\" value=\"" + medsData.frequency + "\" id=\"frequency" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\" for=\"frequency" + medsData.id + "\">Frequency Taken</label>" + "</div>" + "</div> " + "<br>" +
        "<div class=\"row\">" + "<div class=\"input-field col s6\">" +

        "<input disabled value=\"" + medsData.dosage + "\" id=\"dosage" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\"for=\"dosage" + medsData.id + "\">Dosage</label>" + "</div>" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.quantity + "\" id=\"quantity" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\"for=\"quantity" + medsData.id + "\">Quantity Left</label>" + "</div>" + "</div>" + "<br>" +
        "<div class=\"row\">" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.doctor_Name + "\" id=\"doctor" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\"for=\"doctor" + medsData.id + "\">Prescribing Doctor</label>" + "</div>" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.phoneNumber + "\" id=\"doctor_number" + medsData.id + "\"" + "type=\"text\" class=\"userMed" + medsData.id + " validate form-control\">" +
        "<label class=\"active\"for=\"doctor_number" + medsData.id + "\">Prescribing Doctor's Phone #</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" + "<div class=\"input field col s6\">" + "<div class=\"card\">" +
        "<img src=\"" + medsData.img + "\" id=\"imgAdd" + medsData.id + "\"  class=\"img-preview\"/>" +
        "<label class=\"file-upload-container\" for=\"file-upload-addMedications" + medsData.id + "\">" +
        "<input class= \"uploadButton\" id=\"file-upload-addMedications" + medsData.id + "\" type=\"file\">" +
        "<a id=\"edit-image" + medsData.id + "\" class=\"waves-effect waves-light btn uploadBtn uploadBtn2\">Select an Image</a>" + "</label>" +
        "</div>" + "</div>" + "</div>" +
        "<div class=\"row\">" +
        "<div class=\"col s2\">" +
        "<a class=\"waves-effect waves-light btn-large editBtn\" id=\"edit" + medsData.id + "\">" +
        "<i class=\"material-icons left\">create</i>Edit</a>" + "</div>" +
        "<div class=\"col s2\">" +
        "<button type=\"submit\" class=\"waves-effect waves-light btn-large save\" id=\"save-change" + medsData.id + "\">" +
        "<i class=\"material-icons left\">save</i>Save</button>" + "</div>" +
        "<div class=\"col s2\">" +
        "<a id=\"deleteMed" + medsData.id + "\" class=\"waves-effect waves-light btn-large deleteMed\">" +
        "<i class=\"material-icons left\">delete_forever</i>Del</a></div></div></form>\n" +
        "                    </div>\n" +
        "                </li>\n" +
        "            </ul>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>");


    $("#drugReminder").text(medsData.name);

    return newMeds;

}

//Get method that puts all the medication in the page
function getMeds() {

    // Here we get the location of the root page.
    // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
    var currentURL = window.location.origin;

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({url: "/api/meds", method: "GET"})
        .done(function (data) {

            var meds = [];

            // Here we are logging the URL so we have access to it for troubleshooting
            console.log("URL: " + currentURL + "/api/meds");
            console.log("------------------------------------");
            console.log(data);

            // Loop through and display each of the medications
            for (var i = 0; i < data.length; i++) {

                meds.push(addTables(data[i]));
            }

            renderMeds(meds);

        }).catch(function (error) {

        console.error(error);

    });


    setTimeout(hideButtons, 500);

    function hideButtons() {

        $(".save").hide();
        $(".uploadBtn2").hide();

    }

}

//Gets all medications and renders them into the page
getMeds();
