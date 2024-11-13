// script.js
let h2 = document.querySelector('h2');
let map;

function sucess(position) {
    h2.textContent = `Latitude:${position.coords.latitude}, Longitude:${position.coords.longitude}`;

    if (map === undefined) {
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup('Eu estou aqui')
        .openPopup();
}

function error(erro) {
    console.log(erro);
}

function locate() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(sucess, error, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    } else {
        h2.textContent = 'Geolocalização não é suportada pelo seu navegador.';
    }
}
