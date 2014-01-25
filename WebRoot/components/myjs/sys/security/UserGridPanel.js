Ext.define('net.shangtech.ext.sys.security.UserGridPanel', {
	extend: 'net.shangtech.ext.util.GridPanel',
	url: admin + '/security/user.action',
	delUrl: admin + '/security/user!del.action',
	model: 'net.shangtech.ext.sys.security.User',
	columns: [
		{xtype: 'rownumberer'},
		{text: '用户名', dataIndex: 'userName'},
		{text: '角色', dataIndex: 'roleName'},
		{text: '姓名', dataIndex: 'realName'},
		{text: '电话', dataIndex: 'tel'},
		{text: 'QQ', dataIndex: 'qq'},
		{text: '邮箱', dataIndex: 'email'},
		{text: '状态', dataIndex: 'failedTimes'},
		{text: '备注', dataIndex: 'memo', sortable: false}
	],
	initComponent: function(){
		var me = this;
		me.actions = [
			{text: '添加用户', handler: me.onAddClick, scope: me, iconCls: 'icon-add', showBar: true, showMenu: true, space: true},
			{text: '编辑用户', handler: me.onEditClick, scope: me, iconCls: '', showBar: true, showMenu: true, space: true},
			{text: '删除用户', handler: me.onDelClick, scope: me, iconCls: '', showBar: true, showMenu: true}
		];
		var roleStore = Ext.create('Ext.data.JsonStore', {
			proxy: {
				type: 'ajax',
				url: admin + '/user!role.action',
				actionMethod: 'post',
				reader: {
					type: 'json'
				}
			},
			fields: ['name', 'value']
		});
		var addRoleCombo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: '账户角色',
			store: roleStore,
			triggerAction: 'all',
			displayField: 'name',
			valueField: 'value',
			editable: true,
			forceSelection: true,
			editable: false,
			name: 'role.id'
		});
		var editRoleCombo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: '账户角色',
			store: roleStore,
			triggerAction: 'all',
			displayField: 'name',
			valueField: 'value',
			editable: true,
			forceSelection: true,
			editable: false,
			name: 'role.id'
		});
		this.addWin = Ext.create('net.shangtech.ext.util.FormWindow', {
			width:300,
			url: admin + '/security/user!add.action',
			title: '添加用户',
			owner: me,
			fields: [
				{fieldLabel: '用户账户', name: 'userName', allowBlank: false},
				addRoleCombo,
				{fieldLabel: '姓名', name: 'realName'},
				{fieldLabel: '电话号码', name: 'tel'},
				{fieldLabel: 'QQ', name: 'qq'},
				{fieldLabel: '邮箱', name: 'email'},
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
			url: admin + '/security/user!edit.action',
			title: '编辑用户',
			owner: me,
			fields: [
				{name: 'id', hidden: true, allowBlank: false},
				{fieldLabel: '用户账户', name: 'userName', allowBlank: false},
				editRoleCombo,
				{fieldLabel: '姓名', name: 'realName'},
				{fieldLabel: '电话号码', name: 'tel'},
				{fieldLabel: 'QQ', name: 'qq'},
				{fieldLabel: '邮箱', name: 'email'},
				{fieldLabel: '备注', name: 'memo', xtype: 'textareafield'}
			],
			buttons: [
				{text: '确定', type: 'submit'},
				{text: '重置', type: 'reset'},
				{text: '取消', type: 'cancel'}
			],
			onSuccess: me.onEditSuccess
		});
		this.callParent(arguments);
	}
});
Ext.define('net.shangtech.ext.sys.security.User', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'userName', type: 'string'},
		{name: 'realName', type: 'string'},
		{name: 'role.id', type: 'int'},
		{name: 'roleName', type: 'string'},
		{name: 'email', type: 'string'},
		{name: 'qq', type: 'string'},
		{name: 'tel', type: 'string'},
		{name: 'failedTimes', type: 'int'},
		{name: 'memo', type: 'string'}
	]
});