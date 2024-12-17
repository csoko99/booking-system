document.addEventListener("DOMContentLoaded", async () => {
    const detailsContainer = document.getElementById("listingDetails");
    const bookingForm = document.getElementById("bookingForm");
    const bookingMessage = document.getElementById("bookingMessage");
    const bookingFormElement = document.getElementById("bookingFormElement");

    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("listing_id");

    if (!listingId) {
        detailsContainer.innerHTML = "<p>Hibás vagy hiányzó szállás azonosító.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost/booking-system/api/get_listing_details.php?listing_id=${listingId}`);
        
        if (!response.ok) {
            console.error("HTTP hiba történt:", response.status, response.statusText);
            detailsContainer.innerHTML = "<p>Hiba történt az adatok betöltése során.</p>";
            return;
        }

        const textResponse = await response.text();
        console.log("Szerver válasz:", textResponse);

        // Próbáljuk JSON-ként értelmezni a választ
        try {
            const data = JSON.parse(textResponse);

            if (data.error) {
                detailsContainer.innerHTML = `<p>Hiba: ${data.error}</p>`;
            } else {
                detailsContainer.innerHTML = `
                    <h1>${data.name}</h1>
                    <img src="${data.image_url}" alt="${data.name}" style="max-width: 500px;">
                    <p><strong>Cím:</strong> ${data.address}</p>
                    <p><strong>Ár:</strong> ${data.price} Ft/éj</p>
                    <p><strong>Leírás:</strong> ${data.description}</p>
                    <p><strong>Elérhetőség:</strong> ${data.contact || "Nincs elérhetőség megadva."}</p>
                `;
                bookingForm.style.display = "block"; // Megjeleníti a foglalási űrlapot
            }
        } catch (e) {
            console.error("JSON parse hiba:", e);
            detailsContainer.innerHTML = "<p>Hiba történt a válasz feldolgozásakor. Valószínűleg nem JSON válasz érkezett.</p>";
        }
    } catch (error) {
        console.error("Hiba a szállás adatainak betöltése során:", error);
        detailsContainer.innerHTML = "<p>Hiba történt az adatok betöltése során.</p>";
    }

    // Lekérjük a felhasználó session adatait
    let userId = null;
    try {
        const sessionResponse = await fetch("http://localhost/booking-system/api/check_session.php");

        if (sessionResponse.ok) {
            const sessionData = await sessionResponse.json();
            userId = sessionData.user_id; // Ha be van jelentkezve, beállítjuk a user_id-t
            console.log("Bejelentkezve:", sessionData.username);
        } else {
            bookingMessage.textContent = "Nincs bejelentkezve a felhasználó.";
            bookingMessage.style.color = "red";
            return;
        }
    } catch (error) {
        bookingMessage.textContent = "Hiba történt a session ellenőrzésekor.";
        bookingMessage.style.color = "red";
        console.error("Hiba a session lekérdezésében:", error);
        return;
    }

    // A foglalás beküldése
    bookingFormElement.addEventListener("submit", async (event) => {
        event.preventDefault();
   
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const guests = document.getElementById("guests").value;
   
        if (!startDate || !endDate || !guests) {
            bookingMessage.textContent = "Kérlek töltsd ki az összes mezőt!";
            return;
        }
   
        try {
            const response = await fetch("http://localhost/booking-system/api/create_booking.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    listing_id: listingId,
                    user_id: userId, // Itt most már dinamikusan van beállítva a user_id
                    start_date: startDate,
                    end_date: endDate,
                    guests: guests
                })
            });

            if (!response.ok) {
                console.error("HTTP hiba történt:", response.status, response.statusText);
                bookingMessage.textContent = "Hiba a foglalás során!";
                bookingMessage.style.color = "red";
                return;
            }

            const result = await response.json(); // JSON válasz kezelése
            console.log(result);

            if (result.message === "Foglalás sikeresen rögzítve!") {
                bookingMessage.textContent = "A foglalás sikeresen megtörtént!";
                bookingMessage.style.color = "green";
            } else {
                bookingMessage.textContent = "Hiba a foglalás során!";
                bookingMessage.style.color = "red";
            }
        } catch (error) {
            bookingMessage.textContent = "Hiba a foglalás során!";
            bookingMessage.style.color = "red";
            console.error("Hiba a foglalás során:", error);
        }
    });
});
