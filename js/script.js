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
    window.addEventListener('resize', function() {
        adjustLayout();
    });
    
    function adjustLayout() {
        const navbar = document.querySelector('.navbar');
        const title = document.querySelector('.navbar .title');
        const list = document.querySelector('.navbar .list');
    
        if (window.innerWidth <= 768) {
            // Adjust navbar layout for smaller screens
            navbar.style.flexDirection = 'column';
            navbar.style.alignItems = 'flex-start';
            
            title.style.fontSize = '24px'; // Reduce the size of title
            title.style.marginRight = '0';
    
            list.style.marginTop = '10px';
            list.style.justifyContent = 'center';
        } else {
            // Reset styles for larger screens
            navbar.style.flexDirection = 'row';
            navbar.style.alignItems = 'center';
            
            title.style.fontSize = '28px';
            title.style.marginRight = '60%';
    
            list.style.marginTop = '0';
            list.style.justifyContent = 'flex-end';
        }
    }
    
    // Call the function initially to ensure the layout is correct
    adjustLayout();
    