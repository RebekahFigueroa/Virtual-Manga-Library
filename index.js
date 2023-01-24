// helper functions
//pull user profile
const createUserProfile = (userProfile) => {
  const profileContainer = document.getElementById("user-profile-container");
  const userProfileSection = document.createElement("div");
  userProfileSection.classList.add("user-profile-section");

  const welcomeBanner = document.createElement("h1");
  welcomeBanner.classList.add("welcome-banner");
  welcomeBanner.innerHTML = `Welcome to My Virtual Manga Shelf!`;

  // get a recommendation of unread item from json server
  const recommendationSection = document.createElement("div");
  recommendationSection.classList.add("recommendation-section");
  const recommendationBlurb = document.createElement("h4");
  recommendationBlurb.innerHTML = "Find Unread Series To Complete";

  const recommendationButton = document.createElement("button");
  recommendationButton.innerHTML = "Get Series";
  recommendationButton.classList.add("recommendation-button");

  const getRecommendedMangaContainer = document.createElement("div");

  recommendationSection.appendChild(recommendationBlurb);
  recommendationSection.appendChild(recommendationButton);
  recommendationSection.appendChild(getRecommendedMangaContainer);

  recommendationButton.addEventListener("click", () => {
    getRecommendedMangaContainer.innerHTML = "";
    fetch("http://localhost:3000/manga")
      .then((response) => response.json())
      .then((json) => {
        const unreadMangas = json.filter((manga) => manga.readStatus === false);
        // if there are any unreadMangas - recommend a randomone
        // else display "you've read everything"
        // randomMangaLibraryPick = [Math.floor(Math.random() * json.length)];
        if (unreadMangas.length !== 0) {
          const randomMangaLibraryPick =
            unreadMangas[Math.floor(Math.random() * unreadMangas.length)];
          const recommendationPicture = document.createElement("img");
          recommendationPicture.src = randomMangaLibraryPick.image;

          const recommendationTitle = document.createElement("h3");
          recommendationTitle.innerHTML = randomMangaLibraryPick.titleEnglish;

          getRecommendedMangaContainer.appendChild(recommendationPicture);
          getRecommendedMangaContainer.appendChild(recommendationTitle);
        } else {
          console.log("You've read all the manga in the library");
        }
      });
  });

  //append
  profileContainer.appendChild(welcomeBanner);
  profileContainer.appendChild(userProfileSection);
  profileContainer.appendChild(recommendationSection);
};

// create card for search
const renderSearchResults = () => {
  const cardsContainer = document.getElementById("search-cards-container");
  cardsContainer.innerHTML = "";
  searchResults.forEach((searchResult) => {
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
    // add manga search button behavior to add to library
    addToLibraryBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/manga`, {
        method: "POST",
        body: JSON.stringify({
          mal_id: searchResult.mal_id,
          titleEnglish: searchResult.title_english,
          image: searchResult.images.jpg.image_url,
          authors: searchResult.authors.map((author) => author.name),
          type: searchResult.type,
          demographic: searchResult.demographics.map(
            (demographic) => demographic.name
          ),
          genres: searchResult.genres.map((genre) => genre.name),
          publishing: searchResult.published.string,
          published: searchResult.publishing,
          themes: searchResult.themes.map((theme) => theme.name),
          synopsis: searchResult.synopsis,
          volumesLibrary: null,
          readStatus: null,
          libraryScore: null,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    });

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

//create cards for library
const mangaLibrary = () => {
  const mangaLibraryContainer = document.getElementById(
    "manga-library-container"
  );
  mangaLibraryContainer.innerHTML = "";
  //get manga library server from json server
  fetch(`http://localhost:3000/manga`)
    .then((response) => response.json())
    .then((mangaResults) => {
      // for each result in manga library, make a card
      mangaResults.forEach((mangaResult) => {
        //create card (render results in local db first incase you are offline)
        const cardWithMangaInfo = document.createElement("div");
        cardWithMangaInfo.classList.add("manga-library-card");
        // add image
        const mangaImg = document.createElement("img");
        mangaImg.classList.add("manga-library-image");
        mangaImg.src = mangaResult.image;
        //Add title (english)
        const mangaTitle = document.createElement("h3");
        mangaTitle.style.textAlign = "center";
        mangaTitle.innerHTML = mangaResult["titleEnglish"];
        //Add authors
        const mangaAuthors = document.createElement("div");
        mangaAuthors.innerHTML =
          '<span style="font-weight:700;">Authors:</span> ' +
          mangaResult.authors.join(" - ");
        //Add published info
        const mangaPublished = document.createElement("div");
        mangaPublished.innerHTML =
          '<span style="font-weight:700;">Published:</span> ' +
          mangaResult.publishing;
        //Add type info
        const mangaType = document.createElement("div");
        mangaType.innerHTML =
          '<span style="font-weight:700;">Type:</span> ' + mangaResult.type;
        // Add demographics
        const mangaDemographics = document.createElement("div");
        mangaDemographics.innerHTML =
          '<span style="font-weight:700;">Demographic:</span> ' +
          mangaResult.demographic.join(", ");
        //Add themes
        const mangaThemes = document.createElement("div");
        mangaThemes.innerHTML =
          '<span style="font-weight:700;">Themes:</span> ' +
          mangaResult.themes.join(", ");
        //Add genres
        const mangaGenres = document.createElement("div");
        mangaGenres.innerHTML =
          '<span style="font-weight:700;">Genres:</span> ' +
          mangaResult.genres.join(", ");

        //Append to card + card container
        mangaLibraryContainer.appendChild(cardWithMangaInfo);
        cardWithMangaInfo.appendChild(mangaImg);
        cardWithMangaInfo.appendChild(mangaTitle);
        cardWithMangaInfo.appendChild(mangaAuthors);
        cardWithMangaInfo.appendChild(mangaPublished);
        cardWithMangaInfo.appendChild(mangaType);
        cardWithMangaInfo.appendChild(mangaThemes);
        cardWithMangaInfo.appendChild(mangaDemographics);
        cardWithMangaInfo.appendChild(mangaGenres);

        //add hover effect
        cardWithMangaInfo.addEventListener("mouseover", () => {
          cardWithMangaInfo.classList.add("manga-card-hover");
        });

        //remove hover effect
        cardWithMangaInfo.addEventListener("mouseout", () => {
          cardWithMangaInfo.classList.remove("manga-card-hover");
        });

        // remove a card from library
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove Manga";
        removeButton.classList.add("remove-button");
        cardWithMangaInfo.appendChild(removeButton);

        removeButton.addEventListener("click", () => {
          fetch(`http://localhost:3000/manga/${mangaResult.id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              cardWithMangaInfo.remove();
              console.log(json);
            });
        });
      });
    });
};

// tab toggling
const tabToggle = () => {
  const mangaLibraryTab = document.getElementById("manga-library-tab");
  const searchTab = document.getElementById("search-tab");
  const mangaLibraryContainer = document.getElementById(
    "manga-library-container"
  );
  const searchContainer = document.getElementById("search-content-container");

  mangaLibraryTab.addEventListener("click", () => {
    mangaLibraryContainer.style.display = "grid";
    searchContainer.style.display = "none";
    mangaLibraryTab.style.backgroundColor = "#ffefef";
    searchTab.style.backgroundColor = "#d3dedc";
    mangaLibrary();
  });

  searchTab.addEventListener("click", () => {
    mangaLibraryContainer.style.display = "none";
    searchContainer.style.display = "grid";
    mangaLibraryTab.style.backgroundColor = "#d3dedc";
    searchTab.style.backgroundColor = "#ffefef";
  });
};

//results of search API request (aka json.data)
let searchResults = [];

document.addEventListener("DOMContentLoaded", () => {
  const searchBarSubmitButton = document.getElementById(
    "search-bar-submit-btn"
  );
  const searchBarInput = document.getElementById("search-bar");

  // add new manga search results
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

  //header section
  createUserProfile();

  //toggle behavior for tabs
  tabToggle();

  // render manga library
  mangaLibrary();
});
