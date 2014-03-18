YUI.add('aui-image-filter-undo', function (A, NAME) {

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

                debugger;
            }
    });

A.ImageFilterUndoManager = ImageFilterUndoManager;

}, '2.0.0');
