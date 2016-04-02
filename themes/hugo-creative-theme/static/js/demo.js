jsPlumb.Defaults.Container = 'demo';

jsPlumb.ready(function () {
	jsPlumb.connect({
		source: 'server',
		target: 'tablet',
		anchors: ['Right', 'Left'],
		connector: 'Straight'
	});

	jsPlumb.connect({
		source: 'server',
		target: 'laptop',
		anchors: ['Right', 'Left'],
		connector: 'Straight'
	});

	jsPlumb.connect({
		source: 'server',
		target: 'desktop',
		anchors: ['Left', 'Right'],
		connector: 'Straight'
	});

	jsPlumb.connect({
		source: 'server',
		target: 'phone',
		anchors: ['Left', 'Right'],
		connector: 'Straight'
	});

	jsPlumb.connect({
		source: 'server',
		target: 'data-input',
		anchors: ['Bottom', 'Top'],
		connector: 'Straight'
	})
});

$(window).resize(function(){
	jsPlumb.repaintEverything();
});

function onType (e) {
    //Check for enter keyCode
    if (e.keyCode === 13) {
        var element = e.target;

        addText(element.value, '#phone4-list');
        addText(element.value, '#phone3-list');
        addText(element.value, '#phone2-list');
        addText(element.value, '#phone1-list');

        element.value = '';
    }
}

function addText (value, elementId) {
    var li4 = $('<li></li>');
    li4.text(value);
    $(elementId).append(li4);
}

$("#phone4").keypress(onType);
$("#phone3").keypress(onType);
$("#phone2").keypress(onType);
$("#phone1").keypress(onType);
