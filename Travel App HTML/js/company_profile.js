// company_profile.js
// company_profile.js

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(content => content.style.display = 'none');

            // Add active to clicked tab
            tab.classList.add('active');
            // Show corresponding content
            const targetId = tab.dataset.tab;
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Follow button functionality with localStorage
    const followBtn = document.getElementById('follow-btn');
    const isFollowing = localStorage.getItem('followingWildernessTreks') === 'true';

    if (isFollowing) {
        followBtn.textContent = 'Unfollow Company';
        followBtn.style.backgroundColor = '#b00020'; // Red for unfollow
    }

    followBtn.addEventListener('click', () => {
        const following = localStorage.getItem('followingWildernessTreks') === 'true';
        if (following) {
            localStorage.setItem('followingWildernessTreks', 'false');
            followBtn.textContent = 'Follow Company';
            followBtn.style.backgroundColor = '#1f8f4b'; // Reset to green
            alert('You have unfollowed Wilderness Treks Co.');
        } else {
            localStorage.setItem('followingWildernessTreks', 'true');
            followBtn.textContent = 'Unfollow Company';
            followBtn.style.backgroundColor = '#b00020';
            alert('You are now following Wilderness Treks Co.');
        }
    });

    // Reserve buttons: Check login state from previous pages (using localStorage)
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    reserveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
            if (!isLoggedIn) {
                localStorage.setItem('authMessage', 'Please log in to reserve a tour.');
                location.href = 'login.html'; // Redirect to login if not logged in
            } else {
                const tourId = btn.dataset.tourId;
                // Simulate reservation (in real app, send to server)
                alert(`Reservation requested for Tour ID: ${tourId}! A representative will contact you.`);
                // Optional: Redirect to reservation.html?tourId=tourId
                location.href = `reservation.html?tour=${tourId}`;
            }
        });
    });

    // Back button functionality
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        location.href = 'companies.html'; // Redirect to companies page
    });
});