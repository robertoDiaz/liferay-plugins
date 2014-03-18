YUI.add('aui-image-processor', function (A, NAME) {

/**
 * The ImageProcessor Utility
 * @module aui-image-editor
 * @submodule aui-image-processor-base
 */

var Lang = A.Lang,
    AObject = A.Object,

    _EVENT_NS = 'imageProcessor:',

    _NAME = 'image-processor-base',
    _DOT = '.',

    getClassName = A.getClassName,

    CSS_IMAGE_NODE = getClassName('img');

/**
 * A base class for Image Processors.
 *
 * @class A.ImageProcessorBase
 * @extends Base
 * @constructor
 */
var ImageProcessorBase = A.Component.create({

    NAME: _NAME,

    /**
     * Object hash, defining how attribute values have to be parsed from
     * markup contained in the Image Editor's content box.
     *
     * @property HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        imageNode: CSS_IMAGE_NODE
    },

    /**
     * Static property used to define the default attribute
     * configuration for the ImageProcessor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Container node of the image processor.
         *
         * @attribute imageNode
         * @type Node
         */
        imageNode: {
        }
    },

    prototype: {

        /**
         * Construction logic executed during ImageProcessor instantiation. Lifecycle.
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
    }
});

A.ImageProcessorBase = ImageProcessorBase;


}, '2.0.0', {"requires": ["base-build", "aui-base"]});
