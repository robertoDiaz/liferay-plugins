YUI.add("aui-image-filter-invert",function(e,t){var n="image-invert-filter",r=[-1,0,0,0,255,0,-1,0,0,255,0,0,-1,0,255,0,0,0,1,0],i=e.Base.create(n,e.ImageColorFilter,[],{},{ATTRS:{label:{value:"Invert"},matrix:{readOnly:!0,value:r}}});e.ImageInvertFilter=i},"2.0.0",{requires:["aui-image-color-filter-base"]});
