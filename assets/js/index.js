        //register ServiceWorker
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker
                    .register("/sw.js")
                    .then(function () {
                        console.log('Pendaftaran service Worker Berhasil');
                        requestPermission()
                    }).catch(function () {
                        console.log('Pendaftaran gagal');
                    })
            })
        } else {
            console.log('Service Worker belum didukung');
        }



        document.addEventListener('DOMContentLoaded', () => getClassement())