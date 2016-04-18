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
    var signalElements = {
        macbook: $('.macbook-signal'),
        iphone: $('.iphone-6-signal'),
        htc: $('.htc-signal')  
    };
    var selectors = [
        '#iphone-6-input',
        '#mac-input',
        '#htc-input'
    ];
    
    function init() {
        collection.objects()
            .then(function (data) {
                if (!data.length) {
                    return collection.object({text: 'Type here! \n \n ( ^_^ )'});
                }

                return data[0];
            })
            .then(bind)
    }

    function bind(object) {
        objectId = object.id;

        var objectsPromises = new Array(selectors.length).fill(collection.object(objectId));
        Promise.all(objectsPromises)
            .then(function (realtimeObjects) {
                window.app.o = realtimeObjects;

                realtimeObjects.forEach(function (realtimeObject, index) {
                    var selector = selectors[index];
                    var el = $(selector);
                    el.keyup(function () {
                        realtimeObject.text = $(this).val();
                        el.addClass('send-signal');
                    });
                    realtimeObject.on(Neutrino.ObjectEvents.propertyChanged, function() {
                        el.val(realtimeObject.text);
                        el.addClass('receive-signal');
                        setTimeout(clearSignalColors, signalVisibilityTime);
                    });
                    el.val(realtimeObject.text);

                    setInterval(function(){
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

$(function() {
    $('.marvel-device').click(function () {
        $(this).find('textarea').focus();
    });
});
