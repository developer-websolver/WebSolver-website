
// document.addEventListener("DOMContentLoaded", function () {

//     // Initialize EmailJS
//     emailjs.init({
//         publicKey: "f3cSrJWGi8fob_EaP"
//     });

//     const form = document.getElementById("contact-form");
//     const message = document.getElementById("form-message");
//     const submitButton = document.getElementById("submit-btn");

//     // Check required elements
//     if (!form) {
//         console.error("Contact form not found");
//         return;
//     }

//     if (!message) {
//         console.error("form-message element not found");
//         return;
//     }

//     if (!submitButton) {
//         console.error("submit-btn element not found");
//         return;
//     }

//     // Submit form
//     form.addEventListener("submit", function (event) {

//         // IMPORTANT: Prevent PHP/browser form submission
//         event.preventDefault();

//         // Hide previous message
//         message.textContent = "";
//         message.style.display = "none";

//         // Disable button
//         submitButton.disabled = true;

//         const buttonText = submitButton.querySelector("span");

//         if (buttonText) {
//             buttonText.textContent = "Sending...";
//         }

//         // Send through EmailJS
//         emailjs.sendForm(
//             "service_yu0j2dl",
//             "template_rivio8l",
//             form
//         )

//         .then(function (response) {

//             console.log("SUCCESS:", response);

//             // Success message
//             message.textContent = "Message sent successfully!";
//             message.style.color = "green";
//             message.style.display = "block";

//             // Clear form
//             form.reset();

//             // Enable button
//             submitButton.disabled = false;

//             if (buttonText) {
//                 buttonText.textContent = "Send Message";
//             }

//         })

//         .catch(function (error) {

//             console.error("EMAILJS ERROR:", error);

//             // Error message
//             message.textContent =
//                 "Unable to send message. Please try again.";

//             message.style.color = "red";
//             message.style.display = "block";

//             // Enable button
//             submitButton.disabled = false;

//             if (buttonText) {
//                 buttonText.textContent = "Send Message";
//             }

//         });

//     });

// });


document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init({
        publicKey: "f3cSrJWGi8fob_EaP"
    });

    const form = document.getElementById("contact-form");
    const message = document.getElementById("form-message");
    const submitButton = document.getElementById("submit-btn");
    const recaptchaToken = document.getElementById("recaptcha_token");

    if (!form || !message || !submitButton || !recaptchaToken) {
        console.error("Required contact form elements not found");
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        message.textContent = "";
        message.style.display = "none";

        submitButton.disabled = true;

        const buttonText = submitButton.querySelector("span");

        if (buttonText) {
            buttonText.textContent = "Sending...";
        }

        // Generate reCAPTCHA v3 token
        grecaptcha.ready(function () {

            grecaptcha.execute("6Lc_leEtAAAAAPp2irhQ0r5-8pye4J7oN6Ys6-bk", {
                action: "contact_form"
            })
            .then(function (token) {

                // Put token into hidden input
                recaptchaToken.value = token;

                // Send token to our PHP verification file
                return fetch("verify-recaptcha.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "token=" + encodeURIComponent(token)
                });

            })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {

                // Stop if reCAPTCHA failed
                if (!result.success) {
                    throw new Error(
                        result.message || "reCAPTCHA verification failed"
                    );
                }

                // reCAPTCHA passed
                return emailjs.sendForm(
                    "service_yu0j2dl",
                    "template_rivio8l",
                    form
                );

            })
            .then(function (response) {

                console.log("SUCCESS:", response);

                message.textContent = "Message sent successfully!";
                message.style.color = "green";
                message.style.display = "block";

                form.reset();

                submitButton.disabled = false;

                if (buttonText) {
                    buttonText.textContent = "Send Message";
                }

            })
            .catch(function (error) {

                console.error("ERROR:", error);

                message.textContent =
                    "Unable to send message. Please try again.";

                message.style.color = "red";
                message.style.display = "block";

                submitButton.disabled = false;

                if (buttonText) {
                    buttonText.textContent = "Send Message";
                }

            });

        });

    });

});