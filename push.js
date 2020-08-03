var webPush = require('web-push')

const vapidKeys = {
    "publicKey": "BBPzhl5ViU8Coxrc6fGgvSoWcd0X9GoOe94H1ZcUb7uugmt64E2p4jhjcEjKwRxP4vfpbDARBv8LmPwV64_APlM",
    "privateKey": "Y7OA1HsVBNnA9886ScGnlbduiczUGVYQseMPUwSv2UI"
}

webPush.setVapidDetails(
    'mailto:example@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ddaj54cJYuU:APA91bFedHnEvKwtSNx1TZubRbKrt5M3YoNzXTsEOpDVDgqIWTiCYGEvZhpg1wxMSMO2i0Q3B8VSbxiPi01hz3YqqCzuyz2r2qV19pAS4THZ0CFBQAF1OFFk2ODaS3nz_KZM8o8HlIwq",
    "keys": {
        "p256dh": "BIZ6VRkBOshImnQBZ6l2CLk2us/0Ai01JHYududXxzOwOtmW8gFQaICck+H7CwqaxdX+NawVtJA7yhl9IWl5E7Q=",
        "auth": "qbek0sqeuG0nmfAVWNY2Zg=="
    }
}

var payload = "Selamat aplikasi sudah dapat menerima push notifikasi"

var options = {
    gcmAPIKey: "914038154241",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)