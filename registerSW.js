
const publickey = 'BFzWsQGVxUb3GADJj2C5XNa2hoqPZWKVaz3TptLePhYcOaDqBmIDg7sKP-BV9aJiTnI9MN5y_4jatNgbxOV6jfM';
const privatekey = '_NfFstemBF2_2ByyIS19IKoNYCELmbF8wPz4buDtRQY';


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

  function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	  .replace(/\-/g, '+')
	  .replace(/_/g, '/');
  
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
  
	for (let i = 0; i < rawData.length; ++i) {
	  outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
  }

  
  function subscribeUser() {
	const applicationServerKey = urlB64ToUint8Array(publickey);
	swRegistration.pushManager.subscribe({
	  userVisibleOnly: true,
	  applicationServerKey: applicationServerKey
	})
	.then(function(subscription) {
	  console.log('User is subscribed.');
	  console.log('subscription dor updateSubscriptionsONServer',subscription);
	  updateSubscriptionOnServer(subscription);
	})
	.catch(function(err) {
	  console.log('Failed to subscribe the user: ', err);
	  
	});
  }

  function updateSubscriptionOnServer(subscription) {
	// TODO: Send subscription to application server
	if (subscription) {
	  const key = subscription.getKey('p256dh');
	  const token = subscription.getKey('auth');
  
	  fetch('suscriptionInDB.php', {
			method: 'post',
		headers: new Headers({
		  'Content-Type': 'application/json'
		}),
			body: JSON.stringify({
		  endpoint: subscription.endpoint,
		  key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : null,
		  token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : null,
		  axn: 'subscribe'
		})
		}).then(function(response) {
			return response.text();
		}).then(function(response) {
			console.log(response);
		}).catch(function(err) {
			// Error :(
			console.log('error');
		});
	} else {
	  //subscriptionDetails.classList.add('is-invisible');
	}
  }


window.onload = (e) => { 

	if ('serviceWorker' in navigator && 'PushManager' in window) {
		console.log('Service Worker and Push is supported');
		navigator.serviceWorker.register('./sw.js')
			.then(registration =>{	
				console.log('Service Worker is registered', registration);
				swRegistration = registration;
				subscribeUser();
			})
			.catch(function(error) {
				console.error('Service Worker Error', error);
			  });
	}		
	else{
		console.warn('Push messaging is not supported');		
	}

	askPermission()
		.then(reg =>console.log('Permiso de notificacion concedido', reg))
		.catch(err => console.warn('Permiso de notificacion denegado', err))




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


const buttonPush = document.querySelector('#buttonPush');
buttonPush.addEventListener('click', () =>
    navigator.serviceWorker.ready
    .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
    .then(subscription => {
        if (!subscription) {
            alert('Please enable push notifications');
            return;
        }
        
        const key = subscription.getKey('p256dh');
        const token = subscription.getKey('auth');     
        fetch('send_push_notification.php', {
            method: 'POST',
            body: JSON.stringify({
                endpoint: subscription.endpoint,
                key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : null,
                token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : null
            })
        }).then(function(response) {return response.text();
        }).then(function(response) { console.log(response);});
    })
  );