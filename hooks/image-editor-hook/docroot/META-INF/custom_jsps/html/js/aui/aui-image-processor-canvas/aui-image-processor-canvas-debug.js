YUI.add('aui-image-processor-canvas', function (A, NAME) {

var Lang = A.Lang,

    _NAME = 'image-processor-canvas',

    /**
     * An HTML5 canvas implementation of an ImageProcessor
     *
     * @class A.ImageProcessorCanvas
     * @extends A.ImageProcessorBase
     * @constructor
     */
    ImageProcessorCanvas = A.Base.create(_NAME, A.ImageProcessorBase, [], {

        /**
         *
         */
        initializer: function() {
            var instance = this,
                imageNode = instance.get('imageNode'),
                srcNode = instance.get('srcNode'),
                canvas, context,
                width, height;

            if (srcNode && imageNode) {
                width = imageNode.width();
                height = imageNode.height();

                canvas = A.config.doc.createElement('canvas');
                context = canvas.getContext('2d');

                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);

                context.drawImage(imageNode.getDOMNode(), 0, 0);

                imageNode.hide();
                srcNode.append(canvas);

                instance._canvas = canvas;
                instance._ctx = context;

                instance._initialData = context.getImageData(0, 0, width, height);

                instance._currentData = instance._cloneImageData(instance._initialData);
                instance._previewData = instance._cloneImageData(instance._initialData);
            }
        },

        /**
         *
         *
         * @method clear
         */
        clear: function() {
            var instance = this;

            instance._ctx.putImageData(instance._currentData, 0, 0);

            instance._updateState('clear', instance._previewData, instance._currentData);
        },

        /**
         *
         *
         * @method getImage
         */
        getImage: function() {
            var instance = this;

            return instance._cloneImageData(instance._previewData);
        },

        /**
         *
         *
         * @method getImageData
         */
        getImageData: function() {
            var instance = this;

            return instance._canvas.toDataURL();
        },

        /**
         *
         *
         * @method preview
         */
        preview: function(filterName, cfg, callback) {
            var instance = this;

            var filter = instance[filterName];

            if (filter && filter.process) {
                instance._previewData.data.set(instance._currentData.data);

                filter.process(instance._previewData, cfg);
                instance._ctx.putImageData(instance._previewData, 0, 0);

                instance._updateState('preview', instance._currentData, instance._previewData);
            }
        },

        /**
         *
         *
         * @method putImage
         */
        putImage: function(imageData, offsetX, offsetY) {
            var instance = this,
                offsetX = offsetX || 0,
                offsetY = offsetY || 0;

            instance._currentData.data.set(imageData.data);
            instance._previewData.data.set(imageData.data);

            instance._ctx.putImageData(imageData, offsetX, offsetY);
        },

        /**
         *
         *
         * @method reset
         */
        reset: function() {
            var instance = this;

            instance._ctx.putImageData(instance._initialData, 0, 0);
            instance._currentData.data.set(instance._initialData.data);

            instance._updateState('reset', instance._previewData, instance._initialData);
        },

        /**
         *
         *
         * @method save
         */
        save: function() {
            var instance = this;

            instance._updateState('save', instance._currentData, instance._previewData);

            instance._currentData.data.set(instance._previewData.data);
        },

        _cloneImageData: function(imageData) {
            var instance = this;

            var clonedImageData = instance._ctx.createImageData(imageData.width, imageData.height);

            clonedImageData.data.set(imageData.data);

            return clonedImageData;
        },

        _updateState: function(state, prevVal, nextVal) {
            var instance = this;

            instance._notifyStateChange(
                state,
                instance._cloneImageData(prevVal),
                instance._cloneImageData(nextVal)
            );
        }

    }, {

    });

A.ImageProcessorCanvas = ImageProcessorCanvas;

}, '2.0.0');
