// Function to increment page visits
function incrementPageView() {
    let page = window.location.pathname; // Use `let` to allow reassignment

    if (page === '/product-details.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'unknown';
        page = '/product-details/' + productId + '.html'; // Reassign `page`
    }

    fetch('http://localhost:3000/page-view', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        page_visited: page
    })
    }).then(response => {
    if (response.ok) {
        console.log('Page view incremented successfully');
    } else {
        console.error('Error incrementing page view');
    }
    }).catch(error => console.error('Error:', error));
}

// Call function by loading the page
incrementPageView();