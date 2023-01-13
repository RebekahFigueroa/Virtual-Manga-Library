//testing api

document.addEventListener("DOMContentLoaded", () => {
	const searchBarSubmitButton = document.getElementById(
		"search-bar-submit-btn"
	);
	const searchBarInput = document.getElementById("search-bar");

	searchBarSubmitButton.addEventListener("click", (event) => {
		event.preventDefault();
		fetch(`https://api.jikan.moe/v4/manga?q=${searchBarInput.value}&sfw`)
			.then((response) => response.json())
			.then((json) => {
				const cardForMangaInfo = document.getElementById("cards-container");
				cardForMangaInfo.innerHTML = "";
				json.data.forEach((datum) => {
					const mangaImg = document.createElement("img");
					mangaImg.src = datum.images.jpg.image_url;
					cardForMangaInfo.appendChild(mangaImg);
				});
			});
	});
});
