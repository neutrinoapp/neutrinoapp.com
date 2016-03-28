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