//=======================Global Functions=================================
//Global Variables

var medsTable = $("#myMeds");

//Uploads information to CLoudinary
var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alrod909/upload";
var CLOUDINARY_UPLOAD_PRESET = 'dov1tdtx';

var imgPreview;
var fileUpload;

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
    var listItemData = $(this).attr("id");

    //Id number
    listItemData = listItemData.replace("edit", "");

    console.log(listItemData);

    //Shows the specific buttpn on that table row
    $("#save-change" + listItemData).show();
    $(".userMed" + listItemData).prop('disabled', false);
    $("#med_desc" + listItemData).prop('disabled', false);
    $("#edit-image" + listItemData).show();

}

//Deletes medications
function deleteMeds() {

    // Function for handling what happens when the delete button is pressed
    //Gets the id of THIS specific button
    var listItemData = $(this).attr("id");

    //Id number
    listItemData = listItemData.replace("deleteMed", "");

    console.log(listItemData);

    //AJAX/Post method that delete the specific id number
    $.ajax({
        method: "DELETE",
        url: "/api/meds/" + listItemData
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


        // AJAX post that adds new medications to the database
        $.post("/api/meds", newMed, function (data) {

            console.log("Success");

            console.log(data);

        }).done(getMeds);

        clearContent();

    }

    else {

        $('#fill-out').modal('open');
    }

    console.log(newMed);



    return false;

}

// Update a given post, bring user to the blog page when done
function updateMeds() {

    // Function for handling what happens when the delete button is pressed
    var listItemData = $(this).attr("id");

    console.log(listItemData);

    listItemData = listItemData.replace("save-change", "");

    // If all required fields are filled
    if (validateForm() === true) {
        // Create an object for the user's data
        var updatedMeds = {
            medName: $("#med_name" + listItemData).val(),
            drugClass: $("#drug_class" + listItemData).val(),
            medDesc: $("#med_desc" + listItemData).val(),
            dosage: $("#dosage" + listItemData).val(),
            frequency: $("#frequency" + listItemData).val(),
            quantity: $("#quantity" + listItemData).val(),
            img: $("#imgAdd" + listItemData).attr("src"),
            doctor: $("#doctor" + listItemData).val(),
            drNumber: $("#doctor_number" + listItemData).val()
        };

    }

    else
    {
        //Pop up modals that tells user to finish the fields
        $('#fill-out').modal('open');
    }

    console.log(updatedMeds);

    $("#save-change" + listItemData).hide();
    $(".userMed" + listItemData).prop('disabled', true);
    $("#edit-image" + listItemData).hide();


    $.ajax({
        method: "PUT",
        url: "/api/meds/" + listItemData,
        data: updatedMeds
    }).done(getMeds).catch(function (error) {

        console.log(error);

    })

}

function uploadPic() {

    // Gets the id of the specific upload button
    imgPreview = $(this).attr("id");

    var id = imgPreview.replace("edit-image", "");

    //Changes it to the to the image screen to store the image
    imgPreview = "imgAdd" + id;

    console.log(imgPreview);

    //Gets the whole tag based on the id
    imgPreview = document.getElementById(imgPreview);

    console.log(imgPreview);

    //
    fileUpload = "file-upload-addMedications" + id;

    console.log(fileUpload);

    //
    fileUpload = document.getElementById(fileUpload);

    console.log(fileUpload);

    //Waits until there is a chnage in the image and uploads it to the cloudinary
    $(document).on("change", fileUpload, uploadMedsCloudinary);
}

//Uploads the info/pic to the cloudinary api
function uploadMedsCloudinary(event) {

    event.preventDefault();

    //Gets the file that was appended to the site
    var file = event.target.files[0];
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

        imgPreview.src = res.data.secure_url;

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
    /* adds the materialize onclick to each med row
    --ALF, COMMENT YOUR FLIPPIN CODE! 
    Sincerly.
    Rob
    */
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
        "<input disabled value=\"" + medsData.name + "\" id=\"med_name" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\"for=\"med_name" + medsData.id + "\">Medication</label>" + "</div>" + "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.drugClass + "\" id=\"drug_class" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\"for=\"drug_class" + medsData.id + "\">Drug Class</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" +
            "<div class=\"input-field col s12\"><input disabled=\"\" value=\"" + medsData.description + "\" id=\"med_desc" + medsData.id + "\" " +
        "type=\"text\" class= \"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\" for=\"med_desc" + medsData.id + "\">Description</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" + "<div class=\"input-field col s12\">" +
        "<input disabled=\"\" value=\"" + medsData.frequency  + "\" id=\"frequency" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\" for=\"frequency" + medsData.id + "\">Frequency Taken</label>" + "</div>" + "</div> " + "<br>" +
        "<div class=\"row\">" + "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.dosage + "\" id=\"dosage" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\"for=\"dosage" + medsData.id + "\">Dosage</label>" + "</div>" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.quantity + "\" id=\"quantity" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\"for=\"quantity" + medsData.id + "\">Quantity Left</label>" + "</div>" + "</div>" + "<br>" +
        "<div class=\"row\">" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.doctor_Name + "\" id=\"doctor" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
        "<label class=\"active\"for=\"doctor" + medsData.id + "\">Prescribing Doctor</label>" + "</div>" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.phoneNumber + "\" id=\"doctor_number" + medsData.id + "\"" + "type=\"text\" class=\"userMed" + medsData.id + " validate\">" +
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
