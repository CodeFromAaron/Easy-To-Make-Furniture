// Function to simulate page-turning animation
function turnPageWithEffect(canvas, pageNumber, scale, pdf) {
    // Rotate the canvas slightly to simulate a page turn
    canvas.style.transition = 'transform 1s ease-out';
    canvas.style.transform = 'rotateY(20deg)'; // Add a slight rotation effect

    // After the rotation, render the next page
    setTimeout(() => {
        renderPageWithScale(pageNumber, scale, pdf);
        // Reset rotation after page turn effect
        setTimeout(() => {
            canvas.style.transform = 'rotateY(0deg)';
        }, 500);  // Reset rotation halfway through the transition
    }, 500);  // Wait for the rotation to finish
}

// Function to render a page with scaling adjustment
function renderPageWithScale(pageNumber, scale, pdf) {
    const canvas = document.getElementById('pdf-render');
    pdf.getPage(pageNumber).then(page => {
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        page.render({
            canvasContext: context,
            viewport: viewport
        }).promise.then(() => {
            console.log('Page rendered:', pageNumber);
        });
    });
}

// Export the turnPageWithEffect function for use in the main script
export { turnPageWithEffect };
