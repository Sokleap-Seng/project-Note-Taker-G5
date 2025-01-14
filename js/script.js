    // Function to show an image by index
    function showImage(index) {
        const images = document.querySelectorAll('.main-point img');
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active'); // Add active class to the selected image
            } else {
                img.classList.remove('active'); // Remove active class from others
            }
        });
        currentIndex = index; // Update the current index for manual interaction
    }
    // Automatically change images every 3 seconds
    let currentIndex = 0; // Starting index
    const images = document.querySelectorAll('.main-point img');
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Cycle through images
        showImage(currentIndex);
    }, 3000);
    // Initialize the first image as active
    showImage(0);
  