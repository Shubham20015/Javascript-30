const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((jsonData) => jsonData.json())
  .then((data) => cities.push(...data)); // Here we spread operator(...) to push data array as it is in cities array

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatch() {
  const matchArray = findMatches(this.value, cities);
  const body = matchArray
    .map((place) => {
      // for highlighting word user type in finding name
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      // here these lines end and we use these variables in below statements
      return `
        <li>
        <span class="name">${cityName}, ${stateName}<span>
        <span class="population">${numberWithCommas(place.population)}<span>
        </li>
      `;
    })
    .join("");

  suggestions.innerHTML = body;
}

searchInput.addEventListener("change", displayMatch);
searchInput.addEventListener("keyup", displayMatch);
