Ext.define('net.shangtech.ext.sys.security.ResourceGridPanel', {
	extend: 'net.shangtech.ext.util.TreegridPanel',
	requires: [
		'net.shangtech.ext.util.TreegridPanel',
		'net.shangtech.ext.util.TreeComboBox'
	],
	delUrl: admin + '/resource!del.action',
	url: admin + '/resource.action',
	sortUrl: admin + '/resource!sort.action',
	model: 'net.shangtech.ext.data.Resource',
	columns: [
		{text: '资源名称', xtype: 'treecolumn', dataIndex: 'resourceName', sortable: false},
		{text: 'sort', dataIndex: 'sort'},
		{text: '资源编码', dataIndex: 'resourceCode', sortable: false},
		{text: '资源类型', dataIndex: 'resourceType', sortable: false, renderer: function(_val){
			if(_val == 1) return '系统菜单';
			if(_val == 2) return '功能按钮';
			return '其他';
		}},
		{text: 'uri', dataIndex: 'resourceUri', sortable: false},
		{text: '图标', dataIndex: 'iconCls', sortable: false},
		{text: '备注', dataIndex: 'memo', sortable: false}
	],
	initComponent: function(){
		var me = this;
		this.actions = [
			{text: '添加资源', handler: me.onAddClick, scope: me, iconCls: 'icon-add', showBar: true, showMenu: true, space: true},
			{text: '编辑资源', handler: me.onEditClick, scope: me, iconCls: '', showBar: true, showMenu: true, space: true},
			{text: '删除资源', handler: me.onDelClick, scope: me, iconCls: '', showBar: true, showMenu: true},
			{text: '资源排序', iconCls: '', showBar: false, showMenu: true, type: 'sort', menu: []}
		];
		var parentStore = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'ajax',
				actionMethod: 'post',
				url: admin + '/main!menu.action',
				reader: {
					type: 'json'
				}
			},
			fields: ['id', 'text']
		});
		var typeStore = Ext.create('Ext.data.Store', {
			fields: ['value', 'name'],
			data: [
				{name: '系统菜单', value: 1},
				{name: '功能按钮', value: 2}
			]
		});
		var addTypeCombo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: '资源类型',
			store: typeStore,
			queryMode: 'local',
			triggerAction: 'all',
			displayField: 'name',
			valueField: 'value',
			editable: true,
			forceSelection: false,
			allowBlank: false,
			editable: false,
			name: 'resourceType'
		});
		var editTypeCombo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: '资源类型',
			store: typeStore,
			queryMode: 'local',
			triggerAction: 'all',
			displayField: 'name',
			valueField: 'value',
			editable: true,
			forceSelection: false,
			allowBlank: false,
			editable: false,
			name: 'resourceType'
		});
		var parentCombo = Ext.create('net.shangtech.ext.util.TreeComboBox', {
			fieldLabel: '上级资源',
			name: 'parentId',
			url: admin + '/main!menu.action',
			root: {
				id: '0',
				text: '系统资源',
				expanded: true
			}
		});
		this.addWin = Ext.create('net.shangtech.ext.util.FormWindow', {
			width:300,
			url: admin + '/security/resource!add.action',
			title: '添加资源',
			owner: me,
			fields: [
				parentCombo,
				{fieldLabel: '资源名称', name: 'resourceName', allowBlank: false},
				{fieldLabel: '资源编码', name: 'resourceCode', allowBlank: false},
				addTypeCombo,
				{fieldLabel: '资源路径', name: 'resourceUri'},
				{fieldLabel: '备注说明', name: 'memo', xtype: 'textareafield'}
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
			url: admin + '/security/resource!edit.action',
			title: '编辑资源',
			owner: me,
			fields: [
				{name: 'id', hidden: true, allowBlank: false},
				{fieldLabel: '资源名称', name: 'resourceName', allowBlank: false},
				{fieldLabel: '资源编码', name: 'resourceCode', allowBlank: false},
				editTypeCombo,
				{fieldLabel: '资源路径', name: 'resourceUri'},
				{fieldLabel: '备注说明', name: 'memo', xtype: 'textareafield'}
			],
			buttons: [
				{text: '确定', type: 'submit'},
				{text: '重置', type: 'reset'},
				{text: '取消', type: 'cancel'}
			],
			onSuccess: me.onEditSuccess
		});
		this.callParent(arguments);
	},
	border: false,
	rootVisible: false
});
Ext.define('net.shangtech.ext.data.Resource', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id',			type: 'int'},
		{name: 'resourceName', 	type: 'string'},
		{name: 'resourceCode', 	type: 'string'},
		{name: 'resourceType', 	type: 'int'},
		{name: 'resourceUri', 	type: 'string'},
		{name: 'parentId', 		type: 'int'},
		{name: 'iconCls', 		type: 'string'},
		{name: 'leaf', 			type: 'boolean'},
		{name: 'memo', 			type: 'string'},
		{name: 'sort', 			type: 'int'}
	]
});