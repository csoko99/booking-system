window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost/booking-system/api/check_session.php');
    
    if (!response.ok) {
        console.error("Hiba történt a session ellenőrzésénél");
        return;
    }

    const data = await response.json();

    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const authLinks = document.getElementById('authLinks');

    if (data.logged_in) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';

        const profileLink = document.createElement('a');
        profileLink.href = 'user_dashboard.html';
        profileLink.textContent = 'Profil';
        
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Kijelentkezés';
        logoutLink.addEventListener('click', async () => {
            await fetch('http://localhost/booking-system/api/logout.php');
            window.location.reload();  
        });

        authLinks.appendChild(profileLink);
        authLinks.appendChild(logoutLink);
    } else {
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
    }
});
