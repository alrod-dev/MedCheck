//CREDENTIALS==============================\
//clientID: 231664727343-vuspvrttt5hgu9fdp1cijrfds6h8psqp.apps.googleusercontent.com
//ClientSecret: WhWV8ikjgI4G4_k_xFni_-5P

//medcheckappteamdiscovery@gmail.com
//CREDENTIALS==============================\


function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    postAJAX('/server/sign-in', {id_token: id_token})
        .then(function(user) {
            // The user is now signed in on the server too
            // and the user should now have a session cookie
            // for the whole site.
            document.location.href = 'user-page.html/'
        })


};