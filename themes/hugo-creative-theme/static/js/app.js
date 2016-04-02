$(function () {
    var app = window.app = {};
    
    var SEND = 'send';
    var EVENT = 'event';
    
    app.category = {
        subscribe: 'subscribe',
        chat: 'chat',
        email: 'email',
        tryDemo: 'tryDemo'
    };
    
    app.action = {
        click: 'click'   
    };
    
    app.label = {
        hero: 'hero',
        access: 'access',
        contact: 'contact'  
    };
    
    app._track = function (type, category, action, label, val) {
        ga(SEND, type, category, action, label, val);
        console.log('Tracking:', [].join.call(arguments, ' '));
    }
    
    app.trackClick = function (category, label, val) {
        app._track(EVENT, category, app.action.click, label, val);
    };
    
    app.trackHeroSubscribe = function () {
        app.trackClick(app.category.subscribe, app.label.hero);
    };
    
    app.trackAccessSubscribe = function () {
        app.trackClick(app.category.subscribe, app.label.access);
    };
    
    app.trackJoinChat = function () {
        app.trackClick(app.category.chat, app.label.contact);  
    };
    
    app.trackEmail = function () {
        app.trackClick(app.category.email, app.label.contact);
    };
    
    app.trackTryDemo = function () {
        app.trackClick(app.category.tryDemo, app.label.hero);  
    };
});