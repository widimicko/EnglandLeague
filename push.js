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
    "endpoint": "https://fcm.googleapis.com/fcm/send/fa5SoTkxi9w:APA91bGIsQdfNWGBBKvz6BErJtWEQ15S0AMDFn_4tiOn2RYc4P_JmybVOd6mKE-8lgaYm_RPPAw9keITrNEsbO8BFx6vwNA06mU1ODYHcEzTuD2h94BgaCxW_MwqlmqpNKQiuOlM-FjJ",
    "keys": {
        "p256dh": "BApF/QzOUkJJUG4J7l/fc0kbF953xgtQ6vxqE7CDNdzaLG3A92clm0SCZ9ghmOlrz2nnr/qE5qsvNhoBgaJo9so=",
        "auth": "tHO2p2yHjFDKhiWMBPAkAA=="
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