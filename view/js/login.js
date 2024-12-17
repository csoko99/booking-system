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

                const result = await response.json(); 
                console.log(result); 

                if (result.message === "Sikeres bejelentkezés!") {
                    localStorage.setItem('role', result.role);
                    localStorage.setItem('user_id', result.user_id);
                    localStorage.setItem('username', result.username);

                    const role = localStorage.getItem('role');
                    console.log("Role: " + role); 

                    if (role === "admin") {
                        window.location.href = 'admin_dashboard.html'; 
                    } else if (role === "user") {
                        window.location.href = 'user_dashboard.html'; 
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
