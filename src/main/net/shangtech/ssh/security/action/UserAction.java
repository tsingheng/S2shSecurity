package net.shangtech.ssh.security.action;

import java.util.List;

import net.shangtech.ssh.core.BaseAction;
import net.shangtech.ssh.core.BaseService;
import net.shangtech.ssh.core.Page;
import net.shangtech.ssh.security.entity.Role;
import net.shangtech.ssh.security.entity.User;
import net.shangtech.ssh.security.service.RoleService;
import net.shangtech.ssh.security.service.UserService;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 文件名： UserAction.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-21 下午2:46:36 v1.0<br/>
 * 日期： 2014-1-21<br/>
 * 描述：
 */
@Results({
	@Result(name = ResourceAction.SUCCESS, location = "security/user.jsp")
})
public class UserAction extends BaseAction<User> {
	@Autowired private UserService service;
	@Autowired private RoleService roleService;
	@Override
	protected BaseService<User> service() {
		return service;
	}

	@Override
	protected void list() {
		Page<User> page = new Page<User>(super.getLimit());
		page.setStart(super.getStart());
		page = service.find(page);
		JSONObject result = new JSONObject();
		result.put("success", true);
		result.put("total", page.getTotalCount());
		JSONArray array = new JSONArray();
		for(User user : page.getResult()){
			JSONObject obj = (JSONObject) JSON.toJSON(user);
			if(user.getRole() != null){
				obj.put("roleName", user.getRole().getRoleName());
				obj.put("role.id", user.getRole().getId());
			}
			array.add(obj);
		}
		result.put("rows", array);
		outJson(result.toJSONString());
	}
	
	/**
	 * 作者： 宋相恒<br/>
	 * 版本： 2014-1-21 下午10:24:39 v1.0<br/>
	 * 日期： 2014-1-21<br/>
	 * @return<br/>
	 * 描述：编辑用户信息角色下拉框数据源
	 */
	public String role(){
		List<Role> list = roleService.find();
		JSONArray array = new JSONArray();
		for(Role role : list){
			JSONObject obj = new JSONObject();
			obj.put("name", role.getRoleName());
			obj.put("value", role.getId());
			array.add(obj);
		}
		outJson(array.toJSONString());
		return null;
	}

}

  	