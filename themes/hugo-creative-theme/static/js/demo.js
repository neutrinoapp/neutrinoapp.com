(function () {
    var collectionName;
    if (localStorage.getItem('clientId')) {
        collectionName = localStorage.getItem('clientId');
    } else {
        collectionName = Math.random().toString(36).substring(7);
        localStorage.setItem('clientId', collectionName);
    }

    var app = window.app = Neutrino.app('cf8b71c381ca4eba8b288abdb74810a9');
    app.auth.login('test', 'test').then(init);
    var collection = window.collection = app.collection(collectionName);
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
                    var el = $(selector);
                    el.keyup(function () {
                        realtimeObject.text = $(this).val();
                    });
                    realtimeObject.on(Neutrino.ObjectEvents.propertyChanged, function() {
                        el.val(realtimeObject.text);
                    });
                    el.val(realtimeObject.text);
                });
            });
    }
}());

$(function() {
    $('.marvel-device').click(function () {
        $(this).find('input').focus();
    });
});
