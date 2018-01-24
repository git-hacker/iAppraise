function Fetch(request) {

    var response;

    return  self.fetch( request ).then(function () {

        response = arguments[0];

        if ((request.method === 'GET')  &&  response.ok)
            return  caches.open( version ).then(function (cache) {

                return  cache.put(request, response.clone());
            });
    }).then(function () {  return response;  });
}


self.addEventListener('install',  function (event) {

    event.waitUntil( self.skipWaiting() );
});


self.addEventListener('activate',  function (event) {

    event.waitUntil(
        caches.keys().then(function (list) {

            return  Promise.all(list.map(function (key) {

                return  (key !== version)  &&  caches.delete( key );
            }));
        }).then( clients.claim.bind( self.clients ) )
    );
});


self.addEventListener('fetch',  function (event) {

    var request = event.request;

    var URI = new URL( request.url );

    event.respondWith(
        (URI.pathname.split('/').pop().indexOf('.') > -1)  ?
            caches.match( request ).then(function (response) {

                return  response || Fetch( request );
            })  :
            Fetch( request ).catch( caches.match.bind(self.caches, request) )
    );
});


self.addEventListener('message',  function (event) {

    var data = event.data;

    switch ( data.type ) {
        case 'cache':    caches.open( version ).then(function (cache) {

            return  Promise.all(data.data.map(function (URI) {

                return  cache.match( URI );

            })).then(function (list) {

                cache.addAll(data.data.filter(function (_, index) {

                    return  (! list[index]);
                }));
            });
        });
    }
});
