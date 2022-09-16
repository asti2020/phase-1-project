let explelist = document.querySelector(`#exploreList`);
let anime = []; // Store anime as a global variable since we always need it
fetch("https://api.jikan.moe/v3/search/anime?q=naruto")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    anime = data.results; // populate anime array here when loading them
    data.results.forEach((anime) => renderAnimes(anime));
  });
let tvButton = document.querySelector(`#tvButton`);
tvButton.addEventListener(`click`, () => {
  explelist.innerHTML = " "; // clear out the html inside here
  const filterListTv = anime.filter((a) => {
    return a.type === "TV";
  });
  console.log("filtered by tv", filterListTv);
  filterListTv.forEach((anime) => {
    renderAnimes(anime);
  });
});
let movie = document.getElementById(`movie`);
movie.addEventListener(`click`, () => {
  explelist.innerHTML = " ";
  const filterMovie = anime.filter((a) => {
    return a.type === "Movie";
  });
  console.log("filtered by movie", filterMovie);
  filterMovie.forEach((anime) => {
    renderAnimes(anime);
  });
});
let special = document.getElementById(`special`);
special.addEventListener(`click`, () => {
  explelist.innerHTML = " ";
  const filterSpecial = anime.filter((a) => {
    return a.type === "Special";
  });
  console.log("filtered by movie", filterSpecial);
  filterSpecial.forEach((anime) => {
    renderAnimes(anime);
  });
});
function renderAnimes(anime) {
  let card = document.createElement(`card`);
  card.id = "card";
  let animeImage = document.createElement("img");
  animeImage.id = "cardimage";
  animeImage.src = anime.image_url;
  let cardTitle = document.createElement(`p`);
  cardTitle.id = "card-title";
  cardTitle.textContent = anime.title;
  let cardDetails = document.createElement(`p`);
  cardDetails.textContent = anime.type;
  cardDetails.id = "card-detail";
  let divButton = document.createElement(`div`);
  divButton.id = "divButton";
  let episodes = document.createElement(`p`);
  episodes.id = "episodes";
  episodes.innerHTML = `Ep: ${anime.episodes}`;
  let button = document.createElement(`button`);
  button.id = "button";
  let likes = document.createElement(`button`);
  likes.id = "like";
  likes.textContent = `Less`;
  button.textContent = "Details";
  let cardclick = document.createElement(`card`);
  cardclick.id = "cardClick";
  let animetext = document.createElement("p");
  animetext.id = "cardText";
  animetext.innerHTML = anime.synopsis;
  button.addEventListener(`click`, (e) => {
    e.preventDefault();
    cardclick.append(cardTitle, animetext, likes);
    card.append(cardclick);
    likes.addEventListener(`click`, (e) => {
      e.preventDefault(e), cardclick.remove();
      card.appendChild(cardTitle);
    });
  });
  divButton.append(episodes, button);
  card.append(animeImage, cardTitle, cardDetails, divButton);
  explelist.appendChild(card);
  card.addEventListener("mouseover", () => {
    card.style.color = "white";
    card.style.transform = "scale3d(1, 1, 1)";
    card.style.transition = "all 0.3s ease-in-out";
  });
  card.addEventListener("mouseout", () => {
    card.style.color = "black";
    card.style.transform = "scale3d(0.8, 0.8, 1)";
    card.style.transition = "all 0.3s ease-in-out";
  });
}
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let reviewList = document.getElementById("reviewList");
  let revTitle = document.createElement("h3");
  revTitle.id = "revTitle";
  revTitle.innerHTML = e.target.titleInput.value;
  let para = document.createElement("p");
  para.id = "para";
  para.innerHTML = e.target.textarea.value;
  reviewList.append(revTitle, para);
  form.reset();
});