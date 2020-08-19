const publickey = 'BFzWsQGVxUb3GADJj2C5XNa2hoqPZWKVaz3TptLePhYcOaDqBmIDg7sKP-BV9aJiTnI9MN5y_4jatNgbxOV6jfM';
const urlToSendSubscriptionOnServer= "https://damp-reaches-41240.herokuapp.com/api/pwa/endpoint/save";

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
	  console.log('subscription for updateSubscriptionsONServer',JSON.stringify(subscription));
	  updateSubscriptionOnServer(subscription);
	})
	.catch(function(err) {
	  console.log('Failed to subscribe the user: ', err);
	  
	});
  }

  function updateSubscriptionOnServer(subscription) {
	// TODO: Send subscription to application server
	if (subscription) {	  
  
	  fetch(urlToSendSubscriptionOnServer, {
			method: 'post',
            headers: new Headers({
            'Content-Type': 'application/json'
            }),
			body: JSON.stringify(subscription)
        }).then(function(response) {
			console.log("response server: ",response)
            if (!response.ok) {
              throw new Error('Bad status code from server.');
            }
        
            return response.json();
          })
          .then(function(responseData) {
			  console.log(responseData);
            if (!(responseData.success)) {
              throw new Error('Bad response from server.');
            }
		  });
	} 
  }

//Request user permission to notification
function askPermission() {
	if(Notification.permission!='granted'){
		
		Notification.requestPermission().
		then((permission)=>{ 
			if(permission === 'granted'){
				subscribeUser();
			  
			}else{
				throw new Error('We weren\'t granted permission.');
			}
		});
	}
	else{
        console.log("You already was suscriptioned");
    }
}

const buttonSuscriptionNotification = document.querySelector('#buttonSuscriptionNotification');

buttonSuscriptionNotification.addEventListener('click', () =>
	
    window.navigator.serviceWorker.ready
    .then(serviceWorkerRegistration => { 
        swRegistration = serviceWorkerRegistration;      
        askPermission();        
    })
  );
  

