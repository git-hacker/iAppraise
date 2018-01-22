self.importScripts(
    'https://cdn.bootcss.com/url-search-params/0.10.0/url-search-params.js'
);


var version = (new URLSearchParams( self.location.search )).get('version');

function Fetch(request) {

    return  self.fetch( request ).then(function (response) {

        return  caches.open( version ).then(function (cache) {

            return  cache.put(request, response.clone());

        }).then(function () {  return response;  });

    },  caches.match.bind(caches, request));
}


self.oninstall = function (event) {

    event.waitUntil( caches.open( version ) );
};


self.onfetch = function (event) {

    var URI = new URL( event.request.url );

    event.respondWith(
        (URI.pathname.split('/').pop().indexOf('.') > -1)  ?
            caches.match( event.request ).then(function (response) {

                return  response || Fetch( event.request );
            })  :
            Fetch( event.request )
    );
};
