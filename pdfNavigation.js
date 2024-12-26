let currentPage = 5;  // Default to "Contents" page (5)
let totalPages = 0;    // To store total pages count
let pdfDoc = null;     // To store the loaded PDF document

// List of items with their corresponding page numbers
const contents = [
    { name: "CONTENTS", page: 5 },
    { name: "QUICK & EASY FURNITURE", page: 6 },
    { name: "STORAGE SYSTEMS", page: 9 },
    { name: "STEREO CENTER", page: 12 },
    { name: "MATCHING GROUP", page: 14 },
    { name: "COUCHES", page: 17 },
    { name: "COFFEE TABLES", page: 20 },
    { name: "CHAIRS", page: 25 },
    { name: "ADJUSTABLE FURNITURE", page: 28 },
    { name: "DESKS", page: 33 },
    { name: "DINING TABLES", page: 36 },
    { name: "BAR & WINE RACK", page: 41 },
    { name: "BEDS", page: 44 },
    { name: "BEDROOM FURNISHINGS", page: 48 },
    { name: "CHILDREN'S FURNITURE", page: 52 },
    { name: "ACTIVITY CENTERS", page: 57 },
    { name: "OUTDOOR FURNITURE", page: 60 },
    { name: "TOOLS & TECHNIQUES", page: 65 },
    { name: "INDEX", page: 80 }
];

// Function to initialize navigation after PDF is loaded
export function initPdfNavigation(pdf) {
    pdfDoc = pdf;
    totalPages = pdf.numPages;

    // Function to render the current page
    function renderCurrentPage() {
        const canvas = document.getElementById('pdf-render');
        const context = canvas.getContext('2d');
        
        // Get the current page
        pdfDoc.getPage(currentPage).then(page => {
            const viewport = page.getViewport({ scale: 1 });

            // Adjust the scale to fit the height
            const scale = window.innerHeight / viewport.height * 0.8; // 80% of the page height
            const scaledViewport = page.getViewport({ scale: scale });

            // Adjust canvas size
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;

            // Render the page
            page.render({
                canvasContext: context,
                viewport: scaledViewport
            });
        });
    }

    // Function to update the page number in the dropdown
    function updatePageDropdown() {
        const pageSelect = document.getElementById('page-select');
        pageSelect.value = currentPage - 1; // Set value to currentPage - 1 (because dropdown starts at 0)
    }

    // Left arrow click event (go to previous page)
    document.getElementById('left-arrow').addEventListener('click', function() {
        if (currentPage > 1) { // Ensure it doesn't go below page 1
            currentPage--;
            renderCurrentPage();
            updatePageDropdown(); // Update the page number in the dropdown
        }
    });

    // Right arrow click event (go to next page)
    document.getElementById('right-arrow').addEventListener('click', function() {
        if (currentPage < totalPages) { // Ensure it doesn't exceed total pages
            currentPage++;
            renderCurrentPage();
            updatePageDropdown(); // Update the page number in the dropdown
        }
    });

    // Page select dropdown change event
    document.getElementById('page-select').addEventListener('change', function(event) {
        currentPage = parseInt(event.target.value) + 1; // Adjust to 1-based page numbering
        renderCurrentPage();
    });

    // Initial render of the first page
    renderCurrentPage();

    // Populate the page dropdown with specific items
    const pageSelect = document.getElementById('page-select');
    contents.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.page - 1; // 0-based for the dropdown
        option.textContent = item.name;
        pageSelect.appendChild(option);
    });

    // Ensure the dropdown is updated with the correct initial value
    updatePageDropdown();
}
