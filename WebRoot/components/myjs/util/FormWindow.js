Ext.define('net.shangtech.ext.util.FormWindow', {
	extend: 'Ext.window.Window',
	autoHeight: true,
	maxWidth: 800,
	maxHeight: 600,
	fields: null,
	form: null,
	closeAction: 'hide',
	modal: true,
	buttonAlign: 'center',
	resizable: false,
	url: null,
	collapsible: false,
	labelWidth: 55,
	owner: null,
	onSubmitClick: function(){
		if(this.form.getForm().isValid()){
			this.form.getForm().submit({
				url: this.url,
				waitTitle: '系统提示',
				waitMsg: '正在处理,请稍后...',
				success: this.onSuccess,
				failure: this.onFailure,
				scope: this.owner
			});
		}
	},
	onSuccess: null,
	onFailure: function(_form, _action){
		if(_action && _action.result && _action.result.msg){
			Ext.MessageBox.alert('系统提示', _action.result.msg);
			return;
		}
		Ext.MessageBox.alert('系统提示', '系统错误');
	},
	onResetClick: function(){
		this.form.getForm().reset();
	},
	onCancelClick: function(){
		this.hide();
	},
	initComponent: function(){
		var me = this;
		this.form = Ext.create('Ext.form.Panel', {
			layout: 'anchor',
			labelWidth: 55,
			baseCls: 'x-plain',
			bodyStyle: 'padding:8px',
			defaultType: 'textfield',
			fieldDefaults: {
				labelWidth: me.labelWidth
			},
			defaults: {
				anchor: '95%'
			},
			items: me.fields
		});
		this.items = this.form;
		var buttons = this.buttons;
		if(buttons && buttons.length > 0){
			Ext.each(buttons, function(button, index, array){
				if(button.type == 'submit'){
					button.handler = me.onSubmitClick;
				}
				if(button.type == 'reset'){
					button.handler = me.onResetClick;
				}
				if(button.type == 'cancel'){
					button.handler = me.onCancelClick;
				}
				button.scope = me;
			});
		}
		this.callParent(arguments);
	},
	constructor: function(_cfg){
		
		this.callParent(arguments);
	},
	load: function(record){
		this.form.getForm().reset();
		this.form.loadRecord(record);
	},
	reset: function(){
		this.form.getForm().reset();
	}
});