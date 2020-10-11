
const API_KEY = '3233740e8ce14e6c8a38516c6a09157a';
const BASE_URL = 'https://api.football-data.org/v2/';

const Endpoint_Eng = `${BASE_URL}competitions/2021/standings`;

const fetchAPI = (url) => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY,
        },
    })
        .then((res) => {
            if (res.status !== 200) {
                console.log(`Error: ${res.status}`);
                return Promise.reject(new Error(res.statusText));
            } else {
                return Promise.resolve(res);
            }
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
};

function getStandings() {
    if ('caches' in window) {
        caches.match(Endpoint_Eng).then((response) => {
            if (response) {
                response.json().then((data) => {
                    console.log(`Competition Data: ${data}`);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(Endpoint_Eng)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showStanding(data) {
    let standingsData = '';
    const standingElement = document.getElementById('standings');

    // looping data standings
    data.standings[0].table.forEach((standing) => {

        standingsData += `                 
                  <tr>
                    <td>
                        <img class="badge" src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Team Logo" width="45px" height="45px"/>
                    </td>
                    <td><a class="teamId" href="#team?id=${standing.team.id}">${standing.team.name}</a></td>
                    <td>${standing.position}</td>
                    <td>${standing.points}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                  </tr>
        `;
    });

    standingElement.innerHTML = `
  
	                            <div class="card standing-header">
	                                <div class="standing-title" >
                                        <p class="standing-name">${data.competition.name}</p>
                                        <table>
                                            <tr>
                                                <td>
                                                    <p class="standing-date">${data.season.startDate} - ${data.season.endDate}</a>
                                                </td>
                                                <td>
                                                    ${data.competition.area.name}
                                                </td> 
                                            <tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="card standing-table" >
                                    <table class="responsive-table striped" >
                                        <tr>
                                            <th>Badge</th> 
                                            <th>Team Name</th>
                                            <th>Position</th>
                                            <th>Point</th>
                                            <th>Win</th>
                                            <th>Draw</th>
                                            <th>Lose</th>
                                            <th>GF</th>
                                            <th>GA</th>
                                            <th>GD</th>
                                        </tr>
                                            ${standingsData}
                                    </table>
                                </div>
	`;
    document.querySelectorAll('.teamId').forEach((link) => {
        link.addEventListener('click', (event) => {
            urlTeamParam = event.target.getAttribute('href').substr(9);
            loadPage();
        });
    });
}


function getTeam(id) {
    const url = `${BASE_URL}teams/${id}`;

    if ('caches' in window) {
        caches.match(url).then((response) => {
            if (response) {
                response.json().then((team) => {
                    showTeam(team);
                });
            }
        });
    }

    fetchAPI(url)
        .then((team) => {
            showTeam(team);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showTeam(team) {
    const teamElement = document.getElementById('team');

    let playerContent = '';
    // Looping data team
    team.squad.forEach((player) => {
        playerContent += `
                    <ul class="card">
                        <li>
		                    <div class="player-name">${player.name}</div>
			                    <ul class="collection">
				                    <li class="collection-item">Position : ${player.position}</li>
				                    <li class="collection-item">Country of Birth : ${player.countryOfBirth}</li>
				                    <li class="collection-item">Nationality : ${player.nationality}</li>
				                    <li class="collection-item">Shirt Number : 
                                        ${player.shirtNumber == null ? 'Tidak Diketahui' : player.shirtNumber}
                                    </li>
				                    <li class="collection-item">Role : ${player.role}</li>
			                    </ul>
		
	                        </div>
	                    </li>
                    </ul>
        `;
    });

    teamElement.innerHTML = `
	                    <div class="card">
                            <div class="team-information">
                                <center><h4>Team Information</h4></center>
                            </div>
	                        <div class="card-image">
		                        <img class="logo-team" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Team Logo" />
	                            <a class="btn-floating halfway-fab waves-effect waves-light blue" id="saveOrDelete" href=${team.id} >
                                  <i class="material-icons" id="saveOrDeleteIcon">save</i>
                                </a>
                            </div>
	                        <div class="card-content">
		                        <p>${team.name} (${team.shortName}) is a football club that is located at ${
        team.address
        }. The club was founded in <strong>${
        team.founded === null ? 'unidentified' : team.founded
        }</strong> and has a distinctive color ${team.clubColors}</p>
                            </div>
	                    </div>
	                    <span class="team-member"><p>Team Member</p></span>
                        ${playerContent}
    `;

    async function saveOrDeleteChange() {
        if (await isFav(parseInt(window.location.hash.substr(9)))) {
            saveOrDeleteIcon.innerHTML = 'delete';
        }
    }

    saveOrDeleteChange();

    $('#saveOrDelete').on('click', async (e) => {
        e.preventDefault();
        // mendapatkan id team dari nilai href
        const teamId = parseInt(e.currentTarget.getAttribute('href'));

        if (await isFav(teamId)) {
            deleteTeamFav(teamId);
            saveOrDeleteIcon.innerHTML = 'save';
            M.toast({ html: `${team.name} Has been deleted from favourite team` });
        } else {
            M.toast({ html: `${team.name} Has been Added to favourite Team` });
            saveOrDeleteIcon.innerHTML = 'delete';
            addTeamFav(team);
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log(`Error : ${error}`);
}


function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange =function () {
        if (this.readyState === 4) {
            let content = document.querySelector("#body-content");

            if (page === "home") {
                getStandings();
            } else if (page === "favourite") {
                showFavTeam();
            } else if (urlTeamParam.length > 0) {
                getTeam(urlTeamParam);
            }


            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
            urlTeamParam = '';
        }
    };

    if (urlTeamParam.length > 0) {
        xhttp.open('GET', '/pages/team.html');
        xhttp.send();
        return;
    }

    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
}