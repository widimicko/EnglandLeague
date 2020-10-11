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
    "endpoint": " https://fcm.googleapis.com/fcm/send/dOA0IkT7IGQ:APA91bGZqh6vzvmsqQGmr33FmBYE1UUJIVYKwEVNSXy0zaJ7qX14_0oFotTFlzUrv0d7AYqfbM6uK5GsoLlBNsa0g8PmD3fbB9V00NsYAf4dmwFW7ENMP0hhHEeGhSmw_5XYH8xoyu_a",
    "keys": {
        "p256dh": "BIH8EJ5h7wBaAXGUu9R9trHmBIYUFGjQwNsCYNZi4Sv7BcCt5ihAlLszvsqMgvW10aODoYDTJdiqAgJmy6u++zI=",
        "auth": "cZBSwqB9M5ee0poxrnz4sQ=="
    }
};
let payload = 'Hello! Enjoy this notification!';
let options = {
    gcmAPIKey: '28450369778',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
  
);