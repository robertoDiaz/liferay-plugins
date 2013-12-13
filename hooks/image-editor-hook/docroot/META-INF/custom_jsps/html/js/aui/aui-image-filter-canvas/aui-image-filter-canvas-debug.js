YUI.add('aui-image-filter-canvas', function (A, NAME) {

var Lang = A.Lang,

    _NAME = 'image-filter-canvas',

    /**
     * A base class for image filters.
     *
     * @class A.ImageFilterCanvas
     * @extends A.ImageFilterBase
     * @param config {Object} Object literal specifying widget configuration properties.
     * @constructor
     */
    ImageFilterCanvas = A.Base.create(_NAME, A.ImageFilterBase, [], {

        /**
         *
         */
        initializer: function() {
            var instance = this,
                containerNode = instance.get('containerNode');

            instance._canvas = A.config.doc.createElement('canvas');
            instance._ctx = instance._canvas.getContext('2d');

            var img = containerNode.one('img');
            var src = img.attr('src');

            var canvas = instance._canvas;
            canvas.setAttribute('width', 500);
            canvas.setAttribute('height', 300);

            context = instance._ctx;
            context.drawImage(img.getDOMNode(), 0, 0);

            containerNode.empty();
            containerNode.append(canvas);

            instance._initialData = context.getImageData(0, 0, 500, 300);

            instance._currentData = instance._cloneImageData(instance._initialData);
            instance._previewData = instance._cloneImageData(instance._initialData);
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

A.ImageFilterCanvas = ImageFilterCanvas;

}, '2.0.0');
