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
				const cardsContainer = document.getElementById("cards-container");
				cardsContainer.innerHTML = "";
				json.data.forEach((datum) => {
					console.log(datum);
					//create card
					const cardWithMangaInfo = document.createElement("div");
					// add image
					const mangaImg = document.createElement("img");
					mangaImg.src = datum.images.jpg.image_url;
					//Add title (english)
					const mangaTitle = document.createElement("h3");
					mangaTitle.innerHTML = datum.title;

					// add type
					const mangaType = document.createElement("h4");
					mangaType.innerHTML = datum.type;

					// Add 'add to library' button
					const addToLibraryBtn = document.createElement("button");
					addToLibraryBtn.innerHTML = "Add To Library";

					//Append to card + card container
					cardsContainer.appendChild(cardWithMangaInfo);
					cardWithMangaInfo.appendChild(mangaImg);
					cardWithMangaInfo.appendChild(mangaTitle);
					cardWithMangaInfo.appendChild(mangaType);
					cardWithMangaInfo.appendChild(addToLibraryBtn);
				});
			});
	});
});
