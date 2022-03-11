// // function show_health_official_homepage()
// // {
// //     document.getElementsByClassName("main")[0].style.display="block";
// //     document.getElementsByClassName("manage_user")[0].style.display="none";
// //     document.getElementsByClassName("manage_venue")[0].style.display="none";
// // }

// function show_manage_user()
// {
//     // document.getElementsByClassName("main")[0].style.display="none";
//     document.getElementsByClassName("manage_user")[0].style.display="block";
//     document.getElementsByClassName("manage_venue")[0].style.display="none";
// }

// function show_manage_venue()
// {
//     // document.getElementsByClassName("main")[0].style.display="none";
//     document.getElementsByClassName("manage_user")[0].style.display="none";
//     document.getElementsByClassName("manage_venue")[0].style.display="block";
// }


// Redirecting the "signup admin" button on homeHealth.html to signupAdmins.html

    function get_signup_admins()
    {
        window.location.replace("signupAdmins.html");
    }

// Redirecting the "Manage venue/user" button on homeHealth.html to manage.html


    function go_to_manage()
    {
        window.location.replace("manage.html");
    }

// The function is used to switch between the manage user and venues in manage.html
    function show_venue()
    {
        document.getElementsByClassName("manage_venue")[0].style.display="block";
        document.getElementsByClassName("manage_user")[0].style.display="none";
    }

// The function is used to switch between the manage user and venues in manage.html
    function show_user()
    {
        document.getElementsByClassName("manage_venue")[0].style.display="none";
        document.getElementsByClassName("manage_user")[0].style.display="block";
    }
