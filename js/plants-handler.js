document.addEventListener(
  "input",
  function (event) {
    if (event.target.id !== "pets") return;

    const sun = document.getElementById("sun").value;
    const water = document.getElementById("water").value;
    const pets = document.getElementById("pets").value;

    const extraParams = {
      sun: sun,
      water: water,
      pets: pets,
    };

    const URL =
      "https://front-br-challenges.web.app/api/v2/green-thumb/?" +
      new URLSearchParams(extraParams).toString();

    fetch(URL)
      .then(function (response) {
        return response.json(); // successful api call :)
      })
      .then(function (data) {
        showPlants(data);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
      });
  },
  false
);

function showPlants(plants) {
  const cardsHTML = document.getElementById("cards");
  const noResultsDiv = document.getElementById("no-results");
  const picksDiv = document.getElementById("picks");

  noResultsDiv.classList.add("hidden");
  picksDiv.classList.remove("hidden");

  plants.map((plant) => {
    let sun, water;
    const name = plant.name;
    const price = plant.price;
    const picture = plant.url;
    const staff_favorite = plant.staff_favorite;
    const pet = plant.toxicity === true ? "toxic.svg" : "pet.svg";

    switch (plant.sun) {
      case "no":
        sun = "no-sun.svg";
      case "low":
        sun = "low-sun.svg";
      default:
        sun = "";
    }

    switch (plant.water) {
      case "regularly":
        water = "3-drops.svg";
      case "daily":
        water = "2-drops.svg";
      default:
        water = "1-drops.svg";
    }

    const card = `
      <div class="picks__card">
        <img
          src="${picture}"
          alt="Greenthumb"
          class="picks__plant"
        />
        <div class="picks__data">
          <h3>${name}</h3>
          <div class="picks__info">
            <h3 style="margin: 0">$${price}</h3>
            <div class="picks__icons">
              <img
                src="images/icons/${pet}"
                alt="Greenthumb"
                class="picks__icon"
              />
              <img
                src="images/icons/${sun}"
                alt="Greenthumb"
                class="picks__icon"
              />
              <img
                src="images/icons/${water}"
                alt="Greenthumb"
                class="picks__icon"
              />
            </div>
          </div>
        </div>
      </div>
  `;

    cardsHTML.insertAdjacentHTML("beforeend", card);
  });
}
