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

                const result = await response.json(); // A válasz most már JSON formátumban érkezik
                console.log(result); // Ellenőrizd a válasz tartalmát

                if (result.message === "Sikeres bejelentkezés!") {
                    // Ha sikeres, akkor mentjük a role-t és a többi adatot a sessionStorage-ba (vagy localStorage)
                    localStorage.setItem('role', result.role);
                    localStorage.setItem('user_id', result.user_id);
                    localStorage.setItem('username', result.username);

                    const role = localStorage.getItem('role');
                    console.log("Role: " + role); // Ellenőrizd, hogy a role helyesen van beállítva

                    // Role alapján irányítás
                    if (role === "admin") {
                        window.location.href = 'admin_dashboard.html'; // Admin felület
                    } else if (role === "user") {
                        window.location.href = 'user_dashboard.html'; // Felhasználói felület
                    } else {
                        console.log("Nem ismert szerep.");
                    }
                } else {
                    console.log("Hiba a bejelentkezés során: " + result.message);
                }

            } catch (error) {
                console.error('Hiba a bejelentkezés során:', error);
                alert('Hiba történt a bejelentkezés során.');
            }
        });
    }
});
