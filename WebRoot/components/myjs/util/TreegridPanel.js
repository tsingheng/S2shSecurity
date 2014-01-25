Ext.define('net.shangtech.ext.util.TreegridPanel', {
	url: null,
	delUrl: null,
	sortUrl: null,
	nodeParam: 'id',
	model: null,
	actions: [],
	tbar: null,
	menu: null,
	extend: 'Ext.tree.Panel',
	initComponent: function(){
		var me = this;
		if(!me.store){
			me.store = Ext.create('Ext.data.TreeStore', {
				proxy: {
					type: 'ajax',
					url: me.url,
					actionMethods: 'post',
					reader: {
						type: 'json'
					}
				},
				root: {
					id: '0',
					expanded: true
				},
				nodeParam: me.nodeParam,
				model: me.model
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
	forceFit: true,
	listeners: {
		itemcontextmenu: function(view, record, item, index, e, eOpts){
			e.preventDefault();
			this.menu.showAt(e.getXY());
		}
	},
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
			var _node = this.getSelectionModel().getLastSelected();
			if(!_node){
				_node = this.getRootNode();
			}
			_node.collapse();
			_node.set('loaded', false);
			Ext.defer(function(){
				_node.removeAll();
				_node.expand();
			}, 300);
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
			var _node = this.getSelectionModel().getLastSelected();
			if(!_node){
				return;
			}
			_node = _node.parentNode;
			_node.collapse();
			_node.set('loaded', false);
			Ext.defer(function(){
				_node.removeAll();
				_node.expand();
			}, 300);
		}else{
			Ext.MessageBox.alert('系统消息', result.msg);
		}
	},
	onEditSuccess: function(_form, _action){
		if(_action.result.success == true){
			this.editWin.hide();
			var _node = this.getSelectionModel().getLastSelected();
			if(!_node){
				return;
			}
			_node = _node.parentNode;
			_node.collapse();
			_node.set('loaded', false);
			Ext.defer(function(){
				_node.removeAll();
				_node.expand();
			}, 300);
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
					var _node = me.getSelectionModel().getLastSelected();
					if(!_node){
						return;
					}
					_node = _node.parentNode;
					_node.collapse();
					_node.set('loaded', false);
					Ext.defer(function(){
						_node.removeAll();
						_node.expand();
					}, 300);
				}
			});
		});
	}
});