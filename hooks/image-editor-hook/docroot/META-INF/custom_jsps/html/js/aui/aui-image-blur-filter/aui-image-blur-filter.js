YUI.add('aui-image-blur-filter', function (A, NAME) {

var Lang = A.Lang,

    _NAME = 'image-blur-filter',

    _NS = 'blur',

    ImageBlurFilter = A.Component.create({

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
            blurX: {
                validator: Lang.isNumber,
                value: 4
            },

            /**
             *
             */
            blurY: {
                validator: Lang.isNumber,
                value: 4
            },

            /**
             *
             */
            swfCfg: {
                readonly: true,
                value: {
                    processFn: 'blurMatrixFilter',
                    params: [
                        'blurX',
                        'blurY'
                    ]
                }
            }
        },

        prototype: {

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

            },

            /**
             *
             */
            process: function(bitmapData, cfg) {

            }
        }

    });

A.ImageBlurFilter = ImageBlurFilter;

}, '2.0.0', {"requires": ["aui-image-filter"]});
