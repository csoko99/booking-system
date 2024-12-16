document.addEventListener('DOMContentLoaded', () => {
    const viewBookingsBtn = document.getElementById('viewBookings');

    if (viewBookingsBtn) {
        viewBookingsBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost/booking-system/api/view_bookings.php', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP hiba: ${response.status}`);
                }

                const bookings = await response.json();
                console.log(bookings); // A foglalások megjelenítése

                // Megjeleníthetjük a foglalásokat egy táblázatban
            } catch (error) {
                console.error('Hiba a foglalások megtekintésében:', error);
                alert('Hiba történt a foglalások megtekintése során.');
            }
        });
    }
});
