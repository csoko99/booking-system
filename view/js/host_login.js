document.addEventListener('DOMContentLoaded', () => {
    const hostLoginForm = document.getElementById('hostLoginForm');

    if (hostLoginForm) {
        hostLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const response = await fetch('http://localhost/booking-system/api/login_host.php', {
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
                alert(result.message);

                if (result.message === "Sikeres bejelentkezés!") {
                    localStorage.setItem('host_id', result.host_id);
                    window.location.href = 'host_dashboard.html';
                }
            } catch (error) {
                console.error('Hiba a bejelentkezés során:', error);
                alert('Hiba történt a bejelentkezés során.');
            }
        });
    }
});
