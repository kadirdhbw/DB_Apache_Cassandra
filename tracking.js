(function trackPageVisit() {
    const { v4: uuidv4 } = require('uuid');
    // IDs for session and user
    const userId = localStorage.getItem('user_id') || uuidv4();
    const sessionId = sessionStorage.getItem('session_id') || uuidv4(); 

    // save IDs in Local/Session Storage
    localStorage.setItem('user_id', userId);
    sessionStorage.setItem('session_id', sessionId);

    // Starttime of session
    if (!sessionStorage.getItem('session_start_time')) {
        sessionStorage.setItem('session_start_time', new Date().toISOString());
    }

    // Follow visited pages in current session
    let pagesVisited = JSON.parse(sessionStorage.getItem('pages_visited')) || [];
    pagesVisited.push(window.location.pathname);
    sessionStorage.setItem('pages_visited', JSON.stringify(pagesVisited));

    // Track page view
    trackPageView(window.location.pathname);

    // Tracking data for user activity
    fetch('http://localhost:3000/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            sessionId: sessionId,
            pageVisited: window.location.pathname
        })
    }).then(response => {
        if (response.ok) console.log('Page visit tracked');
        else console.error('Tracking failed');
    }).catch(err => console.error('Error tracking page visit:', err));

    // Event listener for end of session (tab or browser close)
    window.addEventListener('beforeunload', () => {
        endSession(userId, sessionId, pagesVisited);
    });
})();

// Function to track page views
function trackPageView(page) {
    fetch('http://localhost:3000/page-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: page })
    }).then(response => {
        if (response.ok) console.log('Page view incremented');
        else console.error('Failed to increment page view');
    }).catch(err => console.error('Error incrementing page view:', err));
}

// Function to end session and save session logs
function endSession(userId, sessionId, pagesVisited) {
    const sessionStartTime = sessionStorage.getItem('session_start_time');
    const sessionEndTime = new Date().toISOString();

    fetch('http://localhost:3000/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionId: sessionId,
            userId: userId,
            startTime: sessionStartTime,
            endTime: sessionEndTime,
            pagesVisited: pagesVisited,
            actions: 'Page navigations' // More actions could be tracked here
        })
    }).then(response => {
        if (response.ok) console.log('Session log saved');
        else console.error('Failed to save session log');
    }).catch(err => console.error('Error saving session log:', err));

    // session specific data delete
    sessionStorage.removeItem('session_start_time');
    sessionStorage.removeItem('pages_visited');
}
















// (function trackPageVisit() {
//     const userId = localStorage.getItem('user_id') || 'user-' + Math.floor(Math.random() * 1000000);
//     const sessionId = sessionStorage.getItem('session_id') || 'session-' + Math.floor(Math.random() * 1000000);

//     // Speichern der IDs in Local/Session Storage
//     localStorage.setItem('user_id', userId);
//     sessionStorage.setItem('session_id', sessionId);

//     // Tracking-Daten an Backend senden
//     fetch('http://localhost:3000/track', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             userId: userId,
//             sessionId: sessionId,
//             pageVisited: window.location.pathname
//         })
//     }).then(response => {
//         if (response.ok) console.log('Page visit tracked');
//         else console.error('Tracking failed');
//     }).catch(err => console.error('Error tracking page visit:', err));
// })();
