function signup_call(event) {

    //as the buttons in the form have the default functionality of submitting the form so we have to remove this 
    event.preventDefault();

    document.body.classList.add('fade-out');

    // waiting for the transition to complete
    setTimeout(() => {
        window.location.href = "signup.html";// switching to signup page
    }, 800);

}

// forgot page transition 
function forgot_call(event) {
    event.preventDefault();

    document.body.classList.add('fade-out');

    //waiting for transition
    setTimeout(() => {
        window.location.href = "forgot.html";// switching to forgot
    }, 800);
}

//signup page functionality
function handleSignup() {

    const form = document.getElementById("signup_form");
    const errorBox = document.getElementById("error_msg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        //  Fetch inputs
        let fullName = document.getElementById("full_name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let age = document.getElementById("age").value.trim();
        let backupEmail = document.getElementById("backup_email").value.trim();

        //--------------Validation Checks-------------

        // Full Name
        if (fullName.length < 3) {
            errorBox.textContent = "Full name must be at least 3 characters.";
            return;
        }

        // Email format
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorBox.textContent = "Invalid email format.";
            return;
        }

        // Password strength
        if (password.length < 6) {
            errorBox.textContent = "Password must be at least 6 characters.";
            return;
        }

        // Age range
        if (age < 10 || age > 100) {
            errorBox.textContent = "Age must be between 10 and 100.";
            return;
        }

        // Backup email validation
        if (!emailRegex.test(backupEmail)) {
            errorBox.textContent = "Backup email is invalid.";
            return;
        }

        if (backupEmail === email) {
            errorBox.textContent = "Backup email cannot be same as main email.";
            return;
        }

        // ------- Prepare Data to Send -------
        let formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("age", age);
        formData.append("backupEmail", backupEmail);

        // -------Send Data to PHP -------
        let response = await fetch("backend/signup.php", {
            method: "POST",
            body: formData
        });

        // -------Handle Backend Response -------
        let result = await response.text();
        let trimmedResult = result.trim(); // Trim the result ONCE

        if (trimmedResult === "success") {
            errorBox.style.color = "green";
            errorBox.textContent = "Account created successfully!";
            setTimeout(() => {
                window.location.href = "sign_in.html";
            }, 1200);
        }
        else if (trimmedResult === "exists") {
            errorBox.textContent = "User already exists.";
        }
        else {
            // This now only catches genuine, unhandled server errors.
            errorBox.textContent = "An unexpected error occurred.";

        }
    });

}

// adding the event listener
document.addEventListener("DOMContentLoaded", () => {
    handleSignup();
});

// handling the sign_in page 
function handle_signin() {
    const form = document.getElementById("signin_form");
    const errorBox = document.getElementById("error_msg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        // ----------- Validation -----------
        if (!email || !password) {
            errorBox.textContent = "Please fill in all fields.";
            return;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorBox.textContent = "Invalid email format.";
            return;
        }

        // -------- Prepare FormData ----------
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        // --------- Send to PHP ----------
        let response = await fetch("backend/signin.php", {
            method: "POST",
            body: formData
        });

        let result = (await response.text()).trim();

        if (result === "success") {
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "main.html"; // your landing page
            }, 800);
        } else if (result === "invalid") {
            errorBox.textContent = "Invalid email or password.";
        } else {
            errorBox.textContent = "Something went wrong. Try again.";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    handle_signin();
});


//forgot page section

document.getElementById("card-email").addEventListener("submit", function(e) {
    e.preventDefault(); // stop form from reloading page

    const email = document.getElementById("email").value.trim();
    if (!email) return alert("Please enter your email");

    let formData = new FormData();
    formData.append("email", email);

    fetch("backend/forgot.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        if (data.startsWith("SUCCESS:")) {
            const tempPass = data.replace("SUCCESS:", "").trim();
            document.getElementById("generated-pass").textContent = tempPass;

            // transition cards
            document.getElementById("card-email").classList.remove("active");
            document.getElementById("display-box").classList.add("active");
        } else {
            alert(data); // show error
        }
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong. Try again.");
    });
});
