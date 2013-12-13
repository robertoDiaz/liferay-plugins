YUI.add('aui-image-editor', function (A, NAME) {

/**
 * The Diagram Builder Base
 *
 * @module aui-diagram-builder
 * @submodule aui-diagram-builder-base
 */

var Lang = A.Lang,

    AArray = A.Array,

    _NAME = 'image-editor',
    _DOT = '.',

    getClassName = A.getClassName,

    CSS_IMAGE_PROCESSOR = getClassName('image-processor'),
    CSS_TOOLBAR = getClassName('toolbar');

/**
 * A base class for ImageEditorBase.
 *
 * @class A.ImageEditorBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var ImageEditor = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
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
        processorNode: _DOT + CSS_IMAGE_PROCESSOR,
        toolbarNode: _DOT + CSS_TOOLBAR
    },

    /**
     * Static property used to define the default attribute
     * configuration for the ImageEditorBase.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         *
         */
        processorNode: {},

        /**
         *
         */
        toolbarNode: {},

        /**
         *
         */
        undo: {
            validator: Lang.isObject,
            value: {
                enabled: true,
                levels: 50
            }
        }
    },

    prototype: {

        FILTER_EDITOR_TPL: '<div class="filter-editor"></div>',

        /**
         * Construction logic executed during ImageEditorBase instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;
        },

        /**
         * Render the ImageEditorBase component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._filterEditors = [];
            instance._imageProcessor = instance._renderImageProcessor();
            instance._toolbar = instance._renderToolbar(instance._imageProcessor);

            instance._editorContainer = A.Node.create('<div></div>');
            instance.get('srcNode').append(instance._editorContainer);
        },

        /**
         * Sync the ImageEditorBase UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;
        },

        /**
         *
         *  @method getImageData
         */
        getImageData: function() {
            var instance = this;

            return instance._imageProcessor.getImageData();
        },

        _renderImageProcessor: function() {
            var instance = this,
                undoCfg = instance.get('undo'),
                imageProcessor;

            imageProcessor = new A.ImageProcessor({
                srcNode: instance.get('processorNode'),
                plugins: [
                    A.ImageAdjustFilter,
                    A.ImageBlurFilter,
                    A.ImageGrayscaleFilter,
                    A.ImageSepiaFilter,
                    A.ImagePolaroidFilter,
                    A.ImageInvertFilter,
                    A.ImageScaleFilter
                ]
            });

            if (undoCfg.enabled) {
                A.use(
                    'aui-image-processor-undo',
                    function() {
                        imageProcessor.plug(A.ImageProcessorUndo);
                    }
                );
            }

            return imageProcessor
        },

        _renderToolbar: function(processor) {
            var instance = this;

            toolbar = new A.Toolbar(
                {
                    boundingBox: instance.get('toolbarNode'),
                    children: instance._getToolbar(processor),
                    render: true
                }
            );

            return toolbar;
        },

        _getOptions: function(processor) {
            var instance = this,
                undoCfg = instance.get('undo'),
                options = [],
                undoOptions;

            if (undoCfg.enabled) {
                undoOptions = [
                    {
                        icon: 'icon-arrow-left',
                        on: {
                            click: A.bind('undo', processor)
                        }
                    },
                    {
                        icon: 'icon-arrow-right',
                        on: {
                            click: A.bind('redo', processor)
                        }
                    }
                ];

                options.push(undoOptions);
            }

            options.push(
                [
                    {
                        icon: 'icon-trash',
                        on: {
                            click: A.bind('reset', processor)
                        }
                    }
                ]
            );

            return options;
        },

        _getFiltersToolbar: function() {
            var instance = this,
                filtersToolbar = [
                    'radio',
                    {
                        icon: 'icon-adjust',
                        filters: [
                            A.ImageAdjustFilter
                        ],
                        on: {
                            click: A.rbind('_editFilter', instance, 'adjustFilter')
                        }
                    },
                    {
                        icon: 'icon-picture',
                        filters: [
                            A.ImageGrayscaleFilter,
                            A.ImageSepiaFilter,
                            A.ImagePolaroidFilter,
                            A.ImageInvertFilter
                        ],
                        on: {
                            click: A.rbind('_editFilter', instance, ['grayscale', 'sepia', 'polaroid', 'invert'])
                        }
                    },
                    {
                        icon: 'icon-wrench',
                        filters: [
                            A.ImageScaleFilter
                        ],
                        on: {
                            click: A.rbind('_editFilter', instance, 'scale')
                        }
                    }
                ];

            return filtersToolbar;
        },

        _getToolbar: function(processor) {
            var instance = this,
                toolbar = instance._getOptions(processor);

            toolbar.push(instance._getFiltersToolbar());

            return toolbar;
        },

        _editFilter: function(event, filters) {
            var instance = this,
                filters = Lang.isArray(filters) ? filters : [filters],
                filterNs = filters.join(),
                filterData = instance._filterEditors[filterNs],
                editor = filterData ? filterData.editor : null,
                filter;

            if (!editor) {
                editor = A.Node.create(instance.FILTER_EDITOR_TPL);

                AArray.each(
                    filters,
                    function(item, index, collection) {
                        filter = instance._imageProcessor[item];

                        if (filter) {
                            editor.append(filter.getEditor());
                        }
                    }
                );

                instance._editorContainer.append(editor);

                instance._filterEditors[filterNs] = {
                    editor: editor,
                    filters: filters
                }
            }
            else {
                AArray.each(
                    filterData.filters,
                    function(item, index, collection) {
                        filter = instance._imageProcessor[item];

                        if (filter) {
                            filter.resetEditor();
                        }
                    }
                );
            }

            instance._imageProcessor.save();
            instance._editorContainer.all('.filter-editor').hide();
            editor.show();
        }
    }
});

A.ImageEditor = ImageEditor;


}, '2.0.0', {
    "requires": [
        "aui-image-color-filter",
        "aui-image-blur-filter",
        "aui-image-scale-filter",
        "aui-image-processor",
        "aui-toolbar",
        "aui-widget"
    ]
});
