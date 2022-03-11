function show_signup()
{
    document.getElementsByClassName("login_form")[0].style.display="none";
    document.getElementsByClassName("signup_form")[0].style.display="block";
    // return false;
}

function show_login()
{
    document.getElementsByClassName("signup_form")[0].style.display="none";
    document.getElementsByClassName("login_form")[0].style.display="block";
    // return false;
}