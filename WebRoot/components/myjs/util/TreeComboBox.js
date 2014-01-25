Ext.define('net.shangtech.ext.util.TreeComboBox', {
	extend: 'Ext.form.field.ComboBox',
	callback: null,
	treeObj: null,
	url: null,
	treeHeight: 200,
	nodeParam: 'id',
	rootVisible: true,
	valueField: 'id',
	displayField: 'text',
	allowBlank: false,
	_idValue: null,
	_txtValue: null,
	editable: false,
	triggerAction: 'all',
	root: null,
	initComponent: function(){
		this.treeRenderId = Ext.id();
		this.tpl = '<tpl><div id="'+this.treeRenderId+'"></div></tpl>';
		this.callParent(arguments);
		var me = this;
		if(this.url){
			var treeStore = Ext.create('Ext.data.TreeStore', {
				nodeParam: me.nodeParam,
				root: me.root,
				proxy: {
					type: 'ajax',
					actionMethods: 'post',
					url: me.url,
					reader: 'json',
					autoLoad: true
				}
			});
		}
		this.treeObj = Ext.create('Ext.tree.Panel', {
			border: false,
			height: me.treeHeight,
			autoScroll: true,
			rootVisible: me.rootVisible,
			store: treeStore
		});
		this.on({
			'expand': function(){
				if(this.treeObj && !this.treeObj.rendered && !this.readOnly){
					Ext.defer(function(){
						this.treeObj.render(this.treeRenderId);
					}, 300, this);
				}
			}
		});
		this.treeObj.on('itemclick', function(view, record){
			if(record){
				this.setValue(record.get('text'));
				this._txtValue = record.get('text');
				this._idValue = record.get('id');
				//if(this.callback)
					//this.callback.call(this, record);
				this.collapse();
			}
		}, this);
	},
	getValue: function(){
		return this._idValue;
	},
	getTextValue: function(){
		return this._txtValue;
	}
});