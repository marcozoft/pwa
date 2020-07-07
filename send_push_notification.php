<?php
require __DIR__ . '/vendor/autoload.php';
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;
// here I'll get the subscription endpoint in the POST parameters
// but in reality, you'll get this information in your database
// because you already stored it (cf. push_subscription.php)
$subscriber = json_decode(file_get_contents('php://input'), true);




var_dump($subscriber);

$auth = array(
    'VAPID' => array(
        'subject' => 'http://localhost/php_push_demo-master/',
        'publicKey' => 'BFzWsQGVxUb3GADJj2C5XNa2hoqPZWKVaz3TptLePhYcOaDqBmIDg7sKP-BV9aJiTnI9MN5y_4jatNgbxOV6jfM',
        'privateKey' => '_NfFstemBF2_2ByyIS19IKoNYCELmbF8wPz4buDtRQY', // in the real world, this would be in a secret file
    ),
);
//exit($subscriber['endpoint'].' : '.$subscriber['auth'].' : '.$subscriber['p256dh']);
$webPush = new WebPush($auth);

//this code was modified from the tutorial to make it more dynamic.
//hardcoding the serviceworker push notification would not be a great practice in a real-world application

$notifications = [
        'subscription' => Subscription::create([
                        'endpoint' => $subscriber['endpoint'],
                        'publicKey' => $subscriber['p256dh'],
                        'authToken' =>$subscriber['auth']
                    ]),
         'payload' =>   '{"title":"hello","msg":"yes it works","icon":"images/icon.png","badge":"images/badge.png","url":"https://youtu.be/5gSm5tLDZO4?t=47"}'
] ;          


$res = $webPush->sendNotification(
    $notifications['subscription'],
    $notifications['payload'], // optional (defaults null)
    true // optional (defaults false)
);
foreach ($webPush->flush() as $report) {
    $endpoint = $report->getRequest()->getUri()->__toString();

    if ($report->isSuccess()) {
        echo "[v] Message sent successfully for subscription {$endpoint}.";
    } else {
        echo "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}";
    }
}
// handle eventual errors here, and remove the subscription from your server if it is expired

?>