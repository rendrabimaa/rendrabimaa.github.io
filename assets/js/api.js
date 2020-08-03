const base_url = "https://api.football-data.org/v2/"

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': 'fc5592b69632466780b0b35e95e61fca'
        }
    })
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error" + response.status);

        return Promise.reject(new Error(response.statusText))
    } else {
        return Promise.resolve(response)
    }
}

function json(response) {
    return response.json()
}


function error(error) {
    console.log('Error:' + error);
}

function getClassement() {
    if ('caches' in window) {
        caches.match(base_url + 'competitions/2021/standings')
            .then(function (response) {
                if (response) {
                    response.json().then(data => domClassement(data))
                }
            })
    }


    fetchAPI(base_url + 'competitions/2021/standings')
        .then(status)
        .then(json)
        .then(data => domClassement(data))
}


function getTeams() {
    if ('caches' in window) {
        caches.match(base_url + 'competitions/2021/teams')
            .then(function (response) {
                if (response) {
                    response.json().then(data => domGetTeams(data))
                }
            })

    }

    fetchAPI(base_url + "competitions/2021/teams")
        .then(status)
        .then(json)
        .then(data => domGetTeams(data))

}


function getTeamById() {
    return new Promise(function (resolve, reject) {
        var urlParam = new URLSearchParams(window.location.search)
        var idParam = urlParam.get("id")


        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam)
                .then(response => {
                    if (response) {
                        response.json().then(data => {
                            domTeamById(data)
                            resolve(data)
                        })
                    }
                })

        }
        fetchAPI(base_url + "teams/" + idParam)
            .then(status)
            .then(json)
            .then(data => {
                domTeamById(data)
                resolve(data)
            })
    })
}

function getSavedClub() {
    getAll().then(clubs => domSavedTeams(clubs))
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission()
            .then(function (result) {
                if (result == "denied") {
                    console.log("Fitur tidak diijinkan")
                    return;
                } else if (result == "default") {
                    console.error("Pengguna menutup kotak dialog permintaan ijin")
                    return;
                }

                // navigator.serviceWorker.getRegistration().then(function (reg) {
                //     reg.showNotification("Notifikasi Diijinkan")
                // })

                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration()
                        .then(function (registration) {
                            registration.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array("BBPzhl5ViU8Coxrc6fGgvSoWcd0X9GoOe94H1ZcUb7uugmt64E2p4jhjcEjKwRxP4vfpbDARBv8LmPwV64_APlM")
                                })
                                .then(function (subscribe) {
                                    console.log('Berhasil melakukan subscribe dgn endpoint', subscribe.endpoint);
                                    console.log('berhasil mlakukan subscribe dgn p256dh key', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                                    console.log('berhasil mlakukan subscribe dgn auth key', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                                })
                                .catch(function (e) {
                                    console.error('tidak dapat melakukan subscribe', e.message)
                                })
                        })
                }
            })
    } else {
        console.error("Browser tidak mendukung notifikasi")
    }


    console.log("fitur diijinkan")

}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// function showNotification() {
//     const title = "Standings change"
//     const options = {
//         'body': "Check standings soon"
//     }

//     if (Notification.permission === 'granted') {
//         navigator.serviceWorker.ready.then(function (registration) {
//             registration.showNotification(title, options)
//         })
//     } else {
//         console.error("Fitur Notifikasi tidak diijinkan")
//     }
// }

// function getSavedClubById() {
//     var urlParams = new URLSearchParams(window.location.search)
//     var idParam = urlParams.get("id")

//     getById(idParam)
//         .then(function (article) {
//             console.log(article);
//             let articleHTML = ''
//             console.log(articleHTML)
//             article.forEach(e => {
//                 // console.log(e.position);
//                 // console.log(e.team.name);


//                 articleHTML += `

//                   <tr>
//                     <td>${e.name}</td>
//                     <td>${e.nationality}</td>
//                     <td>${e.position}</td>
//                     <td>${e.role}</td>                    
//                   </tr>
//                 `
//             });

//             articleHTML += `
//             </tbody>
//             </table>
//             `
//         })

//     // document.getElementById("body-content").innerHTML = articleHTML
// }