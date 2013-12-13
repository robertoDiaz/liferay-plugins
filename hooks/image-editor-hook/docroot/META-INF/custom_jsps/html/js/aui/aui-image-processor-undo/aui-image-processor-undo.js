YUI.add('aui-image-processor-undo', function (A, NAME) {

var Lang = A.Lang,

    IMAGE_PROCESSOR_UNDO = 'image-processor-undo',

    NS_IMAGE_PROCESSOR_UNDO = 'imageProcessorUndo',

    ImageProcessorUndo = A.Component.create({

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type String
         * @static
         */
        NAME: IMAGE_PROCESSOR_UNDO,

        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type String
         * @static
         */
        NS: NS_IMAGE_PROCESSOR_UNDO,

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
         * configuration for the ImageProcessorUndo.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             *
             */
            levels: {
                validator: Lang.isNumber,
                value: 50
            }
        },

        prototype: {

            /**
             * Construction logic executed during ImageProcessorUndo instantiation.
             * Lifecycle.
             *
             * @method initializer
             * @param config
             * @protected
             */
            initializer: function(config) {
                var instance = this,
                    host = instance.get('host');

                instance._stackIndex = 0;
                instance._stack = [];

                instance._eventHandles = [
                    host.on('imageProcessor:clear', instance._onFilterClear, instance),
                    host.on('imageProcessor:preview', instance._onFilterPreview, instance),
                    host.on('imageProcessor:reset', instance._onFilterReset, instance),
                    host.on('imageProcessor:save', instance._onFilterSave, instance)
                ];

                host.redo = A.bind(instance._redo, instance);
                host.undo = A.bind(instance._undo, instance);
            },

            /**
             *
             */
            destructor: function() {
                var instance = this;

                delete host.redo;
                delete host.undo;

                (new A.EventHandle(instance._eventHandles)).detach();
            },

            _redo: function() {
                var instance = this,
                    host = instance.get('host'),
                    image;

                if (instance._stackIndex < instance._stack.length) {
                    image = instance._stack[instance._stackIndex++];

                    host.putImage(image);
                }
            },

            _undo: function() {
                var instance = this,
                    host = instance.get('host'),
                    image;

                if (instance._stackIndex > 0) {
                    image = instance._stack[--instance._stackIndex];

                    host.putImage(image);
                }
            },

            _onFilterClear: function(event) {
                var instance = this;

                //console.log('clear:' + event);
            },

            _onFilterPreview: function(event) {
                var instance = this;

                //console.log('preview:' + event);
            },

            _onFilterReset: function(event) {
                var instance = this;

                //console.log('reset:' + event);
            },

            _onFilterSave: function(event) {
                var instance = this;

                instance._stack[instance._stackIndex++] = event.prevVal;
            }
        }
    });

A.ImageProcessorUndo = ImageProcessorUndo;

}, '2.0.0', {"requires": ["plugin", "aui-component"]});
