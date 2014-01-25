package net.shangtech.ssh.security.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import net.shangtech.ssh.core.BaseDao;
import net.shangtech.ssh.core.BaseService;
import net.shangtech.ssh.security.dao.RoleDao;
import net.shangtech.ssh.security.dao.RoleResourcesDao;
import net.shangtech.ssh.security.entity.Role;
import net.shangtech.ssh.security.entity.RoleResources;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 文件名： RoleService.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午9:42:22 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Service
@Transactional
public class RoleService extends BaseService<Role> {
	@Autowired private RoleDao dao;
	@Autowired private RoleResourcesDao roleResourcesDao;
	@Override
	protected BaseDao<Role> dao() {
		return dao;
	}
	
	public void auth(Integer id, String resources){
		if(StringUtils.isBlank(resources)){
			resources = "-1";
		}else{
			List<RoleResources> list = roleResourcesDao.find(RoleResources.BY_ROLE, id);
			Set<Integer> set = new HashSet<Integer>();
			for(RoleResources roleResources : list){
				set.add(roleResources.getResourceId());
			}
			String[] resourceIds = resources.split(",");
			for(String resourceId : resourceIds){
				if(set.contains(Integer.parseInt(resourceId)))
					continue;
				RoleResources roleResources = new RoleResources();
				roleResources.setRoleId(id);
				roleResources.setResourceId(Integer.parseInt(resourceId));
				roleResourcesDao.insert(roleResources);
			}
		}
		roleResourcesDao.execute("delete RoleResources o where roleId=? and resourceId not in (" + resources + ")", id);
	}

}

  	