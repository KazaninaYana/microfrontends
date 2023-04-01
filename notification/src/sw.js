self.addEventListener('install', function(evt) {
    console.log('install', evt)
});

self.addEventListener('push', evt => {
    console.log('push', evt);
    const data = evt.data.json();

    self.registration.showNotification('text', data);
});

self.addEventListener('fetch', function(evt) {
    console.log('fetch', evt);
});
