//>>built
define("dgrid1/Editor","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/dom-construct dojo/dom-class dojo/on dojo/has dojo/query ./Grid dojo/_base/sniff".split(" "),function(v,q,p,r,t,m,u,w,x){return v(null,{constructor:function(){this._editorInstances={};this._editorColumnListeners=[];this._editorCellListeners={};this._editorsPendingStartup=[]},postCreate:function(){var a=this;this.inherited(arguments);this.on(".dgrid-input:focusin",function(){a._focusedEditorCell=a.cell(this)});this._editorFocusoutHandle=
m.pausable(this.domNode,".dgrid-input:focusout",function(){a._focusedEditorCell=null});this._listeners.push(this._editorFocusoutHandle)},insertRow:function(){this._editorRowListeners={};var a=this.inherited(arguments),b=this.row(a),c=this._editorCellListeners[a.id]=this._editorCellListeners[a.id]||{},d;for(d in this._editorRowListeners)c[d]=this._editorRowListeners[d];this._editorRowListeners=null;(c=this._previouslyFocusedEditorCell)&&c.row.id===b.id&&this.edit(this.cell(b,c.column.id));return a},
refresh:function(){for(var a in this._editorInstances){var b=this._editorInstances[a].domNode;b&&b.parentNode&&b.parentNode.removeChild(b)}this.inherited(arguments)},removeRow:function(a){var b=this,c=this._focusedEditorCell;c&&c.row.id===this.row(a).id&&(this._previouslyFocusedEditorCell=c,this._editorFocusoutHandle.pause(),setTimeout(function(){b._editorFocusoutHandle.resume();b._previouslyFocusedEditorCell=null},0));if(this._editorCellListeners[a.id]){for(var d in this._editorCellListeners[a.id])this._editorCellListeners[a.id][d].remove();
delete this._editorCellListeners[a.id]}for(c=this._alwaysOnWidgetColumns.length;c--;)if(d=(d=this.cell(a,this._alwaysOnWidgetColumns[c].id).element)&&(d.contents||d).widget)this._editorFocusoutHandle.pause(),d.destroyRecursive();return this.inherited(arguments)},renderArray:function(){var a=this.inherited(arguments);a.length?this._startupPendingEditors():this._editorsPendingStartup=[];return a},_onNotification:function(){this.inherited(arguments);this._startupPendingEditors()},_destroyColumns:function(){this._editorStructureCleanup();
this.inherited(arguments)},_editorStructureCleanup:function(){var a=this._editorInstances,b=this._editorColumnListeners;this._editTimer&&clearTimeout(this._editTimer);for(var c in a){var d=a[c];d.domNode&&d.destroyRecursive()}this._editorInstances={};for(a=b.length;a--;)b[a].remove();for(var g in this._editorCellListeners)for(c in this._editorCellListeners[g])this._editorCellListeners[g][c].remove();for(a=0;a<this._editorColumnListeners.length;a++)this._editorColumnListeners[a].remove();this._editorCellListeners=
{};this._editorColumnListeners=[];this._editorsPendingStartup=[]},_configColumns:function(){var a=this.inherited(arguments);this._alwaysOnWidgetColumns=[];for(var b=0,c=a.length;b<c;b++)a[b].editor&&this._configureEditorColumn(a[b]);return a},_configureEditorColumn:function(a){var b=this,c=a.renderCell||this._defaultRenderCell,d=a.editOn,g="string"!==typeof a.editor;d?this._editorInstances[a.id]=this._createSharedEditor(a,c):g&&this._alwaysOnWidgetColumns.push(a);a.renderCell=d?function(k,g,h,f){if(!f||
!f.alreadyHooked){var e=m(h,d,function(){b._activeOptions=f;b.edit(this)});if(b._editorRowListeners)b._editorRowListeners[a.id]=e;else{var n=b.row(k);b._editorCellListeners[n.element.id][a.id]=e}}return c.call(a,k,g,h,f)}:function(d,e,h,f){if(!a.canEdit||a.canEdit(d,e))d=b._createEditor(a,d),b._showEditor(d,a,h,e),h[g?"widget":"input"]=d;else return c.call(a,d,e,h,f)}},edit:function(a){function b(a){c._activeCell=g;c._showEditor(f,d,g,h);c._editTimer=setTimeout(function(){f.focus&&f.focus();d._editorBlurHandle&&
d._editorBlurHandle.resume();c._editTimer=null;a.resolve(f)},0)}var c=this,d,g,k,e,h,f,l;a.column||(a=this.cell(a));if(!a||!a.element)return null;d=a.column;e=d.field;g=a.element.contents||a.element;if(f=this._editorInstances[d.id]){if(this._activeCell!==g){var n=a.row;h=(k=this.dirty&&this.dirty[n.id])&&e in k?k[e]:d.get?d.get(n.data):n.data[e];if(!d.canEdit||d.canEdit(a.row.data,h))return l=new p,a=f.domNode||f,a.offsetWidth?(a.blur(),setTimeout(function(){b(l)},0)):b(l),l.promise}}else if(d.editor&&
(f=g.widget||g.input))return l=new p,f.focus&&f.focus(),l.resolve(f),l.promise;return null},refreshCell:function(a){var b=a.column,c=b.get?b.get(a.row.data):a.row.data[b.field],d;b.editor&&(a.column.editOn&&this._activeCell===a.element?d=this._editorInstances[a.column.id]:a.column.editOn||(d=a.element.widget||a.element.input));return d?(d.domNode?d.set("value",c):this._updateInputValue(d,c),(new p).resolve()):this.inherited(arguments)},_showEditor:function(a,b,c,d){var g=a.domNode;g||this._updateInputValue(a,
d);c.innerHTML="";t.add(c,"dgrid-cell-editing");g&&b.editOn&&a.validate&&a.reset&&a.reset();c.appendChild(a.domNode||a);g&&!b.editOn?this._editorsPendingStartup.push([a,b,c,d]):this._startupEditor(a,b,c,d)},_startupEditor:function(a,b,c,d){a.domNode&&(a._started||a.startup(),a._dgridIgnoreChange=!0,a.set("value",d),setTimeout(function(){a._dgridIgnoreChange=!1},0));a._dgridLastValue=d;this._activeCell&&(this._activeValue=d,m.emit(c,"dgrid-editor-show",{grid:this,cell:this.cell(c),column:b,editor:a,
bubbles:!0,cancelable:!1}))},_startupPendingEditors:function(){for(var a=this._editorsPendingStartup,b=a.length;b--;)this._startupEditor.apply(this,a[b]);this._editorsPendingStartup=[]},_handleEditorChange:function(a,b){var c=a.target;"_dgridLastValue"in c&&-1<c.className.indexOf("dgrid-input")&&this._updatePropertyFromEditor(b||this.cell(c).column,c,a)},_createEditor:function(a,b){var c=a.editor,d=a.editOn,g=this,k="string"!==typeof c&&c,e,h,f={};e=a.editorArgs||{};"function"===typeof e&&(e=e.call(this,
a));k?(h=new k(e),e=h.focusNode||h.domNode,e.className+=" dgrid-input",h.on(d?"blur":"change",function(){h._dgridIgnoreChange||g._updatePropertyFromEditor(a,this,{type:"widget"})})):(this._hasInputListener||(this._hasInputListener=!0,this.on("change",function(a){g._handleEditorChange(a)})),"textarea"===c?k="textarea":(k="input",f.type=c),h=e=r.create(k,q.mixin(f,{className:"dgrid-input",name:a.field,tabIndex:isNaN(a.tabIndex)?-1:a.tabIndex},e)),9>u("ie")&&(c="radio"===c||"checkbox"===c?m(h,"click",
function(b){g._handleEditorChange(b,a)}):m(h,"change",function(b){g._handleEditorChange(b,a)}),d?this._editorColumnListeners.push(c):this._editorRowListeners?this._editorRowListeners[a.id]=c:this._editorCellListeners[this.row(b).element.id][a.id]=c));if(a.autoSelect){var l=h.focusNode||h;l.select&&m(l,"focus",function(){setTimeout(function(){l.select()},0)})}return h},_createSharedEditor:function(a){function b(){var a=d._activeCell;e.blur();"function"===typeof d.focus&&setTimeout(function(){d.focus(a)},
g&&9>u("ie")?15:0)}var c=this._createEditor(a),d=this,g=c.domNode,k=c.domNode||c,e=c.focusNode||k,h=g?function(){c.set("value",c._dgridLastValue)}:function(){d._updateInputValue(c,c._dgridLastValue);d._updatePropertyFromEditor(a,c)};this._editorColumnListeners.push(m(e,"keydown",function(f){f=f.keyCode||f.which;27===f?(h(),d._activeValue=c._dgridLastValue,b()):13===f&&!1!==a.dismissOnEnter&&b()}));(a._editorBlurHandle=m.pausable(c,"blur",function(){var b=k.parentNode,g={alreadyHooked:!0},e=d.cell(k);
m.emit(e.element,"dgrid-editor-hide",{grid:d,cell:e,column:a,editor:c,bubbles:!0,cancelable:!1});a._editorBlurHandle.pause();b.removeChild(k);e.row&&(t.remove(e.element,"dgrid-cell-editing"),r.empty(b),x.appendIfNode(b,a.renderCell(e.row.data,d._activeValue,b,d._activeOptions?q.delegate(g,d._activeOptions):g)));d._focusedEditorCell=d._activeCell=d._activeValue=d._activeOptions=null})).pause();this._editorColumnListeners.push(a._editorBlurHandle);return c},_updatePropertyFromEditor:function(a,b,c){var d;
if(!b.isValid||b.isValid())if(c=this._updateProperty((b.domNode||b).parentNode,this._activeCell?this._activeValue:b._dgridLastValue,this._retrieveEditorValue(a,b),c),this._activeCell?this._activeValue=c:b._dgridLastValue=c,"radio"===b.type&&b.name&&!a.editOn&&a.field)for(d in c=this.row(b),w("input[type\x3dradio][name\x3d"+b.name+"]",this.contentNode).forEach(function(c){var d=this.row(c);c!==b&&c._dgridLastValue&&(c._dgridLastValue=!1,this.updateDirty?this.updateDirty(d.id,a.field,!1):d.data[a.field]=
!1)},this),this.dirty)c.id.toString()!==d&&this.dirty[d][a.field]&&this.updateDirty(d,a.field,!1)},_updateProperty:function(a,b,c,d){var g=this;if((b&&b.valueOf())!==(c&&c.valueOf())){var k=this.cell(a),e=k.row,h=k.column;a=k.element;if(h.field&&e)if(k={grid:this,cell:k,oldValue:b,value:c,bubbles:!0,cancelable:!0},d&&d.type&&(k.parentType=d.type),m.emit(a,"dgrid-datachange",k))this.updateDirty?(this.updateDirty(e.id,h.field,c),h.autoSave&&setTimeout(function(){g._trackError("save")},0)):e.data[h.field]=
c;else{var f;(f=a.widget)?(f._dgridIgnoreChange=!0,f.set("value",b),setTimeout(function(){f._dgridIgnoreChange=!1},0)):(f=a.input)&&this._updateInputValue(f,b);return b}}return c},_updateInputValue:function(a,b){a.value=b;if("radio"===a.type||"checkbox"===a.type)a.checked=a.defaultChecked=!!b},_retrieveEditorValue:function(a,b){return"function"===typeof b.get?this._convertEditorValue(b.get("value")):this._convertEditorValue(b["checkbox"===b.type||"radio"===b.type?"checked":"value"])},_convertEditorValue:function(a,
b){if("number"===typeof b)a=isNaN(a)?a:parseFloat(a);else if("boolean"===typeof b)a="true"===a?!0:"false"===a?!1:a;else if(b instanceof Date){var c=new Date(a);a=isNaN(c.getTime())?a:c}return a}})});