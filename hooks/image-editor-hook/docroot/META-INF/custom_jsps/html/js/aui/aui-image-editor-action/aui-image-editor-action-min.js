YUI.add("aui-image-editor-action",function(e,t){var n="ImageEditorAction",r="editor",i="newVal",s="prevVal",o=e.Base.create(n,e.UndoableAction,[],{initializer:function(){},redo:function(){var e=this,t=e.get(r),n=e.get(i);t.putImage&&t.putImage(n)},undo:function(){var e=this,t=e.get(r),n=e.get(s);t.putImage&&t.putImage(n)}},{ATTRS:{editor:{},newVal:{},prevVal:{}}});e.ImageEditorAction=o},"2.0.0",{requires:["aui-component","gallery-undo"]});
