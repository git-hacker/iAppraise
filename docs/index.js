require([
    'jquery', 'Layer', 'marked', 'EasyWebApp', 'BootStrap'
],  function ($, Layer, marked) {

    var SW = navigator.serviceWorker, worker;

    if ( SW ) {

        if (! (worker = SW.controller))
            SW.register('service.js',  {scope: './'});

        SW.addEventListener('controllerchange',  function () {

            if (! worker)  return (worker = this.controller);

            self.alert('检查到应用更新，按【确认】重新加载……');

            location.reload( true );
        });
    }

    $.ajaxSetup({xhrFields:  {withCredentials: true}});


    $( document ).on('ajaxError',  function (_, XHR) {

    //  AJAX 异常处理

        var message = XHR.responseText || '未知错误';

        switch ( message[0] ) {
            case '{':    message = JSON.parse( message ).message;    break;
            case '<':    message = $.parseXML( message );
        }

        if (XHR.status === 401)
            Layer.alert('会话失效，请重新登录！',  function () {

                self.location.href = $.filePath();
            });
        else
            Layer.alert(
                $.isPlainObject( message )  ?
                    JSON.stringify( message )  :  message,
                function () {

                    $( document ).trigger('ajaxSuccess');

                    Layer.close( arguments[0] );
                }
            );
    }).ready(function () {

        var iWebApp = $('#PageBox').iWebApp('https://appraise.leanapp.cn/');

    //  JSON 请求预处理

        $.ajaxPrefilter('json',  function (option) {

            if (! option.url.indexOf('page/'))
                option.url = iWebApp.pageRoot + option.url;
        });

    //  API 请求处理

        iWebApp.on({
            type:      'data',
            method:    /POST|PUT|DELETE/i
        },  function (_, data) {

            Layer.alert(data.message || '成功');
        }).on({
            type:      'data',
            method:    'DELETE',
            src:       'user/session'
        },  function () {

            self.location.href = this.pageRoot;
        });

    //  主导航栏

        iWebApp.on({
            type:    'template',
            href:    '.md'
        },  function () {

            return  marked( arguments[1] );

        }).on('route',  function (event, $_Link) {

            if ( event.src )
                $_Link = $(
                    $_Link.filter(
                        '[href*="'  +
                            event.src.split('/')[0].replace(/s$/, '')  +
                        '"]'
                    )[0] || $_Link
                );

            $_Link.parent().addClass('active').siblings().removeClass('active');
        });

    //  PWA

        if (! SW)  return;

        iWebApp.on('prefetch',  function (_, page) {

            if ( SW.controller )
                SW.controller.postMessage({
                    type:    'cache',
                    data:    page
                });
        });

        require(['OneSignal'],  function (OneSignal) {

            OneSignal.init({appId: 'b6e5a696-82ec-44d5-82ed-4d1ab5ce6183'});
        });
    });
});
