Ext.define('net.shangtech.ext.util.GridPanel', {
	url: null,
	delUrl: null,
	sortUrl: null,
	model: null,
	actions: [],
	tbar: null,
	bbar: null,
	page: true,
	menu: null,
	pageSize: 20,
	border: false,
	extend: 'Ext.grid.Panel',
	initComponent: function(){
		var me = this;
		if(!me.store){
			me.store = Ext.create('Ext.data.JsonStore', {
				proxy: {
					type: 'ajax',
					url: me.url,
					actionMethods: 'post',
					reader: {
						type: 'json',
						root: 'rows',
						totalProperty: 'total'
					}
				},
				model: me.model,
				autoLoad: true
			});
		}
		if(me.page && !me.bbar){
			me.bbar = Ext.create('Ext.toolbar.Paging', {
				store: me.store,
				pageSize: me.pageSize,
				displayInfo: true
			});
		}
		if(!me.menu){
			me.menu = Ext.create('Ext.menu.Menu', {
				width: 100,
				floating: true,
				items: []
			});
		}
		if(!me.tbar){
			me.tbar = [];
		}
		Ext.each(me.actions, function(obj, index, array){
			if(obj.showBar){
				me.tbar.push(obj);
				if(obj.space){
					me.tbar.push('-');
				}
			}
			if(obj.showMenu){
				if(obj.type == 'sort'){
					obj.menu = [
						{text: '置顶', handler: me.onSortFirst, scope: me},
						{text: '上移', handler: me.onSortUp, scope: me},
						{text: '下移', handler: me.onSortDown, scope: me},
						{text: '置底', handler: me.onSortLast, scope: me}
					];
				}
				me.menu.add(obj);
			}
		});
		this.callParent(arguments);
	},
	listeners: {
		itemcontextmenu: function(view, record, item, index, e, eOpts){
			e.preventDefault();
			this.menu.showAt(e.getXY());
		}
	},
	forceFit: true,
	check: function(){
		var _sm = this.getSelectionModel();
		var _count = _sm.getCount();
		if(_count <= 0){
			Ext.MessageBox.alert('系统提示', '未选择记录');
			return false;
		}
		return _sm.getSelection();
	},
	onAddClick: function(){
		this.addWin.reset();
		this.addWin.show();
	},
	onAddSuccess: function(_form, _action){
		if(_action.result.success == true){
			this.addWin.hide();
			this.getStore().reload();
		}
	},
	onSortFirst: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		if(!_curr.previousSibling){
			Ext.MessageBox.alert('系统消息', '该记录已经是第一条');
			return;
		}
		var me = this;
		Ext.MessageBox.confirm('系统消息', '确定要将该记录置顶吗', function(_btn){
			if(_btn != 'yes')
				return;
			Ext.Ajax.request({
				url: me.sortUrl,
				params: {
					id: _curr.get('id'),
					sortType: 'first'
				},
				success: me.onSortSuccess,
				scope: me
			});
		});
	},
	onSortUp: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		if(!_curr.previousSibling){
			Ext.MessageBox.alert('系统消息', '该记录已经是第一条');
			return;
		}
		var me = this;
		Ext.Ajax.request({
			url: me.sortUrl,
			params: {
				id: _curr.get('id'),
				sortType: 'up'
			},
			success: me.onSortSuccess,
			scope: me
		});
	},
	onSortDown: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		if(_curr.get('sort') <= 1){
			Ext.MessageBox.alert('系统消息', '该记录已经是最后一条');
			return;
		}
		var me = this;
		Ext.Ajax.request({
			url: me.sortUrl,
			params: {
				id: _curr.get('id'),
				sortType: 'down'
			},
			success: me.onSortSuccess,
			scope: me
		});
	},
	onSortLast: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		if(_curr.get('sort') <= 1){
			Ext.MessageBox.alert('系统消息', '该记录已经是最后一条');
			return;
		}
		var me = this;
		Ext.MessageBox.confirm('系统消息', '确定要将该记录移到最后一条吗', function(_btn){
			if(_btn != 'yes')
				return;
			Ext.Ajax.request({
				url: me.sortUrl,
				params: {
					id: _curr.get('id'),
					sortType: 'last'
				},
				success: me.onSortSuccess,
				scope: me
			});
		});
	},
	onSortSuccess: function(response){
		var result = Ext.decode(response.responseText);
		if(result.success == true){
			this.getStore().reload();
		}else{
			Ext.MessageBox.alert('系统消息', result.msg);
		}
	},
	onEditSuccess: function(_form, _action){
		if(_action.result.success == true){
			this.editWin.hide();
			this.getStore().reload();
		}
	},
	onEditClick: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		this.editWin.load(_curr);
		this.editWin.show();
	},
	onDelClick: function(){
		var result = this.check();
		if(!result)
			return;
		var _curr = result[0];
		var me = this;
		Ext.MessageBox.confirm('系统提示', '确定要删除所选记录吗', function(btn){
			if(btn != 'yes')
				return;
			Ext.Ajax.request({
				url: me.delUrl,
				params: {
					id: _curr.get('id')
				},
				success: function(response){
					var result = Ext.decode(response.responseText);
					if(!result.success){
						Ext.MessageBox.alert('系统提示', result.msg);
						return;
					}
					me.getStore().reload();
				}
			});
		});
	}
});