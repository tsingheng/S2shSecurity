package net.shangtech.ssh.security.action;

import java.util.ArrayList;
import java.util.List;

import net.shangtech.ssh.core.sort.SortableAction;
import net.shangtech.ssh.core.sort.SortableService;
import net.shangtech.ssh.security.entity.Resource;
import net.shangtech.ssh.security.entity.RoleResources;
import net.shangtech.ssh.security.service.ResourceService;
import net.shangtech.ssh.security.service.RoleResourcesService;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 文件名： Resource.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-17 上午11:16:11 v1.0<br/>
 * 日期： 2014-1-17<br/>
 * 描述：
 */
@Results({
	@Result(name = ResourceAction.SUCCESS, location = "security/resource.jsp")
})
public class ResourceAction extends SortableAction<Resource> {
	@Autowired private ResourceService service;
	@Autowired private RoleResourcesService roleResourcesService;
	@Override
	protected SortableService<Resource> service() {
		return service;
	}
	
	/**
	 * 作者： 宋相恒<br/>
	 * 版本： 2014-1-22 下午4:05:21 v1.0<br/>
	 * 日期： 2014-1-22<br/>
	 * @return<br/>
	 * 描述：编辑资源表单上级菜单下拉框数据源
	 */
	public String parent(){
		JSONObject result = new JSONObject();
		result.put("id", 0);
		result.put("text", "系统资源");
		JSONArray array = new JSONArray();
		if(id != null){
			List<RoleResources> list = roleResourcesService.find(RoleResources.BY_ROLE, id);
			List<Integer> rlist = new ArrayList<Integer>();
			for(RoleResources roleResources : list){
				rlist.add(roleResources.getResourceId());
			}
			array = children(result, rlist);
		}
		outJson(array.toJSONString());
		return null;
	}
	
	private JSONArray children(JSONObject result, List<Integer> rlist){
		Integer id = result.getIntValue("id");
		if(id == null)
			id = 0;
		List<Resource> list = service.find(Resource.BY_PARENT_ORDER, id);
		JSONArray array = new JSONArray();
		for(Resource resource : list){
			JSONObject obj = new JSONObject();
			obj.put("id", resource.getId());
			obj.put("text", resource.getResourceName());
			obj.put("leaf", false);
			if(rlist.contains(resource.getId())){
				obj.put("checked", true);
			}else{
				obj.put("checked", false);
			}
			if(Resource.TYPE_BUTTON.equals(resource.getResourceType()))
				obj.put("leaf", true);
			obj.put("children", children(obj, rlist));
			array.add(obj);
		}
		return array;
	}
	
	protected void delete(){
		//检查是否还有子节点,有子节点不能直接删除
		int children = service.count(Resource.BY_PARENT, id);
		if(children > 0){
			failed("该资源下还有其他资源,不可删除");
			return;
		}
		super.delete();
	}
	
	/**
	 * 作者： 宋相恒<br/>
	 * 版本： 2014-1-21 上午10:07:51 v1.0<br/>
	 * 日期： 2014-1-21<br/>
	 * @return<br/>
	 * 描述：对resource的完整性检查
	 * <ul>
	 * 	<li>编码不可重复</li>
	 * 	<li>上级节点只能是url为空的系统菜单</li>
	 * </ul>
	 */
	@Override
	protected String checkSave(){
		if(StringUtils.isBlank(entity.getResourceName())){
			return "请输入资源名称";
		}
		if(StringUtils.isBlank(entity.getResourceCode())){
			return "请输入资源编码";
		}
		if(null == entity.getResourceType() || entity.getResourceType() < 1 || entity.getResourceType() > 2){
			return "请选择资源类型";
		}
		int count = service.count(Resource.BY_CODE, entity.getResourceCode());
		if(entity.getId() == null){
			if(count > 0){
				return "编码已存在";
			}
		}
		if(entity.getId() != null){
			Resource old = service.find(entity.getId());
			if(old == null){
				return "系统错误";
			}
			if(!old.getParentId().equals(entity.getParentId())){
				return "上级关系不可改变";
			}
			if(!old.getResourceCode().equals(entity.getResourceCode()) && count > 1){
				return "编码重复";
			}
		}
		if(!entity.getParentId().equals(0)){
			Resource parent = service.find(entity.getParentId());
			if(parent == null){
				return "所属资源不存在";
			}
			if(!parent.getResourceType().equals(Resource.TYPE_MENU) || !StringUtils.isBlank(parent.getResourceUri())){
				return "上级资源只能是非页节点的菜单";
			}
		}
		entity.setLeaf(false);
		if(entity.getResourceType().equals(Resource.TYPE_MENU) && StringUtils.isNotBlank(entity.getResourceUri()))
			entity.setLeaf(true);
		return null;
	}

	@Override
	protected void list() {
		List<Resource> list = service.find(Resource.BY_PARENT_ORDER, id);
		JSONArray array = new JSONArray();
		for(Resource resource : list){
			JSONObject obj = (JSONObject) JSON.toJSON(resource);
			obj.put("leaf", false);
			if(Resource.TYPE_BUTTON.equals(resource.getResourceType()))
				obj.put("leaf", true);
			array.add(obj);
		}
		outJson(array.toJSONString());
	}
	
	@Override
	public Object[] getValues(){
		return new Object[]{entity.getParentId()};
	}

}

  	