<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="${param.subMainId}" style="width:100%;height:100%;"></div>
<script type="text/javascript">
Ext.require('net.shangtech.ext.sys.security.UserGridPanel');
var _userGridPanel = Ext.create('net.shangtech.ext.sys.security.UserGridPanel', {
	id: '${param.subMainId}'
});
var _w = mainPage.mainTabs.getActiveTab().getWidth();
var _h = mainPage.mainTabs.getActiveTab().getHeight();
_userGridPanel.width = _w;
_userGridPanel.height = _h;
_userGridPanel.render('${param.subMainId}');
</script>