YUI.add('aui-image-filter-swf', function (A, NAME) {

var Lang = A.Lang,
    UA = A.UA,
    Aarray = A.Array,
    DOC = A.config.doc,
    DEFAULT_PLAYER_PATH = A.config.base + '../src/aui-image-editor/as/ImageFilter.swf',
    FLASH_VARS = 'flashVars',
    SWF_URL = 'swfUrl',
    TPL_FLASH = '<object id="{id}" {applicationType} height="{height}" width="{width}">{movie}{fixedAttributes}{flashVars}</object>',


    _NAME = 'image-filter-swf',

    /**
     * A base class for image filters.
     *
     * @class A.ImageFilterCanvas
     * @extends A.ImageFilterBase
     * @param config {Object} Object literal specifying widget configuration properties.
     * @constructor
     */
    ImageFilterSWF = A.Base.create(_NAME, A.ImageFilterBase, [], {

        /**
         *
         */
        initializer: function() {
            var instance = this,
                containerNode = instance.get('containerNode');

            instance._filterSwf = A.Node.create('<div class="filterswf"></div>');

            var img = containerNode.one('img');
            var src = img.attr('src');

            instance._src = src;

            instance.set('swfHeight', img.height().toString());
            instance.set('swfWidth', img.width().toString());

            containerNode.empty();
            containerNode.append(instance._filterSwf);
            instance._renderSwf();
        },

        /**
         *
         *
         * @method clear
         */
        clear: function() {
            var instance = this;

            instance._getSWFObject().clear();
        },

        /**
         *
         *
         * @method getImage
         */
        getImage: function() {
            var instance = this;

            return instance._getSWFObject().getImage();
        },

        /**
         * Gets the image data.
         *
         * @method getImageData
         */
        getImageData: function() {
            var instance = this;

            return instance._getSWFObject().getImageData(); ;
        },

        /**
         *
         *
         * @method preview
         */
        preview: function(filterName, cfg, callback) {
            var instance = this;

            var filter = instance[filterName];

            var swfCfg = filter.get('swfCfg');

            if (swfCfg && swfCfg.processFn) {
                var params = {};

                Aarray.each(
                    swfCfg.params,
                    function(item, index, collection) {
                        params[item] = filter.get(item);
                    }
                );

                instance._getSWFObject().preview(swfCfg.processFn, params);
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

            instance._getSWFObject().putImage(imageData, offsetY, offsetY);
        },

        /**
         *
         *
         * @method reset
         */
        reset: function() {
            var instance = this;

            instance._getSWFObject().reset();
        },

        /**
         *
         */
        save: function() {
            var instance = this;

            var prevVal = instance._getSWFObject().save();

            instance._notifyStateChange('save', prevVal);
        },

        /**
         *
         */
        _getSWFObject: function() {
            var instance = this;

            return A.one('.filterswf object').getDOMNode();
        },

        /**
         * Render SWF in DOM.
         *
         * @method _renderSwf
         * @protected
         */
        _renderSwf: function() {
            var instance = this;

            var swfUrl = instance.get(SWF_URL);

            if (swfUrl) {
                var flashVars = instance.get(FLASH_VARS);

                flashVars['imageUrl'] = instance._src;

                //instance._setMedia(flashVars);

                var flashVarString = A.QueryString.stringify(flashVars);

                if (instance._swfId) {
                    instance._audio.removeChild(A.one('#' + instance._swfId));
                }
                else {
                    instance._swfId = A.guid();
                }

                var applicationType = 'type="application/x-shockwave-flash" data="' + swfUrl + '"';

                var movie = '';

                if (UA.ie) {
                    applicationType = 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';

                    movie = '<param name="movie" value="' + swfUrl + '"/>';
                }

                /*var fixedAttributes = instance.get(FIXED_ATTRIBUTES);

                var fixedAttributesParam = [];

                for (var attributeName in fixedAttributes) {
                    if (AObject.owns(fixedAttributes, attributeName)) {
                        fixedAttributesParam.push('<param name="', attributeName, '" value="', fixedAttributes[
                            attributeName], '" />');
                    }
                }*/

                var flashVarsParam = '';

                if (flashVarString) {
                    flashVarsParam = '<param name="flashVars" value="' + flashVarString + '" />';
                }

                var height = instance.get('swfHeight');

                var width = instance.get('swfWidth');

                var tplObj = Lang.sub(
                    TPL_FLASH, {
                        applicationType: applicationType,
                        id: instance._swfId,
                        fixedAttributes: '',//fixedAttributesParam.join(''),
                        flashVars: flashVarsParam,
                        height: height,
                        movie: movie,
                        width: width
                    }
                );

                instance._filterSwf.append(tplObj);
            }
        }
    }, {
        ATTRS: {
            /**
             * Variables used by Flash player.
             *
             * @attribute flashVars
             * @default {}
             * @type Object
             */
            flashVars: {
                value: {},
                validator: Lang.isObject
            },

            /**
             * The width of Audio's fallback using Flash.
             *
             * @attribute swfWidth
             * @default 100%
             * @type String
             */
            swfHeight: {
                value: '100%',
                validator: Lang.isString
            },

            /**
             * URL (on .swf format) used by Audio to create
             * a fallback player with Flash.
             *
             * @attribute swfUrl
             * @default aui-audio/assets/player.swf
             * @type String
             */
            swfUrl: {
                value: DEFAULT_PLAYER_PATH,
                validator: Lang.isString
            },

            /**
             * The width of Audio's fallback using Flash.
             *
             * @attribute swfWidth
             * @default 100%
             * @type String
             */
            swfWidth: {
                value: '100%',
                validator: Lang.isString
            }
        }
    });

A.ImageFilterSWF = ImageFilterSWF;

}, '2.0.0', {"requires": ["querystring-stringify-simple"]});
