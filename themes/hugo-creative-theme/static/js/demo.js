(function () {
    var clientId;
    if (localStorage.getItem('clientId')) {
        clientId = localStorage.getItem('clientId');
    } else {
        clientId = Math.random().toString(36).substring(7);
        localStorage.setItem('clientId', clientId);
    }

    var app = window.app = Neutrino.app('39d6e7592c2043899f9108d5ad6156f2');
    app.auth.login('test', 'test').then(init);
    var collection = window.collection = app.use(clientId);
    var objectId;

    function init() {
        collection.objects()
            .then(function (data) {
                if (!data.length) {
                    return collection.object({text: ''});
                }

                return data[0];
            })
            .then(bind);
    }

    function bind(object) {
        objectId = object.id;

        var objectsPromises = new Array(4).fill(collection.object(objectId, {realtime: true}));
        Promise.all(objectsPromises)
            .then(function (realtimeObjects) {
                var selectors = [
                    '#iphone-6-input',
                    '#mac-input',
                    '#htc-input',
                    '#iphone-6-plus-input'
                ];

                window.app.o = realtimeObjects;

                realtimeObjects.forEach(function (realtimeObject, index) {
                    var selector = selectors[index];
                    new Vue({
                        el: selector,
                        data: realtimeObject
                    });
                    $(selector).css('display', 'block');
                });
            });
    }
}());

$(function() {
    $('.marvel-device').click(function () {
        $(this).find('input').focus();
    });
});