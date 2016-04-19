(function () {
    var collectionName;
    if (localStorage.getItem('clientId')) {
        collectionName = localStorage.getItem('clientId');
    } else {
        collectionName = Math.random().toString(36).substring(7);
        localStorage.setItem('clientId', collectionName);
    }

    var app = window.app = Neutrino.app('demo');
    app.auth.login('demo', 'demo').then(init);
    var collection = window.collection = app.collection(collectionName);
    var objectId;
    var signalVisibilityTime = 400;
    var selectors = [
        '#iphone-6-input',
        '#mac-input',
        '#htc-input'
    ];

    function init() {
        collection.objects({realtime: false})
            .then(function (data) {
                var defaultText = 'Type here! \n \n ( ^_^ )';

                if (!data.length) {
                    return collection.object({
                        text: defaultText
                    });
                }

                var item = data[0];
                if (!item.text) {
                    item.text = defaultText;
                    return item.update();
                }

                return item;
            })
            .then(bind)
    }

    function bind(object) {
        objectId = object.id;

        var objectsPromises = new Array(selectors.length).fill(collection.object(objectId));
        Promise.all(objectsPromises)
            .then(function (realtimeObjects) {
                window.app.o = realtimeObjects;

                var clearSignalTimeout;
                realtimeObjects.forEach(function (realtimeObject, index) {
                    var selector = selectors[index];
                    var el = $(selector);
                    el.bind('input propertychange', function () {
                        realtimeObject.text = $(this).val();
                        $(el.selector.replace('input', 'signal')).addClass('send-signal');

                        if (clearSignalTimeout) {
                            clearTimeout(clearSignalTimeout);
                        }

                        clearSignalTimeout = setTimeout(clearSignalColors, signalVisibilityTime);
                    });
                    realtimeObject.on(Neutrino.ObjectEvents.propertyChanged, function () {
                        el.val(realtimeObject.text);
                        $('.signal-position').addClass('receive-signal');
                    });
                    el.val(realtimeObject.text);

                    setInterval(function () {
                        el[0].scrollTop = el[0].scrollHeight;
                    }, 200);

                    function clearSignalColors() {
                        $('.send-signal').removeClass('send-signal');
                        $('.receive-signal').removeClass('receive-signal');
                    }
                });
            });
    }
}());

$(function () {
    $('.marvel-device').click(function () {
        $(this).find('textarea').focus();
    });
});
