document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const response = await fetch('http://localhost/booking-system/api/register.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP hiba: ${response.status}`);
                }

                const result = await response.text();
                alert(result);  

            } catch (error) {
                console.error('Hiba a regisztráció során:', error);
                alert('Hiba történt a regisztráció során.');
            }
        });
    }
});


