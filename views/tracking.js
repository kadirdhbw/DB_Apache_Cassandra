// Function to increment page visits
function incrementPageView() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '';

    const page = window.location.pathname + productId;

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