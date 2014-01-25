<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="${param.subMainId}" style="width:100%;height:100%;"></div>
<script type="text/javascript">
Ext.require('net.shangtech.ext.sys.security.RoleGridPanel');
var _roleGridPanel = Ext.create('net.shangtech.ext.sys.security.RoleGridPanel', {
	id: '${param.subMainId}'
});
var _w = mainPage.mainTabs.getActiveTab().getWidth();
var _h = mainPage.mainTabs.getActiveTab().getHeight();
_roleGridPanel.width = _w;
_roleGridPanel.height = _h;
_roleGridPanel.render('${param.subMainId}');
</script>