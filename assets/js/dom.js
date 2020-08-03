const domClassement = data => {
    const classement = data.standings[0].table
    let tableClassement = `
            <h4>Premiere League Classement</h4>

            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Clubs</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>Pts</th>
                    </tr>
                </thead>

                <tbody>
            `

    classement.forEach(e => {

        tableClassement += `
            <tr>
                <td>${e.position}</td>
                <td>${e.team.name}</td>
                <td>${e.playedGames}</td>
                <td>${e.won}</td>
                <td>${e.draw}</td>
                <td>${e.lost}</td>
                <td>${e.points}</td>

            </tr>
            `
    });

    tableClassement += `
                </tbody>
            </table>
            `

    setTimeout(function () {
        document.querySelector(".preloader-wrapper").style.display = "none";
    }, 1500);

    document.getElementById('classement').innerHTML = tableClassement
}


const domGetTeams = data => {

    const teams = data.teams

    let dataTeams = `
        <h4>Club List</h4>
        `

    teams.forEach(function (e) {

        dataTeams += `
            <div class="col s6 m3">
                <a href="./assets/component/clubById.html?id=${e.id}" class="grey-text text-darken-4 cardHover">
                <div class="card clubCards">
                    <div class="card-image">
                        <img src="${e.crestUrl}" height="150px" alt="Logo ${e.shortName}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator center text-cards">${e.shortName}</span>
                    </div>
                </div>
                </a>
            </div>
            `
    })

    setTimeout(function () {
        document.querySelector(".preloader-wrapper").style.display = "none";
    }, 1500);


    document.getElementById('teams').innerHTML = dataTeams


}

const domTeamById = data => {
    let tableTeam = `
                        <h4 class="center">${data.name} Squad </h4>
        
                        <table class="striped responsive-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Nationality</th>
                                <th>Role</th>
                            </tr>
                            </thead>
                    
                            <tbody>
                        `
    data.squad.forEach(e => {


        tableTeam += `
                        
                          <tr>
                            <td>${e.name}</td>
                            <td>${e.nationality}</td>
                            <td>${e.position}</td>
                            <td>${e.role}</td>                    
                          </tr>
                        `
    });

    tableTeam += `
                    </tbody>
                      </table>
                    `

    setTimeout(function () {
        document.querySelector(".preloader-wrapper").style.display = "none";
    }, 1500);

    document.getElementById("body-content").innerHTML = tableTeam

}


const domSavedTeams = clubs => {

    let savedTeams = ""
    clubs.forEach(function (e) {
        // var description = e.post_content.substring(0, 100)
        savedTeams += `
                <div class="col s6 m3">
                <a href="./assets/component/clubById.html?id=${e.id}" class="grey-text text-darken-4 cardHover">
                    <div class="card clubCards">
                    <div class="card-image">
                        <img src="${e.crestUrl}" height="150px" alt="Logo ${e.shortName}">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator center text-cards">${e.shortName}</span>
                        </div>
                    </div>
                    </a>
                </div>
            `
    })


    setTimeout(function () {
        document.querySelector(".preloader-wrapper").style.display = "none";
    }, 1500);


    document.getElementById("favorite").innerHTML = savedTeams
}