YUI.add('aui-image-filter', function (A, NAME) {

var Lang = A.Lang,

    _NAME = 'image-filter',

    _NS = 'imageFilter',

    ImageFilter = A.Component.create({

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
        EXTENDS: A.Plugin.Base,

        /**
         * Static property used to define the default attribute
         * configuration for the ImageFilter.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             *
             *
             * @attribute swfCfg
             * @type Object
             */
            swfCfg: {
                readonly: true,
                value: {
                    processFn: _NS
                }
            }
        },

        prototype: {

            FILTER_NS: _NS,

            FILTER_LABEL: _NS,

            EDITOR_TEMPLATE: '<button>{label}</button>',

            /**
             * Construction logic executed during ImageFilter instantiation.
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
             * @method getEditor
             */
            getEditor: function() {
                var instance = this;

                return instance._getEditor();
            },

            /**
             *
             * @method resetEditor
             */
            resetEditor: function() {
            },

            /**
             *
             * @method _getEditor
             */
            _getEditor: function() {
                var instance = this,
                    host = instance.get('host'),
                    editor = instance._editor;

                if (!editor) {
                    editor = A.Node.create(
                        Lang.sub(
                            instance.EDITOR_TEMPLATE,
                            {
                                label: instance.FILTER_LABEL
                            }
                        )
                    );

                    instance._bindEditorUI(editor, host);

                    instance._editor = editor;
                }

                return editor;
            },

            /**
             *
             * @method _bindEditorUI
             */
            _bindEditorUI: function(editor, host) {
                var instance = this;

                editor.on('click', A.bind('preview', host, instance.FILTER_NS));
            }
        }

    });

A.ImageFilter = ImageFilter;

}, '2.0.0', {"requires": ["plugin", "aui-component"]});
