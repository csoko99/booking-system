document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost/booking-system/api/check_session.php');

    if (response.ok) {
        const user = await response.json();
        console.log('User data:', user);
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;

        try {
            const bookingsResponse = await fetch('http://localhost/booking-system/api/get_bookings.php');
            const bookings = await bookingsResponse.json();
            console.log('Bookings:', bookings); 
            const bookingsList = document.getElementById('bookingsList');

            if (Array.isArray(bookings) && bookings.length > 0) {
                bookings.forEach(booking => {
                    const bookingElement = document.createElement('div');
                    bookingElement.classList.add('booking');
                    bookingElement.innerHTML = `
                        <h3>${booking.listing_name}</h3>
                        <p><strong>Kezdő dátum:</strong> ${booking.start_date}</p>
                        <p><strong>Befejező dátum:</strong> ${booking.end_date}</p>
                        <p><strong>Vendégek száma:</strong> ${booking.guests}</p>
                        <p><strong>Összesen:</strong> ${booking.total_price} Ft</p>
                    `;
                    bookingsList.appendChild(bookingElement);
                });
            } else {
                bookingsList.innerHTML = '<p>Nincs foglalásod.</p>';
            }
        } catch (error) {
            console.error('Hiba történt a foglalások lekérdezésekor:', error);
            const bookingsList = document.getElementById('bookingsList');
            bookingsList.innerHTML = '<p>Hiba történt a foglalások lekérdezésekor.</p>';
        }
    } else {
        window.location.href = 'login.html';
    }

    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await fetch('http://localhost/booking-system/api/logout.php');
        window.location.href = 'http://localhost/booking-system/view/html/login.html'; 
    });
});
