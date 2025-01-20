// field-support
document.getElementById("s1-14").addEventListener("change", function() {
    const supportText = document.getElementById("support-text");
    const supportDetails = document.getElementById("support-details");

    if (this.checked) {
        supportText.style.display = "none";
        supportDetails.style.display = "block";
    } else {
        supportText.style.display = "block";
        supportDetails.style.display = "none";
    }
});

// field-mobile
document.getElementById("s1").addEventListener("change", function() {
    const supportText = document.getElementById("field");
    const supportDetails = document.getElementById("mobile");

    if (this.checked) {
        supportText.style.display = "none";
        supportDetails.style.display = "block";
    } else {
        supportText.style.display = "block";
        supportDetails.style.display = "none";
    }
});

// sub-field-activity
document.getElementById("act").addEventListener("change", function() {
    const supportText = document.getElementById("activities");
    const supportDetails = document.getElementById("activity");

    if (this.checked) {
        supportText.style.display = "none";
        supportDetails.style.display = "block";
    } else {
        supportText.style.display = "block";
        supportDetails.style.display = "none";
    }
});

// sub-field-always
document.getElementById("always").addEventListener("change", function() {
    const supportText = document.getElementById("sub-always");
    const supportDetails = document.getElementById("field-always");

    if (this.checked) {
        supportText.style.display = "none";
        supportDetails.style.display = "block";
    } else {
        supportText.style.display = "block";
        supportDetails.style.display = "none";
    }
});

// sub-field-page
document.getElementById("page").addEventListener("change", function() {
    const supportText = document.getElementById("sub-update");
    const supportDetails = document.getElementById("field-page");

    if (this.checked) {
        supportText.style.display = "none";
        supportDetails.style.display = "block";
    } else {
        supportText.style.display = "block";
        supportDetails.style.display = "none";
    }
});

// sub-field-workspace
document.getElementById("space").addEventListener("change", function() {
    const supportText = document.getElementById("sub-workspace");
    const supportDetails = document.getElementById("field-space");

    if (this.checked) {
        supportText.style.display = "none";
        supportDetails.style.display = "block";
    } else {
        supportText.style.display = "block";
        supportDetails.style.display = "none";
    }
});



