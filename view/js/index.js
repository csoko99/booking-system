document.addEventListener('DOMContentLoaded', async () => {
    const listingsContainer = document.getElementById('listingsContainer');

    try {
        const response = await fetch('http://localhost/booking-system/api/get_all_listings.php');
        if (!response.ok) {
            throw new Error(`HTTP hiba: ${response.status}`);
        }

        const listings = await response.json();

        if (listings.length === 0) {
            listingsContainer.innerHTML = '<p>Jelenleg nincs elérhető szállás.</p>';
        } else {
            listings.forEach(listing => {
                const listingElement = document.createElement('div');
                listingElement.classList.add('listing');
                listingElement.innerHTML = `
                    <h2>${listing.name}</h2>
                    <img src="${listing.image_url}" alt="${listing.name}">
                    <p><strong>Cím:</strong> ${listing.address}</p>
                    <p><strong>Ár:</strong> ${listing.price} Ft/éj</p>
                    <p><strong>Leírás:</strong> ${listing.description}</p>
                    <p><strong>Elérhetőség:</strong> ${listing.contact}</p>
                `;
                listingsContainer.appendChild(listingElement);
            });
        }
    } catch (error) {
        console.error('Hiba a szállások betöltése során:', error);
        listingsContainer.innerHTML = '<p>Hiba történt a szállások betöltése során.</p>';
    }
});
