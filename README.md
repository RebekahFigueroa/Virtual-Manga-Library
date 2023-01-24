# Virtual Manga Library

This is a simple way to virtually track the growing collection of physical manga I have on my shelf. It is a digital library that pulls information from myAnimeList using the API Jikan to easily search and store content. The goal is to make

## Why?

As my manga collection continues to grow, I have run into 3 main challenges:

1. I don’t remember what I own anymore
2. I can’t keep track of what I have and have not read
3. I can’t decide what to read

All of these challenges have made reading and growing my physical collection go from an enjoyable hobby to an inconvenient chore. I wanted a simple solution to control the chaos of my growing collection and bring my hobby back to a convenient and enjoyable state.

## Build Status

Currently under development.

## Tech/ Framework/ API used

- HTML, CSS, JS
- API: Jikan (https://docs.api.jikan.moe/#section/Information)
- json-server

## Installation

json-server:

1. Install JSON server as a NPM package
   > $ npm install -g json-server
2. Run JSON server
   > json-server --watch db.json

## Demo

## Features (with examples)

1. Recommend a series in the library that you have not read yet (found in header section)
   -reclick button to get new recommendation
2. Toggle between the manga library and the add to library section
3. Manga library

- view all manga in library (need to have local json server open to view cards)
- cards display details about manga series
- Button to remove series if wrong manga was added

4. Search for manga to add to library

- Use search bar to type in a series name
- Select Add to Library button if you would like to add series to library

## Future Roadmap

1.  Ability to add personal score, number of manga in series, and if I have read (Currently have to update database manually)
2.      ~~ Add statistics for library such as top genre or average score ~~
3.  Convert genres into chips
4.  Add library filtering
5.  Add a way to access from anywhere (not just when local db is running)
6.  Add interactive star rating to replace numerical system
7.  Add card flip to view synopsis
8.  Add a wishlist section
