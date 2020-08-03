if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("../../sw.js")
            .then(() => console.log('Pendaftaran Service Worker Berhasil'))
            .catch(() => console.log('Pendaftaran Service Worker Gagal'))
    })
} else {
    console.log("Service Worker Belum didukung");
}

document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search)
    var isFromSaved = Number(urlParams.get("saved"));
    var forDelete = Number(urlParams.get("id"));


    var save = document.getElementById("btnSave")
    var remove = document.getElementById("btnDelete")
    var item = getTeamById();

    if (isFromSaved) {
        save.style.display = 'none'
        getSavedClub()
    } else if (!isFromSaved) {
        remove.style.display = 'none'
    } else {
        var item = getTeamById();
    }

    getById(forDelete).then((msg) => {
        save.style.display = "none";
        remove.style.display = "block";
    }).catch((msg) => {
        save.style.display = "block";
        remove.style.display = "none";
    });

    save.onclick = function () {
        console.log('Tombol Fab di klik');
        item.then(function (article) {
            saveClub(article)
        });
        save.style.display = "none";
        remove.style.display = "block";
    }

    remove.onclick = function () {
        console.log('Tombol Delete di klik');
        deleteClub(forDelete);
        save.style.display = "block";
        remove.style.display = "none";
    }

})