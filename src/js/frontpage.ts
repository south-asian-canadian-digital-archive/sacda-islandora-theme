import { generateIslandoraUrl } from './search.util';

document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('frontSearchInput') as HTMLInputElement;
	const searchButton = document.getElementById('frontSearchButton') as HTMLButtonElement; // Note: This might not be present in the simplified form, but keeping logic.

	if (searchInput) {
		if (searchButton) {
			searchInput.addEventListener('input', () => {
				searchButton.disabled = searchInput.value.trim().length === 0;
			});
		}

		const form = searchInput.closest('form');
		if (form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				const term = searchInput.value.trim();
				if (term) {
					window.location.href = generateIslandoraUrl(term);
				}
			});
		}
	}
});

export { };
