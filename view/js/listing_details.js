document.addEventListener("DOMContentLoaded", async () => {
    const detailsContainer = document.getElementById("listingDetails");
    const bookingForm = document.getElementById("bookingForm");
    const bookingMessage = document.getElementById("bookingMessage");
    const bookingFormElement = document.getElementById("bookingFormElement");

    const ratingSection = document.getElementById("ratingSection");
    const stars = document.getElementById("stars").getElementsByTagName("span");
    const submitReviewButton = document.getElementById("submitReview");
    const commentInput = document.getElementById("comment");
    const reviewMessage = document.getElementById("reviewMessage");

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

        const data = await response.json();

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

            // Értékelések átlagának megjelenítése
            if (data.average_rating) {
                detailsContainer.innerHTML += `<p><strong>Átlagos értékelés:</strong> ${data.average_rating} &#9733;</p>`;
            }

            // Értékelés szekció megjelenítése
            ratingSection.style.display = "block";
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

    // A csillagok kiválasztása
    let selectedRating = 0;
    Array.from(stars).forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.getAttribute("data-value"));
            Array.from(stars).forEach(star => star.style.color = "gray"); // Reset all stars
            for (let i = 0; i < selectedRating; i++) {
                stars[i].style.color = "gold"; // Highlight selected stars
            }
        });
    });

    // Értékelés beküldése
    submitReviewButton.addEventListener("click", async () => {
        if (selectedRating === 0) {
            reviewMessage.textContent = "Kérlek válassz egy csillagot!";
            reviewMessage.style.color = "red";
            return;
        }
    
        const comment = commentInput.value;
    
        try {
            const response = await fetch("http://localhost/booking-system/api/add_review.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    listing_id: listingId,
                    user_id: userId,
                    rating: selectedRating,
                    comment: comment
                })
            });
    
            // Ellenőrizzük, hogy a válasz státusza 200 (sikeres)
            if (!response.ok) {
                console.error("HTTP hiba történt:", response.status, response.statusText);
                reviewMessage.textContent = "Hiba az értékelés elküldésekor!";
                reviewMessage.style.color = "red";
                return;
            }
    
            const result = await response.json();
    
            // Ellenőrizzük, hogy a válasz sikeres
            if (result.message === "Értékelés sikeresen rögzítve.") {
                reviewMessage.textContent = "Köszönjük az értékelésedet!";
                reviewMessage.style.color = "green";
            } else {
                reviewMessage.textContent = "Hiba az értékelés rögzítésekor!";
                reviewMessage.style.color = "red";
            }
        } catch (error) {
            reviewMessage.textContent = "Hiba az értékelés küldésekor!";
            reviewMessage.style.color = "red";
            console.error("Hiba az értékelés küldésekor:", error);
        }
    });
    
});
