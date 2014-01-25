Ext.define('net.shangtech.ext.sys.security.RoleGridPanel', {
	extend: 'net.shangtech.ext.util.GridPanel',
	url: admin + '/security/role.action',
	delUrl: admin + '/security/role!del.action',
	model: 'net.shangtech.ext.sys.security.Role',
	columns: [
		{xtype: 'rownumberer'},
		{text: '角色名称', dataIndex: 'roleName'},
		{text: '角色编码', dataIndex: 'roleCode'},
		{text: '图标', dataIndex: 'iconCls'},
		{text: '备注', dataIndex: 'memo', sortable: false}
	],
	initComponent: function(){
		var me = this;
		me.actions = [
			{text: '添加角色', handler: me.onAddClick, scope: me, iconCls: 'icon-add', showBar: true, showMenu: true, space: true},
			{text: '编辑角色', handler: me.onEditClick, scope: me, iconCls: '', showBar: true, showMenu: true, space: true},
			{text: '角色授权', handler: me.onAuthClick, scope: me, iconCls: '', showBar: true, showMenu: true, space: true},
			{text: '删除角色', handler: me.onDelClick, scope: me, iconCls: '', showBar: true, showMenu: true}
		];
		this.addWin = Ext.create('net.shangtech.ext.util.FormWindow', {
			width:300,
			url: admin + '/security/role!add.action',
			title: '添加角色',
			owner: me,
			fields: [
				{fieldLabel: '角色名称', name: 'roleName', allowBlank: false},
				{fieldLabel: '角色编码', name: 'roleCode'},
				{fieldLabel: '图标', name: 'iconCls'},
				{fieldLabel: '备注', name: 'memo', xtype: 'textareafield'}
			],
			buttons: [
				{text: '确定', type: 'submit'},
				{text: '重置', type: 'reset'},
				{text: '取消', type: 'cancel'}
			],
			onSuccess: me.onAddSuccess
		});
		this.editWin = Ext.create('net.shangtech.ext.util.FormWindow', {
			width:300,
			url: admin + '/security/role!edit.action',
			title: '编辑角色',
			owner: me,
			fields: [
				{name: 'id', hidden: true, allowBlank: false},
				{fieldLabel: '角色名称', name: 'roleName', allowBlank: false},
				{fieldLabel: '角色编码', name: 'roleCode'},
				{fieldLabel: '图标', name: 'iconCls'},
				{fieldLabel: '备注', name: 'memo', xtype: 'textareafield'}
			],
			buttons: [
				{text: '确定', type: 'submit'},
				{text: '重置', type: 'reset'},
				{text: '取消', type: 'cancel'}
			],
			onSuccess: me.onEditSuccess
		});
		var authStore = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'ajax',
				url: admin + '/security/resource!parent.action'
			}
		});
		this.authWin = Ext.create('Ext.window.Window', {
			autoWidth: true,
			height: 300,
			closeAction: 'hide',
			modal: true,
			buttonAlign: 'center',
			resizable: false,
			collapsible: false,
			items: [{
				xtype: 'treepanel',
				width: 200,
				height: 300,
				autoScroll: true,
				store: authStore,
				rootVisible: false,
				listeners: {
					checkchange: function(_node, _checked){
						if(_checked == true){
							_node.set('checked', true);
							var p = _node.parentNode;
							for(; p != null; p = p.parentNode){
								if(p.get('id') == 'root') continue;
								p.set('checked', true);
							}
						}
						var chd = function(node, checked){
							node.set('checked', checked);
							if(node.isNode){
								node.eachChild(function(child){
									chd(child, checked);
								});
							}
						}
						_node.eachChild(function(child){
							chd(child, _checked);
						})
					}
				}
			}],
			store: authStore,
			buttons: [
				{text: '确定', handler: me.onAuthSubmitClick, scope: me},
				{text: '取消', handler: me.onAuthCancelClick, scope: me}
			]
		});
		this.callParent(arguments);
	},
	onAuthSubmitClick: function(){
		var records = this.authWin.items.getAt(0).getChecked();
		var resources = '';
		for(var i = 0; i < records.length; i++){
			resources += records[i].get('id');
			if(i < records.length-1)
				resources += ',';
		}
		var me = this;
		Ext.Ajax.request({
			url: admin + '/security/role!auth.action',
			params: {
				id: me.getSelectionModel().getLastSelected().get('id'),
				resources: resources
			},
			success: function(response){
				var result = Ext.decode(response.responseText);
				if(result.success == true){
					me.authWin.hide();
					return;
				}
				Ext.MessageBox.alert('系统提示', result.msg);
			}
		});
	},
	onAuthCancelClick: function(){
		this.authWin.hide();
	},
	onAuthClick: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		this.authWin.store.load({
			params: {
				id: _curr.get('id')
			}
		});
		this.authWin.show();
	}
});
Ext.define('net.shangtech.ext.sys.security.Role', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'roleName', type: 'string'},
		{name: 'roleCode', type: 'string'},
		{name: 'iconCls', type: 'string'},
		{name: 'memo', type: 'string'}
	]
});