// Periksa fitur Notification API
if ('Notification' in window) {
	requestPermission();
} else {
	console.error('Browser does not Support.');
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
	Notification.requestPermission().then((result) => {
		if (result === 'denied') {
			console.log('Notification Granter.');
			return;
		} else if (result === 'default') {
			console.error('User close the request dialog.');
			return;
		}

		console.log('Notifocation Granted.');
	});
}

navigator.serviceWorker.ready.then(() => {
	if ('PushManager' in window) {
		navigator.serviceWorker.getRegistration().then((registration) => {
			registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(
					'BI1niyp5J3kuKie_yE2chOE4-R_blH9jzJEfe08x1hWJF-Rj4US_f0ARb8wY_S4dbsFYxTbXQkzJ_Z2dGQYi69A'
				),
			}).then((subscribe) => {
				console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
				console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
					null, new Uint8Array(subscribe.getKey('p256dh')))));
				console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
					null, new Uint8Array(subscribe.getKey('auth')))));
			}).catch(function(e) {
				console.error('Tidak dapat melakukan subscribe ', e.message);
			});
		});

		function urlBase64ToUint8Array(base64String) {
			const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
			const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
			const rawData = window.atob(base64);
			const outputArray = new Uint8Array(rawData.length);
			for (let i = 0; i < rawData.length; ++i) {
				outputArray[i] = rawData.charCodeAt(i);
			}
			return outputArray;
		}
	}
});