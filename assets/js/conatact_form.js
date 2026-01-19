document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Basic validation
    if (!form.name.value || !form.email.value || !form.message.value) {
        alert("Please fill in all required fields.");
        return;
    }

    submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    fetch(
        "https://script.google.com/macros/s/AKfycbx-dTCmNaJQvCsZ3Gcc7smC4WXNqxUlaDm2XMDCqc7V8wiDgkuUNBIAA7glAEGimYK2ag/exec",
        {
            method: "POST",
            body: new FormData(form),
        }
    )
        .then((res) => res.text())
        .then((result) => {
            console.log("Server response:", result);

            if (result.trim() === "success") {
                alert("Thank you! Your message has been sent successfully.");
                form.reset();
            } else {
                alert("Server error:\n" + result);
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Network error. Please try again.");
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});
