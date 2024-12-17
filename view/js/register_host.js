document.addEventListener('DOMContentLoaded', () => {
    const hostRegisterForm = document.getElementById('hostRegisterForm');

    if (hostRegisterForm) {
        hostRegisterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const phone = e.target.phone.value;

            try {
                const response = await fetch('http://localhost/booking-system/api/register_host.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password, phone }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP hiba: ${response.status}`);
                }

                const result = await response.json();
                alert(result.message); 

                if (result.message === "Sikeres regisztráció!") {
                    window.location.href = 'login.html'; 
                }

            } catch (error) {
                console.error('Hiba a regisztráció során:', error);
                alert('Hiba történt a regisztráció során.');
            }
        });
    }
});
