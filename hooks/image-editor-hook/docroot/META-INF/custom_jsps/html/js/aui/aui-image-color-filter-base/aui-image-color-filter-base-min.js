YUI.add("aui-image-color-filter-base",function(e,t){var n=e.Lang,r="image-color-filter",i=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],s="matrix",o=e.Base.create(r,e.ImageFilterBase,[],{process:function(e,t){var n=this,r,i,o,u,a,f,l,c,h;u=e.bitmapData.data.length;if(u){o=e.bitmapData.data,l=n.get(s);for(f=0;f<u;f+=4)c=o[f],a=o[f+1],i=o[f+2],r=o[f+3],o[f]=c*l[0]+a*l[1]+i*l[2]+r*l[3]+l[4],o[f+1]=c*l[5]+a*l[6]+i*l[7]+r*l[8]+l[9],o[f+2]=c*l[10]+a*l[11]+i*l[12]+r*l[13]+l[14],o[f+3]=c*l[15]+a*l[16]+i*l[17]+r*l[18]+l[19]}h=n.get("label"),t&&(h+=" ("+t+")"),e.statusNode.setHTML(h)}},{NAME:r,ATTRS:{matrix:{validator:n.isArray,value:i},swfCfg:{readonly:!0,value:{processFn:"colorMatrixFilter",params:[s]}}}});e.ImageColorFilter=o},"2.0.0",{requires:["aui-image-filter"]});
