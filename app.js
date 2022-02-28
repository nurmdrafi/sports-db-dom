const loadPlayers = () => {
  const searchField = document.getElementById("search-box");
  const searchText = searchField.value;
  searchField.value = "";
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayers(data.player));
};

const displayPlayers = (players) => {
    const playersContainer = document.getElementById("players-container");
    playersContainer.textContent = "";
  for (const player of players) {
    const {
      idPlayer,
      strPlayer,
      strNationality,
      strHeight,
      strThumb,
      strDescriptionEN,
    } = player;

    // players container
    // const playersContainer = document.getElementById("players-container");
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="col">
                    <div class="card">
                        <img src="${strThumb}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body text-center">
                            <h3 class="card-title">Name: ${strPlayer}</h3>
                            <h4>Country: ${strNationality}</h4>
                            <h5>${strHeight}</h5>
                            <p class="card-text">${strDescriptionEN.slice(
                              1,
                              200
                            )}</p>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#player-details"  onclick="loadPlayerDetails('${idPlayer}')">Details</a>
                        </div>       
                    </div>
                </div>
        `;
    playersContainer.appendChild(div);

  }
};

// Load Player Details
const loadPlayerDetails = (idPlayer) => {
  const playerDetailsUrl = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`;
  fetch(playerDetailsUrl)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => showPlayerDetails(data.players[0]));
};

// Show Player Details
const showPlayerDetails = (data) => {
  const details = document.getElementById("details");
  const playerDetails = document.createElement("div");
  playerDetails.innerHTML = `
    <h1>${data.strPlayer}</h1>
    <h2>${data.strNationality}</h2>
`;
  details.appendChild(playerDetails);
};

// Clear Player Details

const clearPlayerDetails = () =>{
    const details = document.getElementById("details");
    details.textContent = "";
}