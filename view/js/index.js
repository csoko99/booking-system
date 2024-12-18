

document.addEventListener("DOMContentLoaded", () => {
    const listingsContainer = document.getElementById("listingsContainer");

    fetch("http://localhost/booking-system/api/get_all_listings.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Hiba a szállások lekérdezése során!");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                listingsContainer.innerHTML = "<p>Nincs elérhető szállás jelenleg.</p>";
                return;
            }

            data.forEach(listing => {
                const listingElement = document.createElement("div");
                listingElement.className = "listing";

                listingElement.innerHTML = `
                    <h2>${listing.name}</h2>
                    <img src="${listing.image_url}" alt="${listing.name}">
                    <p><strong>Cím:</strong> ${listing.address}</p>
                    <p><strong>Ár:</strong> ${listing.price} Ft/éj</p>
                    <a href="http://localhost/booking-system/view/html/listing_details.html?listing_id=${listing.id}" class="details-link">Részletek</a>
                `;

                listingsContainer.appendChild(listingElement);
            });
        })
        .catch(error => {
            console.error("Hiba:", error);
            listingsContainer.innerHTML = `<p>Hiba történt a szállások betöltése során!</p>`;
        });
});
