YUI.add('aui-image-filters', function (A, NAME) {

/**
 * The Image Filter Utility
 * @module aui-image-editor
 * @submodule aui-image-editor-base
 */

var Lang = A.Lang,
    AObject = A.Object,

    _NAME = 'image-filter-base',

    _EVENT_NS = 'imageFilter:',

    /**
     * A base class for image filters.
     *
     * @class A.ImageFilterBase
     * @extends Base
     * @param config {Object} Object literal specifying widget configuration properties.
     * @constructor
     */
    ImageFilterBase = A.Base.create(_NAME, A.Base, [], {

        /**
         * Construction logic executed during ImageFilter instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {

        },

       /**
         *
         *
         * @method clear
         */

        /**
         *
         *
         * @method getImage
         */

        /**
         *
         *
         * @method getImageData
         */

        /**
         *
         *
         * @method preview
         */

        /**
         *
         *
         * @method putImage
         */

        /**
         *
         *
         * @method reset
         */

        /**
         *
         *
         * @method save
         */

        /**
         *
         */
        _notifyStateChange: function(state, prevVal, newVal) {
            var instance = this;

            var eventName = _EVENT_NS + state;

            instance.fire(
                eventName,
                {
                    newVal: newVal,
                    prevVal: prevVal
                }
            );
        }
    }, {

        /**
         * Static property used to define the default attribute
         * configuration for the Palette.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * Container node of the image filter.
             *
             * @attribute containerNode
             * @type Node
             */
            containerNode: {
                validator: A.Node
            }
        }
    });

A.ImageFilterBase = ImageFilterBase;


}, '2.0.0', {"requires": ["base-build", "aui-base"]});
