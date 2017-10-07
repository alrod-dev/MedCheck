var cloudinary = function () {


    var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alrod909/upload";
    var CLOUDINARY_UPLOAD_PRESET = 'dov1tdtx';

    var imgPreview = document.getElementById('img-preview');
    var fileUpload = document.getElementById('file-upload');

    fileUpload.addEventListener('change', function (event) {

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

};

// Export routes for server.js to use.
module.exports = cloudinary;