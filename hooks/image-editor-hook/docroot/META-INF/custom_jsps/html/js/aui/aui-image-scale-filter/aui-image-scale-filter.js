YUI.add('aui-image-scale-filter', function (A, NAME) {

var Lang = A.Lang,

    _NAME = 'image-scale-filter',

    _NS = 'scale',

    ImageScaleFilter = A.Component.create({

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type String
         * @static
         */
        NAME: _NAME,

        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type String
         * @static
         */
        NS: _NS,

        /**
         * Static property used to define which component it extends.
         *
         * @property EXTENDS
         * @type String
         * @static
         */
        EXTENDS: A.ImageFilter,

        /**
         * Static property used to define the default attribute
         * configuration for the ImageColorFilter.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             *
             */
            scaleX: {
                validator: Lang.isNumber,
                value: 1
            },

            /**
             *
             */
            scaleY: {
                validator: Lang.isNumber,
                value: 1
            },

            /**
             *
             */
            swfCfg: {
                readonly: true,
                value: {
                    processFn: 'scaleMatrixFilter',
                    params: [
                        'scaleX',
                        'scaleY'
                    ]
                }
            }
        },

        prototype: {

            FILTER_NS: _NS,

            EDITOR_TEMPLATE: '<div class="editor"><button id="scaleX">FlipH</button><button id="scaleY">FlipV</button></div>',

            /**
             * Construction logic executed during AutosizeIframe instantiation.
             * Lifecycle.
             *
             * @method initializer
             * @param config
             * @protected
             */
            initializer: function(config) {
                var instance = this;

                instance._bufferCanvas = A.config.doc.createElement('canvas');
                instance._scaleCanvas = A.config.doc.createElement('canvas');
            },

            /**
             *
             */
            process: function(bitmapData, cfg) {
                var instance = this,
                    bufferCanvas = instance._bufferCanvas,
                    bufferContext = bufferCanvas.getContext('2d'),
                    scaleCanvas = instance._scaleCanvas,
                    scaleContext = scaleCanvas.getContext('2d'),
                    scaleX = instance.get('scaleX') || 1,
                    scaleY = instance.get('scaleY') || 1;

                bufferCanvas.setAttribute('width', bitmapData.width);
                bufferCanvas.setAttribute('height', bitmapData.height);

                bufferContext.putImageData(bitmapData, 0, 0);

                scaleCanvas.setAttribute('width', bitmapData.width);
                scaleCanvas.setAttribute('height', bitmapData.height);

                scaleContext.scale(scaleX, scaleY);
                scaleContext.drawImage(bufferCanvas, (- (1 - scaleX) / 2) * bitmapData.width, (- (1 - scaleY) / 2) * bitmapData.height);

                bitmapData.data.set(scaleContext.getImageData(0, 0, bitmapData.width, bitmapData.height).data);
            },

            _bindEditorUI: function(editor, host) {
                var instance = this;

                editor.delegate(
                    'click',
                    function(event) {
                        var target = event.currentTarget,
                            prop = target.attr('id');

                        instance.set(prop, -1);
                        host.preview(instance.FILTER_NS);
                    },
                    'button'
                );
            }
        }

    });

A.ImageScaleFilter = ImageScaleFilter;

}, '2.0.0', {"requires": ["aui-image-filter"]});
