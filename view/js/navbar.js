window.addEventListener('DOMContentLoaded', async () => {
    // Küldünk egy kérés a szervernek a session állapotának lekérdezésére
    const response = await fetch('http://localhost/booking-system/api/check_session.php');
    
    // Ha nem sikerült a kérés, hibát dobunk
    if (!response.ok) {
        console.error("Hiba történt a session ellenőrzésénél");
        return;
    }

    const data = await response.json();

    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const authLinks = document.getElementById('authLinks');

    if (data.logged_in) {
        // Ha be van jelentkezve a felhasználó, akkor a Profil és Kijelentkezés linkek jelennek meg
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';

        const profileLink = document.createElement('a');
        profileLink.href = 'user_dashboard.html';
        profileLink.textContent = 'Profil';
        
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Kijelentkezés';
        logoutLink.addEventListener('click', async () => {
            // Kijelentkezés a session törlésével
            await fetch('http://localhost/booking-system/api/logout.php');
            window.location.reload();  // Újratöltjük az oldalt kijelentkezés után
        });

        authLinks.appendChild(profileLink);
        authLinks.appendChild(logoutLink);
    } else {
        // Ha nincs bejelentkezve, akkor a Bejelentkezés és Regisztráció linkek jelennek meg
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
    }
});
