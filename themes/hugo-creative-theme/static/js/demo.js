(function () {
    var collectionName;
    if (localStorage.getItem('clientId')) {
        collectionName = localStorage.getItem('clientId');
    } else {
        collectionName = Math.random().toString(36).substring(7);
        localStorage.setItem('clientId', collectionName);
    }

    var app = window.app = Neutrino.app('2447d061c0d645edb98d171bf49c22c6');
    app.auth.login('test', 'test').then(init);
    var collection = window.collection = app.collection(collectionName);
    var objectId;
    var macbook;
    var iphone;
    var htcOne;
    var server;
    getElementsPositions();
    $(window).resize(getElementsPositions);

    function init() {
        collection.objects()
            .then(function (data) {
                if (!data.length) {
                    return collection.object({text: ''});
                }

                return data[0];
            })
            .then(bind)
    }

    function bind(object) {
        objectId = object.id;

        var selectors = [
            '#iphone-6-input',
            '#mac-input',
            '#htc-input'
        ];
        var objectsPromises = new Array(selectors.length).fill(collection.object(objectId));
        Promise.all(objectsPromises)
            .then(function (realtimeObjects) {
                window.app.o = realtimeObjects;

                realtimeObjects.forEach(function (realtimeObject, index) {
                    var selector = selectors[index];
                    var el = $(selector);
                    var elDebounce = _.debounce(_.partial(addSpotByDevice, el.prop('id')), 130);
                    el.keyup(function () {
                        realtimeObject.text = $(this).val();
                        elDebounce();
                    });
                    realtimeObject.on(Neutrino.ObjectEvents.propertyChanged, function() {
                        el.val(realtimeObject.text);
                    });
                    el.val(realtimeObject.text);
                });
            });
    }

    function getElementsPositions() {
        macbook = getElementPosition('macbook');
        iphone = getElementPosition('iphone6');
        htcOne = getElementPosition('htc-one');
        server = getElementPosition('server');
    }

    function addSpotByDevice(device) {
        var macbookSpot = {left: macbook.right, top: macbook.top};
        var serverSpot = {left: server.leftCenter, top: server.topCenter};
        var iphoneSpot = {left: iphone.right, top: iphone.bottom};
        var htcOneSpot = {left: htcOne.left, top: htcOne.bottom};
        switch(device) {
            case 'mac-input':
                addSpotAnimation(macbookSpot, serverSpot);
                serverRandomResponse(server, iphoneSpot);
                serverRandomResponse(server, htcOneSpot);
                break;
            case 'iphone-6-input':
                addSpotAnimation(iphoneSpot, serverSpot);
                serverRandomResponse(server, macbookSpot);
                serverRandomResponse(server, htcOneSpot);
                break;
            case 'htc-input':
                addSpotAnimation(htcOneSpot, serverSpot);
                serverRandomResponse(server, macbookSpot);
                serverRandomResponse(server, iphoneSpot);
                break;
        }
    }
}());

$(function() {
    $('.marvel-device').click(function () {
        $(this).find('input').focus();
    });
});

function createElement(positions) {
    var el = $('<div class="signal-spot"></div>');
    $('body').append(el);
    el.css(positions);
    return el;
}

function getElementPosition(elementName) {
    var element = document.getElementsByClassName(elementName)[0];
    var elementRect = element.getBoundingClientRect();
    return {
        el: element,
        right: element.offsetLeft + elementRect.width - 23,
        left: element.offsetLeft,
        top: element.offsetTop,
        bottom: element.offsetTop + elementRect.height - 23,
        leftCenter: element.offsetLeft + (elementRect.width/2) - (23/2),
        topCenter: element.offsetTop + (elementRect.height/2) - (23/2)
    };
}

function addSpotAnimation(spotStartPositions, spotEndPosition) {
    var element = createElement(spotStartPositions);
    setTimeout(function() {
        element.css(spotEndPosition);

        setTimeout(function() {
            element.detach();
        }, 200);
    }, 20);
}

function serverRandomResponse(server, spotEndPosition) {
    switch (getRandomInt(1, 4)) {
        case 1: //Top - Left point
            addSpotAnimation({top: server.top, left: server.left}, spotEndPosition);
            break;
        case 2: //Top - Right point
            addSpotAnimation({top: server.top, left: server.right}, spotEndPosition);
            break;
        case 3: //Bottom - Left point
            addSpotAnimation({top: server.bottom, left: server.left}, spotEndPosition);
            break;
        case 4: //Bottom - Right point
            addSpotAnimation({top: server.bottom, left: server.right}, spotEndPosition);
            break;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
