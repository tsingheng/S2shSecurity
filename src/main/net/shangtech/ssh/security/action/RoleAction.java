package net.shangtech.ssh.security.action;

import net.shangtech.ssh.core.BaseAction;
import net.shangtech.ssh.core.BaseService;
import net.shangtech.ssh.core.Page;
import net.shangtech.ssh.security.entity.Role;
import net.shangtech.ssh.security.service.RoleService;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 文件名： RoleAction.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-21 下午10:23:54 v1.0<br/>
 * 日期： 2014-1-21<br/>
 * 描述：
 */
@Results({
	@Result(name = ResourceAction.SUCCESS, location = "security/role.jsp")
})
public class RoleAction extends BaseAction<Role> {
	@Autowired private RoleService service;
	@Override
	protected BaseService<Role> service() {
		return service;
	}
	
	public String auth(){
		if(id == null){
			failed();
			return null;
		}
		entity = service.find(id);
		if(entity == null){
			failed();
			return null;
		}
		String resources = request.getParameter("resources");
		service.auth(id, resources);
		success();
		return null;
	}

	@Override
	protected void list() {
		Page<Role> page = new Page<Role>(getLimit());
		page.setStart(getStart());
		page = service.find(page);
		JSONObject result = new JSONObject();
		result.put("total", page.getTotalCount());
		JSONArray array = new JSONArray();
		for(Role role : page.getResult()){
			JSONObject obj = (JSONObject) JSON.toJSON(role);
			array.add(obj);
		}
		result.put("rows", array);
		outJson(result.toJSONString());
	}
	
}