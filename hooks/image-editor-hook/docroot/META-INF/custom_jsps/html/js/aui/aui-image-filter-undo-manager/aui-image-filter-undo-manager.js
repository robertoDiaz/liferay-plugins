YUI.add('aui-image-filter-undo-manager', function (A, NAME) {

var Lang = A.Lang,

    IMAGE_FILTER_UNDO_MANAGER = 'image-filter-undo-manager',

    NS_IMAGE_FILTER_UNDO_MANAGER = 'imageFilterUndoManager',

    ImageFilterUndoManager = A.Component.create({

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type String
         * @static
         */
        NAME: IMAGE_FILTER_UNDO_MANAGER,

        /**
         * Static property provides a string to identify the namespace.
         *
         * @property NS
         * @type String
         * @static
         */
        NS: NS_IMAGE_FILTER_UNDO_MANAGER,

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
            level: {
                validator: A.isNumber,
                value: 50
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
                var instance = this,
                    host = instance.get('host');

                instance._redoStack = [];
                instance._undoStack = [];

                instance._eventHandles = [
                    host.on('imageFilter:clear', instance._onFilterClear, instance),
                    host.on('imageFilter:preview', instance._onFilterPreview, instance),
                    host.on('imageFilter:reset', instance._onFilterReset, instance),
                    host.on('imageFilter:save', instance._onFilterSave, instance)
                ];

                host.redo = A.bind(instance._redo, instance);
                host.undo = A.bind(instance._undo, instance);
            },

            destructor: function() {
                var instance = this;

                (new A.EventHandle(instance._eventHandles)).detach();
            },

            _redo: function() {
                var instance = this,
                    host = instance.get('host'),
                    image;

                if (instance._redoStack.length) {
                    image = instance._redoStack.pop();

                    instance._undoStack.push(host.getImage());

                    host.putImage(image);
                }
            },

            _undo: function() {
                var instance = this,
                    host = instance.get('host'),
                    image;

                if (instance._undoStack.length) {
                    image = instance._undoStack.pop();

                    instance._redoStack.push(host.getImage());

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

                instance._undoStack.push(event.prevVal);

                instance._redoStack.length = 0;
            }
        }
    });

A.ImageFilterUndoManager = ImageFilterUndoManager;

}, '2.0.0', {"requires": ["plugin", "aui-component"]});
