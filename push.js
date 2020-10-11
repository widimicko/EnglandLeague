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
    "endpoint": "https://fcm.googleapis.com/fcm/send/cjqIfWTALbU:APA91bHJRdWxSsBi7dTLiKVyBFN9wELFFJUXt_93ks-fXt_jJ2FNfzH1-FvJVn8kp04WdORLCX5j87YGWO1b2rq-mWI_i1ls4tmzPtfYC-qcPISNRBHagp__8dtEsBqQCBdL-ELdZV5a",
    "keys": {
        "p256dh": "BHG9UCe7BRLiS02GneUdV+mzqB/qHyKZO+2Py2qZcmLIIr3IoZxL/nQGjMLDCLfOJAJz84mIzIJdP/05PT6cT/c=",
        "auth": "3Zu+tE/00YNZFVyMJEXuIA=="
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