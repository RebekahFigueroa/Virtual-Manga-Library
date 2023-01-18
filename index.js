// helper functions

//pull user profile
const createUserProfile = (userProfile) => {
  const profileContainer = document.getElementById("user-profile-container");
  const userProfileSection = document.createElement("div");
  userProfileSection.classList.add("user-profile-section");

  const welcomeBanner = document.createElement("h1");
  welcomeBanner.classList.add("welcome-banner");
  welcomeBanner.innerHTML = `Welcome to ${userProfile.data.username}'s Virtual Manga Shelf!`;

  //adds profile picture
  const profilePicture = document.createElement("img");
  profilePicture.src = userProfile.data.images.jpg.image_url;
  //

  //adds profile link
  const profileLink = document.createElement("a");
  profileLink.style.display = "block";
  profileLink.setAttribute("href", userProfile.data.url);
  profileLink.innerHTML = "Check out myAnimeList!";

  // get a recommendation
  const recommendationSection = document.createElement("div");
  recommendationSection.classList.add("recommendation-section");
  const recommendationBlurb = document.createElement("h4");
  recommendationBlurb.innerHTML = "Looking for a recommendation? Click below";

  const recommendationButton = document.createElement("button");
  recommendationButton.innerHTML = "Get Recommendation";

  //append
  profileContainer.appendChild(welcomeBanner);
  profileContainer.appendChild(userProfileSection);
  profileContainer.appendChild(recommendationSection);
  userProfileSection.appendChild(profilePicture);
  userProfileSection.appendChild(profileLink);
  recommendationSection.appendChild(recommendationBlurb);
  recommendationSection.appendChild(recommendationButton);
};

// create card for search
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

    // add type - example: manga or light novel
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

  //   get user profile
  fetch(`https://api.jikan.moe/v4/users/kiriviri/full`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      createUserProfile(json);
    });

  // add new manga search
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
