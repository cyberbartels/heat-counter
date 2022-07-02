let set_home_button = document.getElementById("set-home");
let set_here_button = document.getElementById("set-here");
let home_panel = document.getElementById("home");
let here_panel = document.getElementById("here");
let dist_panel = document.getElementById("dist");
let home_long = 0;
let home_lat = 0;
let here_long = 0;
let here_lat = 0;

set_home_button.addEventListener('click', function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(showHome);
    } else {
        home_panel.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
    }
});

set_here_button.addEventListener('click', async function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(showHere);
    } else {
        here_panel.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
    }
});

function showHome(position) {
    home_lat = position.coords.latitude;
    home_long = position.coords.longitude
    home_panel.innerHTML = "lat: " + home_lat + " | long: " + home_long ;
}

function showHere(position) {
    here_lat = position.coords.latitude;
    here_long = position.coords.longitude
    here_panel.innerHTML = "lat: " + here_lat + " | long: " + here_long ;
    dist_panel.innerHTML = "dist: " + cosineDistanceBetweenPoints(home_lat, home_long, here_lat, here_long)
}

function cosineDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const p1 = lat1 * Math.PI/180;
    const p2 = lat2 * Math.PI/180;
    const deltaP = p2 - p1;
    const deltaLon = lon2 - lon1;
    const deltaLambda = (deltaLon * Math.PI) / 180;
    const a = Math.sin(deltaP/2) * Math.sin(deltaP/2) +
              Math.cos(p1) * Math.cos(p2) *
              Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * R;
    return d;
  }