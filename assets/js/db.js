var dbPromised = idb.open("club", 1, function (upgradeDb) {
    var articleObjectStore = upgradeDb.createObjectStore("clubs", {
        keyPath: "id"
    })

    articleObjectStore.createIndex("post_title", "post_title", {
        unique: false
    })
})

function saveClub(club) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("clubs", "readwrite")
            var store = tx.objectStore("clubs")
            store.put(club)
            M.toast({
                html: `${club.name} ditambahkan ke Favorit`
            })
            return tx.complete
        })
        .catch(function () {
            M.toast({
                html: `team gagal ditambahkan ke favorit`
            })
        })
}

function deleteClub(clubs) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction('clubs', 'readwrite');
            let store = tx.objectStore('clubs');
            store.delete(clubs);
            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: `Tim dihapus dari Favorit.`
            });

        }).catch(function () {
            M.toast({
                html: 'Tim gagal dihapus!'
            });
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("clubs", "readonly")
                var store = tx.objectStore("clubs")

                return store.getAll()
            })
            .then(function (clubs) {

                resolve(clubs)
            })
    })
}


function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("clubs", "readonly")
                var store = tx.objectStore("clubs")

                // console.log(`id parameter = ${id}`)

                // console.log(store.get(57))
                return store.get(id);
            })
            .then(function (saved) {
                if (saved != undefined) {
                    resolve(true)
                }
            })
    })
}