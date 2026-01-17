document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('search-input');
            const regionFilter = document.getElementById('region-filter');
            const sortFilter = document.getElementById('sort-filter');
            const applyButton = document.getElementById('apply-filters');
            const companyGrid = document.getElementById('company-grid');
            const showingText = document.getElementById('showing-text');

            // Store original cards for resetting
            const originalCards = Array.from(companyGrid.children);

            // Function to apply filters and sort
            function applyFilters() {
                let filteredCards = originalCards.filter(card => {
                    const name = card.querySelector('h3').textContent.toLowerCase();
                    const searchTerm = searchInput.value.toLowerCase();
                    const region = card.dataset.region;
                    const selectedRegion = regionFilter.value;

                    const matchesSearch = name.includes(searchTerm);
                    const matchesRegion = !selectedRegion || region === selectedRegion;

                    return matchesSearch && matchesRegion;
                });

                // Sort filtered cards
                const sortValue = sortFilter.value;
                if (sortValue === 'highest') {
                    filteredCards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
                } else if (sortValue === 'most_tours') {
                    filteredCards.sort((a, b) => parseInt(b.dataset.tours) - parseInt(a.dataset.tours));
                }

                // Update grid
                companyGrid.innerHTML = '';
                filteredCards.forEach(card => companyGrid.appendChild(card));

                // Update showing text (total is hardcoded as 35 for demo)
                showingText.textContent = `Showing ${filteredCards.length} of 35 Registered Companies`;
            }

            // Event listeners
            applyButton.addEventListener('click', applyFilters);

            // Optional: Filter on Enter key in search
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    applyFilters();
                }
            });

            // Initial load
            applyFilters();
        });