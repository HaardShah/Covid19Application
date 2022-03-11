//log out function
    function logOut() {

      if (confirm("Please confirm for LOGOUT!")) {
        logout();
      }

    }

//login function
    function login(){

        var logintype="user"; //type of login the user chose

        if(document.getElementById('radiovenue').checked)
            {
                logintype="venuemanager";
            }
        else if (document.getElementById('radioho').checked)
        {
            logintype="healthofficial";
        }
        let user = {
            user: document.getElementById('email').value,
            pass: document.getElementById('password').value,
            type: logintype
        };

        // Create AJAX Request
        var xmlhttp = new XMLHttpRequest();

        // Define function to run on response
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var name=JSON.parse(this.responseText);

                alert("Welcome "+name[0].given_name);

                //redirects depending on login type
                if(logintype=="user"){
                window.location.replace('/homeUser.html');
                }
                else if(name[0].isVenueManager==1 && logintype=="venuemanager")
                {
                    window.location.replace('/homeManager.html');
                }
                else if(name[0].isHealthOfficial==1 && logintype=="healthofficial")
                {
                    window.location.replace('/homeHealth.html');
                }

            } else if (this.readyState == 4 && this.status >= 400) {
                alert("Login failed");
            }
        };

        // Open connection to server & send the post data using a POST request
        // We will cover POST requests in more detail in week 8
        xmlhttp.open("POST", "/users/login", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(user));

    }

//check that a login is valid
    function checklogin()
        {

            var xmlhttp = new XMLHttpRequest();

            // Define function to run on response
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                document.getElementById("body").style.display = "block"; //show web page if login is valid

                }
                else if (this.readyState == 4 && this.status >= 400) {
                    window.location.replace('/index.html');
                    alert("Login Failed");
                }
            };

            xmlhttp.open("POST","/users/checkuser", true);
            xmlhttp.send();

        }

//logout function
    function logout()
        {

            var xmlhttp = new XMLHttpRequest();
            if (this.readyState == 4 && this.status == 200) {

                }
                else
                {
                    window.location.replace('/index.html'); //redirect when logged out
                }

            xmlhttp.open("POST", "/users/logout", true);
            xmlhttp.send();

        }

//signup for users and venue managers
    function signup()
        {

            var terms_cond = document.getElementById("terms_cond");
            if(terms_cond.checked==false) //make sure user agrees to terms and conditions
            {
                alert("Please agree to the Terms & Conditions!");
                return;
            }

            //get all information from input fields
            var first_name = document.getElementById("first_name").value;
            var last_name = document.getElementById("last_name").value;
            var dob=document.getElementById("dob").value;
            var phone_num=document.getElementById("ph").value;
            var email=document.getElementById("signup_email").value;
            var streetnum=document.getElementById("streetnum").value;
            var streetname=document.getElementById("streetname").value;
            var suburb=document.getElementById("suburb").value;
            var postcode=document.getElementById("postcode").value;
            var state=document.getElementById("state").value;
            var password=document.getElementById("signup_password").value;
            var repeat_password=document.getElementById("repeat_password").value;
            var venMan=document.getElementById("sign_up_as_vm");
            var emailNoti=document.getElementById("emailNoti");

            //check if venue manager or normal user
            if(venMan.checked==false)
            {
                venMan=0;
            }
            else
            {
                venMan=1;
            }

            //check if user/venue manager wants email notifications
            if(emailNoti.checked==false)
            {
                emailNoti=0;
            }
            else
            {
                emailNoti=1;
            }

            //check to make sure all fields are entered
            if(password=="" || first_name=="" ||last_name==""|| dob=="" ||phone_num==""|| email==""|| streetnum==""|| streetname==""|| suburb=="" || postcode==""|| state=="" )
            {

                alert("Please Enter All Fields!");
                return;
            }

            //check for passwords to be matched
            if(!(password===repeat_password))
            {
                alert("Passwords do not match");
                return;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    loginforSignup();
                }
            };
            xhttp.open("POST", "/users/signup", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ first_name,last_name,dob,phone_num,email,streetnum,streetname,suburb,postcode,state,password,venMan,emailNoti }));

        }

//signup for admins or health officials
    function signupAdmin()
        {
            var terms_cond = document.getElementById("terms_cond");
            if(terms_cond.checked==false)
            {
                alert("Please agree to the Terms & Conditions!");
                return;
            }
            //get all information from input fields
            var first_name = document.getElementById("first_name").value;
            var last_name = document.getElementById("last_name").value;
            var dob=document.getElementById("dob").value;
            var phone_num=document.getElementById("ph").value;
            var email=document.getElementById("email").value;
            var streetnum=document.getElementById("streetnum").value;
            var streetname=document.getElementById("streetname").value;
            var suburb=document.getElementById("suburb").value;
            var postcode=document.getElementById("postcode").value;
            var state=document.getElementById("state").value;
            var password=document.getElementById("signup_password").value;
            var repeat_password=document.getElementById("repeat_password").value;

            //check to make sure all fields are entered
            if(password=="" || first_name=="" ||last_name==""|| dob=="" ||phone_num==""|| email==""|| streetnum==""|| streetname==""|| suburb=="" || postcode==""|| state=="" )
            {
                alert("Please Enter All Fields!");
                return;
            }

            //make sure passwords match
            if(!(password===repeat_password))
            {
                alert("Passwords do not match");
                return;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("You have successfully signed up a new Health Offical");
                }
            };
            xhttp.open("POST", "/users/signupAdmin", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ first_name,last_name,dob,phone_num,email,streetnum,streetname,suburb,postcode,state,password }));
        }

//login functions for users that just signed up
    function loginforSignup()
    {
                //check whether logging in as a user or venue manager
                var venMan=document.getElementById("sign_up_as_vm");
                if(venMan.checked==false)
                {
                    venMan=0;
                }
                else
                {
                    venMan=1;
                }
                //user information
                let user = {
                    user: document.getElementById('signup_email').value,
                    pass: document.getElementById('signup_password').value,
                    type: venMan
                };

                // Create AJAX Request
                var xmlhttp = new XMLHttpRequest();

                // Define function to run on response
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var name=JSON.parse(this.responseText);
                        alert("Welcome "+name[0].given_name);

                        //redirects for login type
                        if(name[0].isVenueManager==1 && venMan==1)
                        {
                            addVenue();
                            window.location.replace('/homeManager.html');
                        }
                        else if(name[0].isHealthOfficial==1)
                        {
                            window.location.replace('/homeHealth.html');
                        }
                        else{
                        window.location.replace('/homeUser.html');
                        }
                    } else if (this.readyState == 4 && this.status >= 400) {
                        alert("Login failed");
                    }
                };
                xmlhttp.open("POST", "/users/login", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify(user));

    }

//add a new venue to the system
    function addVenue()
    {
                 // Create AJAX Request
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    }
                };
                xmlhttp.open("POST", "/users/addVenue", true);
                xmlhttp.send();
    }

//edit venue information
    function submitVenueInfo()
    {
                 // new venue information
                 let venueInfo = {
                         venueName: document.getElementById("vname").value,
                         contactNum: document.getElementById("vcontactnum").value,
                         capacity: document.getElementById("vcapacity").value,
                         streetnum: document.getElementById("vstreetnum").value,
                         streetname: document.getElementById("vstreetname").value,
                         suburb: document.getElementById("vsuburb").value,
                         postcode: document.getElementById("vpostcode").value,
                         state: document.getElementById("state").value };

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        //redirect user to the home manager page
                         window.location.replace('/homeManager.html');
                        alert("Your Venue Information Has Been Updated!");
                    }
                };
                xmlhttp.open("POST", "/users/updateVenue", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify(venueInfo));

    }


//show venue ID
function showVenueID(){
    var venueidDiv = document.getElementsByClassName("manager_venueid")[0];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
            {
                var venueIDRow = JSON.parse(this.responseText);
                console.log(venueIDRow);
                var venueID = venueIDRow[0].venueID;
                console.log(venueID);
                venueidDiv.innerText = `Venue ID: ${venueID}`;
            }
    };

    xhttp.open("GET", 'users/showVenueID', true);
    xhttp.send();
}


//google sign in
    function onSignIn(googleUser)
    {
                var logintype="user"; //login type
                if(document.getElementById('radiovenue').checked)
                {
                    logintype="venuemanager";
                }
                else if (document.getElementById('radioho').checked)
                {
                    logintype="healthofficial";
                }

                //store user info
                let user = {
                    token: googleUser.getAuthResponse().id_token,
                    type: logintype
                };

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200)
                    {
                        var userObject=JSON.parse(this.responseText);
                        alert("Welcome "+userObject[0].given_name);
                        //redirect depending on login in type
                        if(userObject[0].isVenueManager==1 && logintype=="venuemanager")
                        {
                            window.location.replace('/homeManager.html');
                        }
                        else if(userObject[0].isHealthOfficial==1 && logintype=="healthofficial")
                        {
                            window.location.replace('/homeHealth.html');
                        }
                        else{
                        window.location.replace('/homeUser.html');
                        }
                    } else if (this.readyState == 4 && this.status >= 400) {
                        alert("Login failed");
                    }
                };
                xmlhttp.open("POST", "/users/login", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify(user));

    }

//create a new hotspot to add to the database
    function createHotspot()
    {
                //hotspot information
                let hotspot = {
                         venueid : document.getElementById("venueid").value,
                         startDate :document.getElementById("startdate").value,
                         startTime: document.getElementById("starttime").value };

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        alert("Hotspot created");
                    }
                };
                xmlhttp.open("POST", "/users/createhotspot", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify(hotspot));
    }

//update the home screen map
    function updatemap()
    {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var map=JSON.parse(this.responseText); //stores addresses
                        var temp="";
                        var i=0;
                        for(;map[i];)
                        {
                            temp=map[i].street_number+", "+map[i].street_name+", "+map[i].suburb+", "+map[i].state+", "+map[i].postcode;
                            mapGeo(temp, i); //adds markers onto map
                            i++;
                        }
                    }

                };
                xmlhttp.open("POST", "/users/hotspots", true);
                xmlhttp.send();
            }

//checkin markers for maps
    function checkInsMap()
    {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var map=JSON.parse(this.responseText); //stores addresses
                        var temp="";
                        var i=0;
                        for(;map[i];)
                        {
                            temp=map[i].street_number+", "+map[i].street_name+", "+map[i].suburb+", "+map[i].state+", "+map[i].postcode;
                            mapGeo(temp, i); // adds markers to maps
                            i++;
                        }
                    }
                };
                xmlhttp.open("POST", "/users/userCheckins", true);
                xmlhttp.send();
    }

//function for adding markers to the maps
    function mapGeo(address, i) {

                mapboxClient.geocoding
                .forwardGeocode({
                        query: address,
                        autocomplete: false,
                        limit: 1 })
                .send()
                .then(function (response) {
                    if (response && response.body && response.body.features && response.body.features.length)
                    {
                        var feature = response.body.features[0];
                        coordinates[i] = response.body.features[0].center;
                        new mapboxgl.Marker().setLngLat(coordinates[i]).addTo(map);
                        }
                    });
    }

// check if a req.session is an admin login
    function checkAdmin()
    {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("body").style.display = "block";

                    }
                    else if (this.readyState == 4 && this.status >= 400) {
                        window.location.replace('/homeUser.html');
                        alert("You do not have admin access!");
                    }
                };

                xmlhttp.open("POST","/users/checkAdmin", true);
                xmlhttp.send();
    }

// check if a req.session is an venue manager login
    function checkVenman()
    {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("body").style.display = "block";
                    }
                    else if (this.readyState == 4 && this.status >= 400) {
                        window.location.replace('/homeUser.html');
                        alert("You do not have venue manager access!");
                    }
                };
                xmlhttp.open("POST","/users/checkVenman", true);
                xmlhttp.send();

    }

//get user info to fill into userInfo html page
    function getUserInfo()
    {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var userinfo=JSON.parse(this.responseText);
                        if(userinfo[0].date_of_birth!==null){
                        var dob=userinfo[0].date_of_birth.toString();
                        dob=dob.slice(0,-14);
                        document.getElementById("dob").value = dob;
                        }
                        if(userinfo[0].given_name!==null){
                        document.getElementById("gname").value = userinfo[0].given_name;
                        }
                        if(userinfo[0].surname!==null){
                        document.getElementById("lname").value = userinfo[0].surname;
                        }
                        if(userinfo[0].contact_number!==null){
                        document.getElementById("connumber").value = userinfo[0].contact_number;
                        }
                        if(userinfo[0].email!==null){
                        document.getElementById("email").value = userinfo[0].email;
                        }
                        if(userinfo[0].street_number!==null){
                        document.getElementById("streetnum").value = userinfo[0].street_number;
                        }
                        if(userinfo[0].street_name!==null){
                        document.getElementById("streetname").value = userinfo[0].street_name;
                        }
                        if(userinfo[0].surburb!==null){
                        document.getElementById("suburb").value = userinfo[0].surburb;
                        }
                        if(userinfo[0].state!==null){
                        document.getElementById("state").value = userinfo[0].state;
                        }
                        if(userinfo[0].postcode!==null){
                        document.getElementById("postcode").value = userinfo[0].postcode;
                        }
                        if(userinfo[0].emailNotification!==null){
                            if(userinfo[0].emailNotification==1){
                                document.getElementById("emailNoti").checked =true;
                            }
                            else
                            {
                                document.getElementById("emailNoti").checked =false;
                            }
                        }
                    }
                };
                xmlhttp.open("GET","/users/userInfo", true);
                xmlhttp.send();
    }

//get venue info to fill into userInfo html page
    function getVenueInfo()
    {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    var venueInfo=JSON.parse(this.responseText);

                    if(venueInfo[0].venue_name!==null){
                    document.getElementById("vname").value = venueInfo[0].venue_name;
                    }
                    if(venueInfo[0].capacity!==null){
                    document.getElementById("vcapacity").value = venueInfo[0].capacity;
                    }
                    if(venueInfo[0].street_number!==null){
                    document.getElementById("vstreetnum").value = venueInfo[0].street_number;
                    }
                    if(venueInfo[0].street_name!==null){
                    document.getElementById("vstreetname").value = venueInfo[0].street_name;
                    }
                    if(venueInfo[0].suburb!==null){
                    document.getElementById("vsuburb").value = venueInfo[0].suburb;
                    }
                    if(venueInfo[0].state!==null){
                    document.getElementById("state").value = venueInfo[0].state;
                    }
                    if(venueInfo[0].postcode!==null){
                    document.getElementById("vpostcode").value = venueInfo[0].postcode;
                    }
                    if(venueInfo[0].phone_number!==null){
                    document.getElementById("vcontactnum").value = venueInfo[0].phone_number;
                    }
                    }
                };
                xmlhttp.open("GET","/users/venueInfo", true);
                xmlhttp.send();

    }

//editing user information
    function editUserInfo()
    {
                var emailcheck=document.getElementById("emailNoti");
                if(emailcheck.checked==true)
                {
                    emailcheck=1;
                }
                if(emailcheck.checked==false)
                {
                    emailcheck=0;
                }
                 let userInfo = {
                         givenName : document.getElementById("gname").value,
                         surname : document.getElementById("lname").value,
                         dob :document.getElementById("dob").value,
                         contactNo: document.getElementById("connumber").value,
                         email: document.getElementById("email").value,
                         streetnum: document.getElementById("streetnum").value,
                         streetname: document.getElementById("streetname").value,
                         suburb: document.getElementById("suburb").value,
                         postcode: document.getElementById("postcode").value,
                         state: document.getElementById("state").value,
                         emailNoti: emailcheck
                    };

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    window.location.replace('/homeUser.html');
                        alert("Your Personal Information Has Been Updated!");
                    }
                };
                xmlhttp.open("POST", "/users/updateUser", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify(userInfo));

    }

//adding a user check in into the database
    function checkInUser()
    {
                var venueCheckin=document.getElementById("venueID").value;

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        alert("you have successfully checked in!");
                    }
                    else if (this.readyState == 4 && this.status >= 400) {
                            alert("Invalid VenueID");
                    }
                };
                xmlhttp.open("POST","/users/checkIN", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify({venueCheckin}));
    }

//deleting a user from the database
    function deleteUser()
    {
                if (confirm("Please confirm to delete User!"))
                {
                    confirmDeleteUser();
                }
    }

//deleting a venue from the database
    function deleteVenue()
    {
                if (confirm("Please confirm to delete Venue!"))
                {
                    confirmDeleteVenue();
                }
    }

//confirm to delete a user
    function confirmDeleteUser()
    {
                let userID =document.getElementById("search_user").value;

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        alert("User Deleted");
                        document.getElementById("search_user").value=null;
                    }
                };
                xmlhttp.open("POST", "/users/deleteUser", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify({userID}));
    }

// confirm to delete venue
    function confirmDeleteVenue()
    {
                let venueID =document.getElementById("search_venue").value;

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        alert("Venue Deleted");
                        document.getElementById("search_venue").value=null;
                    }
                };
                xmlhttp.open("POST", "/users/deleteVenue", true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify({venueID}));
    }

    function showMap(){
                document.getElementsByClassName("content-user")[0].style.display = "none";
                document.getElementsByClassName("map-container-user")[0].style.display = "block";
                document.getElementsByClassName("table-button-div")[0].style.display = "block";
                map.resize();
                checkInsMap();


    }

    function showTable(){
                document.getElementsByClassName("content-user")[0].style.display = "block";
                document.getElementsByClassName("map-container-user")[0].style.display = "none";
                document.getElementsByClassName("table-button-div")[0].style.display = "none";
    }





// ----------------Redirecting DashBoard buttons------------------

//USER HOME
// using various function to redirecting between different pages using various buttons in home user
    function goto_user_home(){
        window.location.replace('/homeUser.html');
    }

    function goto_user_history(){
        window.location.replace('/CheckHistoryUser.html');
    }

    function goto_user_profile(){
        window.location.replace('/userInfo.html');
    }

// MANAGER HOME
// using various function to redirecting between different pages using various buttons in health home
    function goto_manager_home(){
        window.location.replace('/homeManager.html');
    }

    function goto_manager_profile(){
        window.location.replace('/userInfoManager.html');
    }


    function goto_manager_history(){
        window.location.replace('/CheckHistoryVenue.html');
    }

    function goto_manager_venue_info(){
        window.location.replace('/venueInfo.html');
    }



//HEALTH HOME
// using various function to redirecting between different pages using various buttons in admin home
    function goto_health_home(){
        window.location.replace('/homeHealth.html');
    }

    function goto_health_profile(){
        window.location.replace('/userInfoAdmin.html');
    }

    function goto_health_history(){
        window.location.replace('/CheckInHO.html');
    }

    function goto_health_manage_hotspot(){
        window.location.replace('/ManageHotspot.html');
    }

    function goto_health_create_hotspot(){
        window.location.replace('/createHotspot.html');
    }

//getting emails from the database
function getEmails()
{
            var xmlhttp = new XMLHttpRequest();
             xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var emails=JSON.parse(this.responseText);
                    sendCurrentHotspots(emails);
                }
            };
            xmlhttp.open("POST", "/users/getEmail", true);
            xmlhttp.send();
}

//sending emails to users that have opted emailing
function sendCurrentHotspots(emails)
{
            var xmlhttp = new XMLHttpRequest();

             xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Alerts have been sent!");
                }
            };
            xmlhttp.open("POST", "/users/emailCurrentHotspots", true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.send(JSON.stringify({emails}));
}





