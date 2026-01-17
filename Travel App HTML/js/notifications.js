// notifications.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in (from previous pages)
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
        localStorage.setItem('authMessage', 'Please log in to view your reservations.');
        location.href = 'login.html'; // Redirect to login
        return;
    }

    // Show payment confirmation if coming from successful payment (simulate via localStorage)
    const paymentConfirm = localStorage.getItem('paymentConfirmed');
    if (paymentConfirm) {
        document.getElementById('payment-confirmation').style.display = 'block';
        localStorage.removeItem('paymentConfirmed');
    }

    // Handle button clicks
    const reservationCards = document.querySelectorAll('.reservation-card');
    reservationCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-view');
        const cancelBtn = card.querySelector('.btn-cancel');
        const statusSpan = card.querySelector('.res-status');
        const resId = card.dataset.resId;

        // View Details / Complete Payment / Leave Review
        viewBtn.addEventListener('click', () => {
            if (statusSpan.classList.contains('status-pending')) {
                // Simulate complete payment
                alert(`Completing payment for Reservation ID: ${resId}`);
                // In real app, redirect to payment page
                localStorage.setItem('paymentConfirmed', 'true'); // Set flag for confirmation on return
                location.href = 'payment.html?resId=' + resId; // Assume payment.html exists
            } else if (statusSpan.classList.contains('status-completed')) {
                // Leave review
                alert(`Leaving review for Reservation ID: ${resId}`);
                // Redirect to review form or open modal
                location.href = 'review.html?resId=' + resId;
            } else {
                // View details
                alert(`Viewing details for Reservation ID: ${resId}`);
                // Redirect to details page
                location.href = 'reservation-details.html?resId=' + resId;
            }
        });

        // Cancel button (only for non-completed)
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (confirm(`Are you sure you want to cancel Reservation ID: ${resId}?`)) {
                    // Simulate cancel
                    card.remove(); // Remove card from UI
                    localStorage.setItem('authMessage', `Reservation ${resId} canceled successfully.`); // Message for other pages if needed
                    alert(`Reservation ${resId} canceled.`);
                }
            });
        }
    });
});