document.addEventListener('DOMContentLoaded', () => {
    const addListingForm = document.getElementById('addListingForm');
    const listingsContainer = document.getElementById('listingsContainer');
    const host_id = localStorage.getItem('host_id'); // Bejelentkezett host ID-ja

    if (!host_id) {
        alert("Bejelentkezés szükséges!");
        window.location.href = "login_host.html";
        return;
    }

    // Szállások betöltése
    async function loadListings() {
        try {
            const response = await fetch(`http://localhost/booking-system/api/get_listings.php?host_id=${host_id}`);

            if (!response.ok) {
                console.log(response.message);
                throw new Error(`HTTP hiba: ${response.status}`);
            }

            const listings = await response.json();
            displayListings(listings);
        } catch (error) {
            console.log(response.message);
            console.error('Hiba a szállások betöltése során:', error);
            alert('Hiba történt a szállások betöltése során.');
        }
    }

    // Szállások megjelenítése
    function displayListings(listings) {
        listingsContainer.innerHTML = ''; // Ürítjük az előző tartalmat

        if (listings.length === 0) {
            listingsContainer.innerHTML = '<p>Nincsenek feltöltött szállásaid.</p>';
            return;
        }

        listings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.className = 'listing';

            listingElement.innerHTML = `
                <h3>${listing.name}</h3>
                <p><strong>Cím:</strong> ${listing.address}</p>
                <p><strong>Ár:</strong> ${listing.price} Ft/éj</p>
                <p><strong>Leírás:</strong> ${listing.description}</p>
                <img src="${listing.image_url}" alt="${listing.name}" style="max-width: 300px; max-height: 200px;">
            `;

            listingsContainer.appendChild(listingElement);
        });
    }

    // Szállás feltöltése
    if (addListingForm) {
        addListingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = e.target.name.value;
            const address = e.target.address.value;
            const price = e.target.price.value;
            const description = e.target.description.value;
            const image_url = e.target.image_url.value;

            try {
                const response = await fetch('http://localhost/booking-system/api/add_listing.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ host_id, name, address, price, description, image_url }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP hiba: ${response.status}`);
                }

                const result = await response.json();
                alert(result.message);

                if (result.message === "Szállás sikeresen feltöltve!") {
                    addListingForm.reset();
                    loadListings(); // Frissítjük a szállások listáját
                }
            } catch (error) {
                console.error('Hiba a szállás feltöltése során:', error);
                alert('Hiba történt a szállás feltöltése során.');
            }
        });
    }

    // Betöltjük a szállásokat az oldal betöltésekor
    loadListings();
});
