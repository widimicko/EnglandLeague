//Update

let webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BI1niyp5J3kuKie_yE2chOE4-R_blH9jzJEfe08x1hWJF-Rj4US_f0ARb8wY_S4dbsFYxTbXQkzJ_Z2dGQYi69A",
    "privateKey": "lXH_331E2Q5omNRyLjeY8wqONf1ny5z7Cquhex1XQBg"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dzs5dYDAwA8:APA91bE9hBU-Y2cOZzuLArDkRCgyUIjKRGgyyxy-ir5nwe9CyZyMxushNcCB4GFS5W7GlP41NuBADqj_U6gHn1aIt8vqpK3oXM_5BmHddYkOxPAFvyCnO2Kzfevzz9ScN9EF2I0pvVI5",
    "keys": {
        "p256dh": "BIhBtws/oKHh27Pxg36b6nUauWGOHukADE172fq95BR64EYi79TbnQ57sJ6RYkE16O/9sBPsC01Nt8f1AS3kidk=",
        "auth": "1DZhLOP5oNOkZsQZzXO1kA=="
    }
};
let payload = 'Hello! Its from EnglandLeague platform, just enjoy this notification!';
let options = {
    gcmAPIKey: '28450369778',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
  
);