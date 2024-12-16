document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const response = await fetch('http://localhost/booking-system/api/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP hiba: ${response.status}`);
                }

                // Próbáljuk meg a választ JSON formátumban értelmezni
                const result = await response.json(); // A válasz most már JSON formátumban érkezik
                console.log(result); // Ellenőrizd a válasz tartalmát

                // Ha van hiba, akkor biztosítjuk, hogy az üzenetet mindig láthatja a felhasználó
                alert(result.message);

                // Ha sikeres a bejelentkezés, akkor a role alapján irányítunk
                if (result.message === "Sikeres bejelentkezés!") {
                    localStorage.setItem('role', result.role);
                    localStorage.setItem('user_id', result.user_id);
                    localStorage.setItem('username', result.username);

                    const role = localStorage.getItem('role');
                    console.log(role); // Ellenőrzés

                    if (role === "admin") {
                        window.location.href = 'http://localhost/booking-system/view/admin_dashboard.html'; // Admin dashboard
                    } else {
                        window.location.href = 'http://localhost/booking-system/view/user_dashboard.html'; // Felhasználói dashboard
                    }
                }
            } catch (error) {
                console.error('Hiba a bejelentkezés során:', error);
                alert('Hiba történt a bejelentkezés során.');
            }
        });
    }
});
