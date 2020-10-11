document.addEventListener("DOMContentLoaded", () => {

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    

    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                    elm.addEventListener("click", (event) => {

                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }


    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        let urlTeamParam = window.location.hash.substr(9);
        xhttp.onreadystatechange = function () {
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
        else {
		    xhttp.open('GET', `/pages/${page}.html`);
		    xhttp.send();
	    }
    }
    loadPage(page);
});