/* 
\\ Important Notes //
1. For checking purpose use html value="something" attribute ✔ [optional]
2. Clear input value >>> input.value = ""; ✔
3. Clear previous HTML content >>> parentElement.textContent = ""; ✔
4. Get id of each result from fetch data and pass to new fetch url where get data by id 
    >>> <button onclick="function('${id}')"></button> [id must be string][follow quotation syntax] ✔
5. img.src == "null" replaced ✔ [few null images are not replaced]
6. full length data not showing on display [working...][✔ text-ellipsis][❌ slice()]
7. handle spinner, search result, when passing data after fetch ✔
    >>> if result == null
        >>> spinner.style.display = "block";
            resultBody.style.display = "block";
            result.innerText = 'No';
8. use visibility hidden playersContainer ✔ [❌ display: block (break layout)]
*/

// Global Variables
const playersContainer = document.getElementById("players-container");
const resultBody = document.getElementById('result-body');
const result = document.getElementById("result-count");

// Load Players Data from API
const loadPlayers = () => {
  const searchField = document.getElementById("search-box");
  const searchText = searchField.value;
  searchField.value = ""; // clear search input
  const spinner = document.getElementById("spinner");

  // initial display visibility
  spinner.style.display = "block";
  playersContainer.style.visibility = "hidden";
  resultBody.style.display = "none";

  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.player === null) {
        spinner.style.display = "block";
        resultBody.style.display = "block";
        result.innerText = 'No';
      } else {
        spinner.style.display = "none";
        playersContainer.style.visibility = "visible";
        displayPlayers(data.player);
        resultBody.style.display = "block";
        result.innerText = `${data.player.length}`
      }
    })
    .catch((error) => console.log(error));
};

// Display Players Card
const displayPlayers = (players) => {
  playersContainer.textContent = ""; // clear previous content
  
  for (const player of players) {
    const {
      idPlayer,
      strPlayer,
      strGender,
      strNationality,
      strThumb,
      strDescriptionEN,
    } = player;
    console.log(strThumb);

    // Create New Element Based on Search Result
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="col">
                    <div class="card h-100">
                        <img src="${strThumb}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body text-center">
                            <h3 class="card-title">Name: ${strPlayer}</h3>
                            <h4>Country: ${strNationality}</h4>
                            <h5>${strGender}</h5>
                            <p class="card-text text-ellipsis">${strDescriptionEN}</p>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#player-details"  onclick="loadPlayerDetails('${idPlayer}')">Details</a>
                        </div>       
                    </div>
                </div>
        `;
    // Replace images if null
    const images = document.getElementsByTagName("img");
    for (const img of images) {
      const src = img.getAttribute("src");
      if (src === "null" && strGender === "Male") {
        img.src = "img/placeholder-male.jpg";
      } else if (src === "null" && strGender === "Female") {
        img.src = "img/placeholder-female.jpg";
      }
    }
    playersContainer.appendChild(div);
  }
};

// Load Player Details
const loadPlayerDetails = (idPlayer) => {
  // "idPlayer" parameter received from Details button
  const playerDetailsUrl = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`;
  fetch(playerDetailsUrl)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => showPlayerDetails(data.players[0]));
};

// Show Player Details
const showPlayerDetails = (info) => {
  const details = document.getElementById("details");
  const playerDetails = document.createElement("div");
  playerDetails.innerHTML = `
    <h1>${info.strPlayer}</h1>
    <h2>${info.strNationality}</h2>
`;
  details.appendChild(playerDetails);
};

// Clear Button Player Details
const clearPlayerDetails = () => {
  const details = document.getElementById("details");
  details.textContent = "";
};
