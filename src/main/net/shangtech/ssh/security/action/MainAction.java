package net.shangtech.ssh.security.action;

import java.util.List;

import net.shangtech.ssh.core.BaseAction;
import net.shangtech.ssh.core.BaseService;
import net.shangtech.ssh.security.entity.Resource;
import net.shangtech.ssh.security.entity.User;
import net.shangtech.ssh.security.service.ResourceService;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 文件名： MainAction.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午4:14:46 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Results({
	@Result(name = MainAction.SUCCESS, location = "index.jsp")
})
public class MainAction extends BaseAction<User> {
	@Autowired private ResourceService resourceService;
	public String execute(){
		return SUCCESS;
	}
	
	public String menu(){
		if(id == null){
			id = 0;
		}
		JSONArray array = new JSONArray();
		List<Resource> list = resourceService.find(Resource.BY_PARENT_ORDER, id);
		if(!list.isEmpty()){
			for(Resource resource : list){
				JSONObject obj = new JSONObject();
				obj.put("id", resource.getId());
				obj.put("text", resource.getResourceName());
				obj.put("iconCls", resource.getIconCls());
				obj.put("leaf", resource.getLeaf());
				obj.put("url", resource.getResourceUri());
				array.add(obj);
			}
		}
		outJson(array.toJSONString());
		return null;
	}

	@Override
	protected BaseService<User> service() {
		
		return null;	
	}

	@Override
	protected void list() {}
}

  	