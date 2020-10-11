let dbPromise = idb.open('Football League', 4, (upgradeDB) => {
	if (!upgradeDB.objectStoreNames.contains('teamFav')) {
		const teamStore = upgradeDB.createObjectStore('teamFav', {
			keyPath: 'id',
			autoIncrement: false,
		});
		teamStore.createIndex('id', 'id', {
			unique: true,
		});
	}
});


function addTeamFav(data) {
	dbPromise.then((db) => {
		const tx = db.transaction('teamFav', 'readwrite');
		tx.objectStore('teamFav').put(data);
		return tx.complete;
	});
}


function getAllTeamFav() {
	return dbPromise.then((db) => {
		const tx = db.transaction('teamFav', 'readonly');
		const store = tx.objectStore('teamFav');
		return store.getAll();
	});
}


function isFav(id) {
	return dbPromise.then(async (db) => {
		const tx = await db.transaction('teamFav', 'readonly');
		const data = await tx.objectStore('teamFav').get(id);
		return data == undefined ? false : true;
	});
}


function deleteTeamFav(id) {
	dbPromise.then((db) => {
		const tx = db.transaction('teamFav', 'readwrite');
		tx.objectStore('teamFav').delete(id);
		return tx.complete;
	});
}

function showFavTeam() {
	getAllTeamFav().then((favs) => {
		let data = '';
		let data2 = '';

		// looping data dari database
		favs.forEach((favs) => {
			data2 += `
						<tr>
							<td><img src="${favs.crestUrl.replace(/^http:\/\//i, 'https://')}" width="35px" alt="badge"/></td>
							<td><a class="saved" href="#team?id=${favs.id}">${favs.name}</a></td>
						</tr>
			`;
		});

		data += `<div class="card favourite-team"> <table border="1"> 
        ${data2 === '' ? '<p>Tidak Ada Tim Favorit</p>' : data2} 
			 
			</table> </div>`;

		document.getElementById('favourite').innerHTML = data;

		document.querySelectorAll('.saved').forEach((link) => {
			link.addEventListener('click', (event) => {
				// mengambil nilai id lalu dimasukkan ke variabel urlTeam Param
				urlTeamParam = event.target.getAttribute('href').substr(9);
				// Muat konten halaman yang dipanggil
				loadPage();
			});
		});
	});
}