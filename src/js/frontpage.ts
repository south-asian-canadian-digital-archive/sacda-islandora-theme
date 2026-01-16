/**
 * Front page interactions.
 */

declare global {
	interface Window {
		sacdaSearch?: {
			generateIslandoraUrl: (term: string, config?: object) => string;
		};
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('frontSearchInput') as HTMLInputElement;
	const searchButton = document.getElementById('frontSearchButton') as HTMLButtonElement;

	if (searchInput && searchButton) {
		searchInput.addEventListener('input', () => {
			searchButton.disabled = searchInput.value.trim().length === 0;
		});

		const form = searchInput.closest('form');
		const sacdaSearch = window.sacdaSearch;
		if (form && sacdaSearch) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				const term = searchInput.value.trim();
				if (term) {
					window.location.href = sacdaSearch.generateIslandoraUrl(term);
				}
			});
		}
	}
});

export { };
