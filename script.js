function signup_call(event) {

    //as the buttons in the form have the default functionality of submitting the form so we have to remove this 
    event.preventDefault();

    document.body.classList.add('fade-out');

    // waiting for the transition to complete
    setTimeout(() => {
        window.location.href = "signup.html";// switching to signup page
    }, 800);

}

function forgot_call(event){
    event.preventDefault();

    document.body.classList.add('fade-out');

    //waiting for transition
     setTimeout(() => {
        window.location.href = "forgot.html";// switching to forgot
    }, 800);
}