package net.shangtech.ssh.security.service;

import net.shangtech.ssh.core.BaseDao;
import net.shangtech.ssh.core.BaseService;
import net.shangtech.ssh.security.dao.RoleResourcesDao;
import net.shangtech.ssh.security.entity.RoleResources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 文件名： RoleResourcesService.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午9:43:22 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Service
@Transactional
public class RoleResourcesService extends BaseService<RoleResources> {
	@Autowired private RoleResourcesDao dao;
	@Override
	protected BaseDao<RoleResources> dao() {
		return dao;
	}

}

  	