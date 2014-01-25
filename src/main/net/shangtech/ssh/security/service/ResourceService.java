package net.shangtech.ssh.security.service;

import net.shangtech.ssh.core.BaseDao;
import net.shangtech.ssh.core.sort.SortableService;
import net.shangtech.ssh.security.dao.ResourceDao;
import net.shangtech.ssh.security.entity.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 文件名： ResourceService.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午9:41:07 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Service
@Transactional
public class ResourceService extends SortableService<Resource> {
	@Autowired private ResourceDao dao;
	@Override
	protected BaseDao<Resource> dao() {
		return dao;
	}

}

  	