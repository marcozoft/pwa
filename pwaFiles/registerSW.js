  window.onload = (e) => { 
		
	if ('serviceWorker' in navigator && 'PushManager' in window) {
		console.log('Service Worker and Push is supported');
		
		navigator.serviceWorker.register('./service-worker.js')
			.then(registration =>{	
				console.log('Service Worker is registered', registration);
				//swRegistration = registration;				
				//askPermission();		
			})
			.catch(function(error) {
				console.error('Service Worker Error', error);
			  });
	}		
	else{
		console.warn('Push messaging is not supported');		
	} 
	

	let deferredPrompt;
	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Show prompt modal if user previously not set to dismissed or accepted
		if(!statusPromptButtonInstall.get()) {
		// Change status prompt
		promptToggle(prompt, 'show', 'hide');
		}
	});

	// Add event click function for Cancel button
	buttonCancel.addEventListener('click', (e) => {
		// Change status prompt
		promptToggle(prompt, 'hide', 'show');
		// Set status prompt to dismissed
		statusPromptButtonInstall.set('dismissed');
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
				statusPromptButtonInstall.set('accepted');
			console.log('User accepted the A2HS prompt');
			} else {
			statusPrompt.set('dismissed');
			console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		});
	});

}