// Declare general function to change status prompt
const promptToggle = (element, toAdd, toRemove) => {
	element.classList.add(toAdd);
	element.classList.remove(toRemove);
};  

// Declare general function to get or set status into storage
const statusPrompt = {
	get: () => {
		return localStorage.getItem('statusPrompt') || null;
	},
	set: (status) => {
		localStorage.setItem('statusPrompt', status);
		return;
	}
}

//Request user permission to notification
function askPermission() {
	return new Promise(function(resolve, reject) {
	  const permissionResult = Notification.requestPermission(function(result) {
		resolve(result);
	  });
  
	  if (permissionResult) {
		permissionResult.then(resolve, reject);
	  }
	})
	.then(function(permissionResult) {
	  if (permissionResult !== 'granted') {
		throw new Error('We weren\'t granted permission.');
	  }
	});
  }

window.onload = (e) => { 

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js')
			.then(reg => {
				console.log('Registro de SW exitoso', reg);
				askPermission()})
			.catch(err => console.warn('Error al tratar de registrar el sw', err))
	}

	const prompt = document.querySelector('#prompt');
	const buttonAdd = document.querySelector('#buttonAdd');
	const buttonCancel = document.querySelector('#buttonCancel');

	let deferredPrompt;
	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Show prompt modal if user previously not set to dismissed or accepted
		if(!statusPrompt.get()) {
		// Change status prompt
		promptToggle(prompt, 'show', 'hide');
		}
	});

	// Add event click function for Cancel button
	buttonCancel.addEventListener('click', (e) => {
		// Change status prompt
		promptToggle(prompt, 'hide', 'show');
		// Set status prompt to dismissed
		statusPrompt.set('dismissed');
	});

	// Add event click function for Add button
	buttonAdd.addEventListener('click', (e) => {
		// Change status prompt
		promptToggle(prompt, 'hide', 'show');
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice
		.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
			statusPrompt.set('accepted');
			console.log('User accepted the A2HS prompt');
			} else {
			statusPrompt.set('dismissed');
			console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		});
	});

	

}