document.addEventListener('DOMContentLoaded', async () => {
    // Ellenőrzés, hogy be van-e jelentkezve a felhasználó
    const response = await fetch('http://localhost/booking-system/api/check_session.php');

    if (response.ok) {
        const user = await response.json();
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
    } else {
        // Ha nem jelentkezett be, irányítsuk át a login oldalra
        window.location.href = 'login.html';
    }

    // Kijelentkezés gomb
    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await fetch('http://localhost/booking-system/api/logout.php');
        window.location.href = 'login.html'; // Irányítás vissza a login oldalra
    });
});
