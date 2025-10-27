if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(function(registration){
        console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(err => console.log('Error al tratar de registrar el SW', err));
}
