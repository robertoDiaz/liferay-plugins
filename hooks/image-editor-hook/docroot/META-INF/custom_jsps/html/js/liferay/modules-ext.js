var A = AUI();

var DOCUMENT = A.config.doc;

var canvasTest = function() {
	var canvas = DOCUMENT && DOCUMENT.createElement("canvas");

	return (canvas && canvas.getContext && canvas.getContext("2d"));
};

var swfTest = function() {
	return !canvasTest();
};

A.applyConfig(
	{
		modules: {
			'aui-image-editor': {
				path: 'aui-image-editor/aui-image-editor.js',
				requires: [
					'aui-image-processor',
					'aui-image-color-filter',
					'aui-image-blur-filter',
					'aui-image-scale-filter',
					'aui-toolbar',
					'aui-widget'
				]
			},
			'aui-image-processor': {
				path: 'aui-image-processor/aui-image-processor.js'
			},
			'aui-image-processor-canvas': {
				path: 'aui-image-processor-canvas/aui-image-processor-canvas.js',
				condition: {
					trigger: "aui-image-processor",
					test: canvasTest
				}
			},
			'aui-image-processor-canvas-default': {
				path: 'aui-image-processor-canvas-default/aui-image-processor-canvas-default.js',
				condition: {
					trigger: "aui-image-processor",
					test: canvasTest
				}
			},
			'aui-image-processor-swf': {
				path: 'aui-image-processor-swf/aui-image-processor-swf.js',
				condition: {
					trigger: "aui-image-processor",
					test: swfTest
				}
			},
			'aui-image-processor-swf-default': {
				path: 'aui-image-processor-swf-default/aui-image-processor-swf-default.js',
				condition: {
					trigger: "aui-image-processor",
					test: swfTest
				}
			},
			'aui-image-filter': {
				path: 'aui-image-filter/aui-image-filter.js'
			},
			'aui-image-color-filter': {
				path: 'aui-image-color-filter/aui-image-color-filter.js',
				requires: ['aui-image-filter']
			},
			'aui-image-processor-undo': {
				path: 'aui-image-processor-undo/aui-image-processor-undo.js',
				requires: [
					'plugin',
					'aui-component'
				]
			}
		}
	}
);