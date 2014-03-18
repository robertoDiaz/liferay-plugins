YUI.add('aui-image-color-filter', function (A, NAME) {

var Lang = A.Lang,

    _NAME = 'image-color-filter',

    _NS = 'colorFilter',

    IDENTITY_MATRIX = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ],

    ImageColorFilter = A.Component.create({

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
             * 5x5 transformation matrix
             *
             * @attribute matrix
             * @type Array
             */
            matrix: {
                validator: Lang.isArray,
                value: IDENTITY_MATRIX
            },

            /**
             *
             *
             * @attribute swfCfg
             * @type Object
             */
            swfCfg: {
                readonly: true,
                value: {
                    processFn: 'colorMatrixFilter',
                    params: [
                        'matrix'
                    ]
                }
            }
        },

        prototype: {

            FILTER_LABEL: _NS,

            FILTER_NS: _NS,

            /**
             * Construction logic executed during ImageColorFilter instantiation.
             * Lifecycle.
             *
             * @method initializer
             * @param config
             * @protected
             */
            initializer: function(config) {

            },

            /**
             *
             */
            process: function(bitmapData, cfg) {
                var instance = this;

                var data = bitmapData.data,
                    matrix = instance.get('matrix');

                if (data.length) {
                    for (var i=0; i < data.length; i+=4) {
                            var r = data[i],
                                g = data[i+1],
                                b = data[i+2],
                                a = data[i+3];

                            data[i] = r * matrix[0] + g * matrix[1] + b * matrix[2] + a * matrix[3] + matrix[4];
                            data[i+1] = r * matrix[5] + g * matrix[6] + b * matrix[7] + a * matrix[8] + matrix[9];
                            data[i+2] = r * matrix[10] + g * matrix[11] + b * matrix[12] + a * matrix[13] + matrix[14];
                            data[i+3] = r * matrix[15] + g * matrix[16] + b * matrix[17] + a * matrix[18] + matrix[19];
                    }
                }

                return bitmapData;
            }
        }

    });

A.ImageColorFilter = ImageColorFilter;var Lang = A.Lang,

    _NAME = 'image-adjust-filter',

    _NS = 'adjustFilter',

    IDENTITY_MATRIX = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ],

    ImageAdjustFilter = A.Component.create({

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
        EXTENDS: A.ImageColorFilter,

        /**
         * Static property used to define the default attribute
         * configuration for the ImageAdjustFilter.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             *
             */
            brightness: {
                validator: Lang.isNumber,
                value: 0
            },

            /**
             *
             */
            contrast: {
                validator: Lang.isNumber,
                value: 1
            },

            /**
             *
             */
            saturation: {
                validator: Lang.isNumber,
                value: 1
            }
        },

        prototype: {

            FILTER_NS: _NS,

            EDITOR_TEMPLATE: '<div><input id="contrast" min="0" max="2" step="0.01" type="range">Contrast</input><input id="brightness" min="-1" max="1" step="0.01" type="range">Brightness</input><input id="saturation" min="0" max="2" step="0.01" type="range">Saturation</input></div>',

            /**
             * Construction logic executed during ImageAdjustFilter instantiation.
             * Lifecycle.
             *
             * @method initializer
             * @param config
             * @protected
             */
            initializer: function(config) {
                var instance = this;

                instance.after(['brightnessChange', 'contrastChange', 'saturationChange'], instance._calculateColorMatrix, instance);
            },

            /**
             *
             * @method resetEditor
             */
            resetEditor: function() {
                var instance = this,
                    editor = instance.getEditor();

                editor.one('#contrast').val(1);
                editor.one('#brightness').val(0);
                editor.one('#saturation').val(1);
            },

            /**
             *
             */
            _calculateColorMatrix: function(event) {
                var instance = this,
                    matrix = IDENTITY_MATRIX.slice(0),
                    brightness = instance.get('brightness') * 255,
                    contrast = instance.get('contrast'),
                    t = ((1 - contrast) / 2) * 255,
                    saturation = instance.get('saturation'),
                    sr = (1 - saturation) * 0.3086,
                    sg = (1 - saturation) * 0.6094,
                    sb = (1 - saturation) * 0.0820;

                matrix[0] = contrast * (sr + saturation);
                matrix[1] = contrast * sg;
                matrix[2] = contrast * sb;
                matrix[4] = brightness + t;

                matrix[5] = contrast * sr;
                matrix[6] = contrast * (sg + saturation);
                matrix[7] = contrast * sb;
                matrix[9] = brightness + t;

                matrix[10] = contrast * sr;
                matrix[11] = contrast * sg;
                matrix[12] = contrast * (sb + saturation);
                matrix[14] = brightness + t;

                instance.set('matrix', matrix);
            },

            _bindEditorUI: function(editor, host) {
                var instance = this;

                editor.delegate(
                    'change',
                    function(event) {
                        var target = event.currentTarget,
                            prop = target.attr('id'),
                            val = Number(target.val());

                        instance.set(prop, val);
                        host.preview(instance.FILTER_NS);
                    },
                    'input'
                );
            }
        }

    });

A.ImageAdjustFilter = ImageAdjustFilter;var Lang = A.Lang,

    _NAME  = 'image-grayscale-filter',

    _NS = 'grayscale',

    MATRIX = [
        0.2225, 0.7169, 0.0606, 0, 0,
        0.2225, 0.7169, 0.0606, 0, 0,
        0.2225, 0.7169, 0.0606, 0, 0,
        0, 0, 0, 1, 0,
        0, 0, 0, 0, 0
    ],

    ImageGrayscaleFilter = A.Base.create(_NAME, A.ImageColorFilter, [], {

        FILTER_LABEL: _NS,

        FILTER_NS: _NS,

    }, {
        NS: _NS,

        /**
         * Static property used to define the default attribute
         * configuration for the Palette.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            matrix: {
                readOnly: true,
                value: MATRIX
            }
        }
    });

A.ImageGrayscaleFilter = ImageGrayscaleFilter;var Lang = A.Lang,

    _NAME = 'image-invert-filter',

    _NS = 'invert',

    MATRIX = [
        -1, 0, 0, 0, 255,
        0, -1, 0, 0, 255,
        0, 0, -1, 0, 255,
        0, 0, 0, 1, 0
    ],

    ImageInvertFilter = A.Base.create(_NAME, A.ImageColorFilter, [], {

        FILTER_LABEL: _NS,

        FILTER_NS: _NS,

    }, {
        NS: _NS,

        /**
         * Static property used to define the default attribute
         * configuration for the Palette.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            matrix: {
                readOnly: true,
                value: MATRIX
            }
        }
    });

A.ImageInvertFilter = ImageInvertFilter;var Lang = A.Lang,

    _NAME = 'image-polaroid-filter',

    _NS = 'polaroid',

    MATRIX = [
        1.438, -0.122, -0.016, 0, 0.03 * 255,
        -0.062, 1.378, -0.016, 0, 0.05 * 255,
        -0.062, -0.122, 1.483, 0, -0.02 * 255,
        0, 0, 0, 1, 0,
        0, 0, 0, 0, 255
    ],

    ImagePolaroidFilter = A.Base.create(_NAME, A.ImageColorFilter, [], {

        FILTER_LABEL: _NS,

        FILTER_NS: _NS,

    }, {
        NS: _NS,

        /**
         * Static property used to define the default attribute
         * configuration for the Palette.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            matrix: {
                readOnly: true,
                value: MATRIX
            }
        }
    });

A.ImagePolaroidFilter = ImagePolaroidFilter;var Lang = A.Lang,

    _NAME = 'image-sepia-filter',

    _NS = 'sepia',

    MATRIX = [
        0.393, 0.769, 0.189, 0, 0,
        0.349, 0.686, 0.168, 0, 0,
        0.272, 0.534, 0.131, 0, 0,
        0, 0, 0, 1, 0,
        0, 0, 0, 0, 0
    ],

    ImageSepiaFilter = A.Base.create(_NAME, A.ImageColorFilter, [], {

        FILTER_LABEL: _NS,

        FILTER_NS: _NS,

    }, {
        NS: _NS,

        /**
         * Static property used to define the default attribute
         * configuration for the Palette.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            matrix: {
                readOnly: true,
                value: MATRIX
            }
        }
    });

A.ImageSepiaFilter = ImageSepiaFilter;

}, '2.0.0', {"requires": ["aui-image-filter"]});
