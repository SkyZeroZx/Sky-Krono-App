importScripts("./ngsw-worker.js");

(function () {
  "use strict";

  self.addEventListener("notificationclick", (event) => {
    console.log("This is custom service worker notificationclick method.");
    console.log("Notification details: ", event.notification);
    // Write the code to open
    if (clients.openWindow && event.notification.data.url) {
      event.waitUntil(
        clients.openWindow(
          event.notification.data.url
        )
      );
      console.log("Evento custom openWindow ", event.notification.data.url);
    }
  });

  self.addEventListener("pushsubscriptionchange", function (event) {
    console.log('La suscripcion cambio')
    let _oldTokenPush = {
      endpoint: event.oldSubscription.endpoint,
      expirationTime: null,
      keys: {
        p256dh: event.oldSubscription.toJSON().keys.p256dh,
        auth: event.oldSubscription.toJSON().keys.auth,
      }
    };
    let _newTokenPush = {
      endpoint: event.newSubscription.endpoint,
      expirationTime: null,
      keys: {
        p256dh: event.newSubscription.toJSON().keys.p256dh,
        auth: event.newSubscription.toJSON().keys.auth,
      }
    };

    event.waitUntil(
      fetch("https://whatsapp-bot-isekai.herokuapp.com/notificacion/subscriptionChange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldTokenPush : _oldTokenPush,
          newTokenPush:  _newTokenPush
        }),
      })
    );
  });
})();
