require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    EWA.component(function (data) {

        var app = new EWA(), VM = this;

        data.check = function (event) {

            var input = event.target;

            $.getJSON(
                app.apiRoot + 'user?keyWord=' + input.value,
                function (data) {

                    $.each(data.list,  function () {

                        if (this[ input.name ]  ===  input.value)
                            return  (! VM.render( this ));
                    });
                }
            );
        };

        data.lock = function (event) {

            $(':field', event.target).prop('disabled',  function () {

                return  (! this.value);
            });
        };

        data.unlock = function (event, data) {

            $(':disabled', event.target).prop('disabled', false);

            this.id = data.id;
        };
    });
});
