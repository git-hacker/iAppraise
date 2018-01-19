require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    EWA.component(function (data) {

        var app = new EWA(), VM = this;

        var TagView = VM.childOf()[0], lock_form;

        function loadTag() {

            if (! TagView.__parse__)
                app.load( TagView );
            else
                TagView.refresh();
        }

        data.check = function (event) {

            var input = event.target;

            if ( this.id )  return;

            lock_form = true;

            $.getJSON(
                app.apiRoot + 'user?keyWord=' + input.value,
                function (data) {

                    $.each(data.list,  function () {

                        if (this[ input.name ]  ===  input.value) {

                            VM.render( this );

                            return  (!! loadTag());
                        }
                    });

                    lock_form = false;
                }
            );
        };

        data.lock = function (event) {

            if ( lock_form )
                event.stopPropagation(), event.preventDefault();
            else
                $(':field', event.target).prop('disabled',  function () {

                    return  (! this.value);
                });
        };

        data.unlock = function (event, data) {

            $(':disabled', event.target).prop('disabled', false);

            this.id = data.id;

            loadTag();
        };

        data.reset = VM.clear.bind( VM );

        data.addTag = function (_, data) {

            $.post(
                app.apiRoot + 'user/' + this.id + '/tag',
                {id: data.id},
                loadTag
            );
        };
    });
});
