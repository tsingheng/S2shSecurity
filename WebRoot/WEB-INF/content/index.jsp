<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="function"%>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="${ctx}">
    
    <title>My JSP 'index.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="${ctx}/components/extjs/resources/ext-theme-classic/ext-theme-classic-all.css">
	<script type="text/javascript" src="${ctx}/components/extjs/ext-all.js"></script>
	<script type="text/javascript" src="${ctx}/components/extjs/locale/ext-lang-zh_CN.js"></script>
  </head>
  
  <body>
    <script type="text/javascript">
    var ctx = '${ctx}';
    var admin = '${ctx}';
    var mainPage;
    Ext.onReady(function(){
    	Ext.Loader.setConfig({
    		enabled: true,
    		paths: {
    			'net.shangtech.ext': '${ctx}/components/myjs'
    		}
    	});
    	Ext.require('net.shangtech.ext.MainPage');
    	mainPage = Ext.create('net.shangtech.ext.MainPage', {
    		menuUrl: admin + '/main!menu.action'
    	});
    	window.onresize = function(){
    		setTimeout(mainPage.onActiveTab, 100);
    	}
    });
    </script>
  </body>
</html>
