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
    "endpoint": "https://fcm.googleapis.com/fcm/send/drvlr88F-xw:APA91bEx87LiQgdww3__PT69csHs-GJNIxphsiK-jD3IFa-38QJv_x5Xq_BHrDiUly-4SwuaaOmtaPrcmKzM29vc50l_BR44fOXyJwNpBFZDwjgHTAIc56NJv1ieNTgiLR_NFVH2JrEF",
    "keys": {
        "p256dh": "BI4tMKnAez8VHT4JFlJqSJz4DZQjy/ki+ziqFHAEndszvw9r7yI0nhUzkCQAcct92V0L6vuzZhBhDITZKQ0Not0=",
        "auth": "SuD9JGiPHisISd34v19whA=="
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