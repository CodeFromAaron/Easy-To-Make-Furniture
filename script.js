import { turnPageWithEffect } from './pageTurn.js';  // Import the page-turning effect function
import { initPdfNavigation } from './pdfNavigation.js';  // Import the PDF navigation script

// Wait for the DOM to fully load
window.onload = function () {
    const canvas = document.getElementById('pdf-render');
    const loadingContainer = document.getElementById('loading-bar-container');

    // Path to your PDF file
    const pdfUrl = 'Easy-to-make_Furniture_A4.pdf';  // Update this to match your PDF file path
    
    // Official contents page (page 5 in the PDF, which corresponds to page 3 in the book)
    const contentsPage = 5;  // Page 5 in the PDF = Contents (Page 3 in the book)
    
    // The delay before transitioning to the contents page (in ms)
    const transitionDelay = 2000; // Increased to 2 seconds for a longer wait before transitioning
    
    // PDF.js to load the PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        console.log('PDF loaded');

        // Function to render a specific page with scale adjustment
        function renderPage(pageNumber) {
            return pdf.getPage(pageNumber).then(page => {
                const context = canvas.getContext('2d');
                
                // Get the page's viewport size
                const viewport = page.getViewport({ scale: 1 });

                // Calculate the scale to fit the height of the page with some extra room
                const scale = window.innerHeight / viewport.height * 0.8; // 80% of the page height
                const scaledViewport = page.getViewport({ scale: scale });

                // Adjust canvas size based on the scaled viewport
                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                // Render the page on the canvas
                return page.render({
                    canvasContext: context,
                    viewport: scaledViewport
                }).promise;
            });
        }

        // Start by rendering the cover page (page 1 in the PDF)
        renderPage(1).then(() => {
            // Hide loading animation and show PDF render
            loadingContainer.style.display = 'none';
            canvas.style.display = 'block';
            
            console.log('Cover page rendered');

            // Wait for 2 seconds before transitioning to the contents page
            setTimeout(() => {
                // Use page turn effect to go to the contents page (page 5)
                console.log('Transitioning to contents page');
                turnPageWithEffect(canvas, contentsPage, 0.8, pdf);  // Page 5 = Contents Page
            }, transitionDelay); // Increased delay to 2 seconds
        }).catch(error => {
            console.error('Error rendering page: ', error);
        });

        // Initialize the PDF navigation (left, right arrows, dropdown) after the PDF is loaded
        initPdfNavigation(pdf);  // Keep navigation separate but functional
    }).catch(error => {
        console.error('Error loading PDF: ', error);
        loadingContainer.innerHTML = "Failed to load PDF.";
    });
};
