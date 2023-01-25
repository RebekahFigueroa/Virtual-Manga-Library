// helper functions

//pull user profile
const createUserProfile = () => {
  const profileContainer = document.getElementById("user-profile-container");
  profileContainer.innerHTML = "";

  const welcomeBanner = document.createElement("h1");
  welcomeBanner.classList.add("welcome-banner");
  welcomeBanner.innerHTML = `Welcome to My Virtual Manga Shelf!`;

  const userProfileSection = document.createElement("div");
  userProfileSection.classList.add("user-profile-section");

  const userProfileHeader = document.createElement("div");
  userProfileHeader.classList.add("user-profile-header");
  userProfileHeader.innerHTML = "Fun Stats About The Library";

  const userProfileMangaCount = document.createElement("div");
  userProfileMangaCount.classList.add("user-profile-manga-count");
  userProfileMangaCount.innerHTML = "How many manga are in the library?";
  fetch(" http://localhost:3000/manga")
    .then((response) => response.json())
    .then((mangas) => {
      const mangaCountNumber = document.createElement("div");
      mangaCountNumber.classList.add("stats-cards");
      mangaCountNumber.innerHTML = Object.keys(mangas).length;
      userProfileMangaCount.appendChild(mangaCountNumber);
    });

  const userProfileMangaType = document.createElement("div");
  userProfileMangaType.classList.add("user-profile-manga-type");
  userProfileMangaType.innerHTML = "What % of my library is manga?";
  fetch(" http://localhost:3000/manga")
    .then((response) => response.json())
    .then((mangas) => {
      const mangaCount = mangas.filter(
        (manga) => manga.type === "Manga"
      ).length;

      const lightNovelCount = mangas.filter(
        (manga) => manga.type === "Light Novel"
      ).length;

      const percentOfManga = mangaCount / (mangaCount + lightNovelCount);
      const mangaType = document.createElement("div");
      mangaType.innerHTML = percentOfManga.toFixed(2) * 100 + "%";
      mangaType.classList.add("stats-cards");
      userProfileMangaType.appendChild(mangaType);
    });

  const userProfileFavoriteGenre = document.createElement("div");
  userProfileFavoriteGenre.classList.add("user-profile-favorite-genre");
  userProfileFavoriteGenre.innerHTML = "What is my favorite genre?";
  fetch(" http://localhost:3000/manga")
    .then((response) => response.json())
    .then((mangas) => {
      const genreCounts = {};

      mangas.forEach((manga) =>
        manga.genres.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] ?? 0) + 1;
        })
      );

      const genresSorted = Object.keys(genreCounts).sort(
        (a, b) => genreCounts[b] - genreCounts[a]
      );

      console.log(genresSorted);
      const topGenre = genresSorted.slice(0, 1);
      const secondGenre = genresSorted.slice(1, 2);
      const thirdGenre = genresSorted.slice(2, 3);

      const mangaGenreNumberTop = document.createElement("div");
      mangaGenreNumberTop.classList.add("stats-cards-genres");
      mangaGenreNumberTop.innerHTML = "1st - " + topGenre;
      userProfileFavoriteGenre.appendChild(mangaGenreNumberTop);

      const mangaGenreNumberSecond = document.createElement("div");
      mangaGenreNumberSecond.classList.add("stats-cards-genres");
      mangaGenreNumberSecond.innerHTML = "2nd - " + secondGenre;
      userProfileFavoriteGenre.appendChild(mangaGenreNumberSecond);

      const mangaGenreNumberThird = document.createElement("div");
      mangaGenreNumberThird.classList.add("stats-cards-genres");
      mangaGenreNumberThird.innerHTML = "3rd - " + thirdGenre;
      userProfileFavoriteGenre.appendChild(mangaGenreNumberThird);
    });

  const userProfileMangaPercent = document.createElement("div");
  userProfileMangaPercent.classList.add("user-profile-manga-percent");
  userProfileMangaPercent.innerHTML = "What % of my library have I read?";
  fetch(" http://localhost:3000/manga")
    .then((response) => response.json())
    .then((mangas) => {
      const mangaHaveRead = mangas.filter(
        (manga) => manga.readStatus === true
      ).length;

      const mangaHaveNotRead = mangas.filter(
        (manga) => manga.readStatus === false
      ).length;

      const percentOfLibraryRead =
        mangaHaveRead / (mangaHaveRead + mangaHaveNotRead);
      const divPercentOfLibraryRead = document.createElement("div");
      divPercentOfLibraryRead.classList.add("stats-cards");
      divPercentOfLibraryRead.innerHTML =
        percentOfLibraryRead.toFixed(2) * 100 + "%";
      userProfileMangaPercent.appendChild(divPercentOfLibraryRead);
    });

  userProfileSection.appendChild(userProfileHeader);
  userProfileSection.appendChild(userProfileMangaCount);
  userProfileSection.appendChild(userProfileMangaType);
  userProfileSection.appendChild(userProfileFavoriteGenre);
  userProfileSection.appendChild(userProfileMangaPercent);

  // get a recommendation of unread item from json server
  const recommendationSection = document.createElement("div");
  recommendationSection.classList.add("recommendation-section");
  const recommendationBlurb = document.createElement("div");
  recommendationBlurb.classList.add("recommendation-header");
  recommendationBlurb.innerHTML = "Find Unread Series To Complete";

  const recommendationButton = document.createElement("button");
  recommendationButton.innerHTML = "Get Series";
  recommendationButton.classList.add("recommendation-button");

  const getRecommendedMangaContainer = document.createElement("div");
  getRecommendedMangaContainer.classList.add(
    "recommended-image-title-container"
  );

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
          recommendationPicture.classList.add("recommendation-image");

          const recommendationTitle = document.createElement("div");
          recommendationTitle.classList.add("recommendation-title");
          recommendationTitle.innerHTML = randomMangaLibraryPick.titleEnglish;

          getRecommendedMangaContainer.appendChild(recommendationTitle);
          getRecommendedMangaContainer.appendChild(recommendationPicture);
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
          readStatus: false,
          libraryScore: null,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => createUserProfile(json));
      confirm("Manga was added!");
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

        // add personal scores/ details
        const mangaPersonalDetailsContainer = document.createElement("div");
        mangaPersonalDetailsContainer.classList.add(
          "manga-personal-details-container"
        );

        const mangaNumberOfVolumesTitle = document.createElement("div");
        mangaNumberOfVolumesTitle.classList.add(
          "manga-personal-details-title-volumes"
        );
        mangaNumberOfVolumesTitle.innerHTML = "Volumes";

        const mangaNumberOfVolumes = document.createElement("div");
        mangaNumberOfVolumes.classList.add(
          "manga-personal-details-data-volumes"
        );
        mangaNumberOfVolumes.innerHTML = mangaResult.volumesLibrary;

        const mangaReadStatusTitle = document.createElement("div");
        mangaReadStatusTitle.classList.add("manga-personal-details-title-read");
        mangaReadStatusTitle.innerHTML = "Read";

        const mangaReadStatus = document.createElement("div");
        mangaReadStatus.classList.add("manga-personal-details-data-read");
        mangaReadStatus.innerHTML = mangaResult.readStatus;

        const mangaScoreTitle = document.createElement("div");
        mangaScoreTitle.classList.add("manga-personal-details-title-score");
        mangaScoreTitle.innerHTML = "Score";

        const mangaScore = document.createElement("div");
        mangaScore.classList.add("manga-personal-details-data-score");
        mangaScore.innerHTML = mangaResult.libraryScore;

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
        cardWithMangaInfo.appendChild(mangaPersonalDetailsContainer);
        mangaPersonalDetailsContainer.appendChild(mangaNumberOfVolumesTitle);
        mangaPersonalDetailsContainer.appendChild(mangaNumberOfVolumes);
        mangaPersonalDetailsContainer.appendChild(mangaReadStatusTitle);
        mangaPersonalDetailsContainer.appendChild(mangaReadStatus);
        mangaPersonalDetailsContainer.appendChild(mangaScoreTitle);
        mangaPersonalDetailsContainer.appendChild(mangaScore);

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
              createUserProfile(json);
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
