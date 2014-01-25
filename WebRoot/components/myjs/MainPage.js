Ext.define('net.shangtech.ext.MainPage', {
	sysModules: null,
	mainTabs: null,
	menuUrl: null,
	layout: 'border',
	extend: 'Ext.container.Viewport',
	initComponent: function(){
		this.mainTabs = Ext.create('Ext.tab.Panel', {
			region: 'center',
			activeTab: 0,
			autoScroll: true,
			items: {
				title: '首页'
			}
		});
		this.sysModules = Ext.create('Ext.panel.Panel', {
			region: 'west',
			collasible: true,
			title: 'XX管理系统',
			width: 150,
			layout: {
				type: 'accordion',
				titleCollapse: true,
				animate: true
			}
		});
		this.items = [{
			region: 'north',
			height: 40,
			border: false
		}, this.sysModules, {
			region: 'south',
			height: 30
		}, this.mainTabs];
		this.callParent(arguments);
		var me = this;
		var sysModules = this.sysModules;
		var menuUrl = this.menuUrl;
		var onTreeNodeClick = this.onTreeNodeClick;
		//alert(sysModules);
		Ext.Ajax.request({
			//url: admin + '/main!menu.action',
			url: menuUrl,
			success: function(response){
				var result = Ext.decode(response.responseText);
				if(result.length > 0){
					Ext.each(result, function(obj, index, array){
						var module = Ext.create('Ext.tree.Panel', {
							title: obj.text,
							store: Ext.create('Ext.data.TreeStore', {
								proxy: {
									type: 'ajax',
									actionMethods: 'post',
									url: menuUrl,
									reader: {
										type: 'json'
									}
								},
								nodeParam: 'id',
								root: {
									id: obj.id,
									text: obj.text,
									expanded: true
								},
								model: 'net.shangtech.ext.data.MenuNode'
							}),
							rootVisible: false,
							listeners: {
								itemclick: {
									fn: onTreeNodeClick,
									scope: me
								}
							}
						});
						sysModules.add(module);
					});
				}
			}
		});
	},
	onTreeNodeClick: function(_view, _record, _item, _index, _e){
		if(!_record.isLeaf())
			return;
		var _nodeText = _record.get('text');
		var _nodeLink = _record.get('url');
		var _nodeId = _record.get('id');
		var me = this;
		this.addTab(_nodeText, _nodeId, '', _nodeLink);
	},
	addTab: function(_name, _id, _css, _link){
		var tabId = 'tab_' + _id;
		var tab = this.mainTabs.getComponent(tabId);
		if(tab){
			this.mainTabs.setActiveTab(tab);
			return;
		}
		tab = Ext.create('Ext.Component', {
			id: tabId,
			title: _name,
			iconCls: _css,
			layout: 'fit',
			border: false,
			closable: true,
			loader: {
				url: admin + _link,
				autoLoad: true,
				params: {
					subMainId: 'tab_' + _id + '_main'
				},
				scripts: true,
				ajaxOptions: {
					method: 'get'
				}
			}
		});
		this.mainTabs.add(tab);
		this.mainTabs.setActiveTab(tab);
	},
	onActiveTabSize: function(){
		var w = this.mainTabs.getActiveTab().getInnerWidth();
		var h = this.mainTabs.getActiveTab().getInnerHeight();
		var id = this.mainTabs.getActiveTab().id;
		var submain = Ext.getCmp(id + '_main');
		if(submain){
			submain.setWidth(w);
			submain.setHeight(h);
		}
	}
});
Ext.define('net.shangtech.ext.data.MenuNode', {
	extend: 'Ext.data.Model',
	fields:[
		{name: 'id', 		type: 'int'},
	    {name: 'text', 		type: 'string'},
	    {name: 'iconCls', 	type: 'string'},
	    {name: 'leaf', 		type: 'boolean'},
	    {name: 'url', 		type: 'string'}
	]
});