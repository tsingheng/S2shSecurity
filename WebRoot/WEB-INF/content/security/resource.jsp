<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="${param.subMainId}" style="width:100%;height:100%;"></div>
<script type="text/javascript">
Ext.require('net.shangtech.ext.sys.security.ResourceGridPanel');
var _resourceGridPanel = Ext.create('net.shangtech.ext.sys.security.ResourceGridPanel', {
	id: '${param.subMainId}'
});
var _w = mainPage.mainTabs.getActiveTab().getWidth();
var _h = mainPage.mainTabs.getActiveTab().getHeight();
_resourceGridPanel.width = _w;
_resourceGridPanel.height = _h;
_resourceGridPanel.render('${param.subMainId}');
</script>