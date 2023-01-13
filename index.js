// helper functions
const renderSearchResults = () => {
	const cardsContainer = document.getElementById("cards-container");
	cardsContainer.innerHTML = "";
	searchResults.forEach((searchResult) => {
		console.log(searchResult);
		//create card
		const cardWithMangaInfo = document.createElement("div");
		cardWithMangaInfo.classList.add("manga-card");
		// add image
		const mangaImg = document.createElement("img");
		mangaImg.classList.add("manga-image");
		mangaImg.src = searchResult.images.jpg.image_url;
		//Add title (english)
		const mangaTitle = document.createElement("h3");
		mangaTitle.innerHTML = searchResult.title;

		// add type
		const mangaType = document.createElement("h4");
		mangaType.innerHTML = searchResult.type;

		// Add 'add to library' button
		const addToLibraryBtn = document.createElement("button");
		addToLibraryBtn.innerHTML = "Add To Library";
		addToLibraryBtn.classList.add("add-button");

		//Append to card + card container
		cardsContainer.appendChild(cardWithMangaInfo);
		cardWithMangaInfo.appendChild(mangaImg);
		cardWithMangaInfo.appendChild(mangaTitle);
		cardWithMangaInfo.appendChild(mangaType);
		cardWithMangaInfo.appendChild(addToLibraryBtn);

		//add hover effect
		cardWithMangaInfo.addEventListener("mouseover", () => {
			cardWithMangaInfo.classList.add("manga-card-hover");
		});

		//remove hover effect
		cardWithMangaInfo.addEventListener("mouseout", () => {
			cardWithMangaInfo.classList.remove("manga-card-hover");
		});
	});
};

//results of search API request (aka json.data)
let searchResults = [];

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
				//store search results for later to re-render with toggle
				searchResults = json.data;
				renderSearchResults();
			});
	});
});

const functionThatUsesCallback = (callback) => {
	callback();
};
