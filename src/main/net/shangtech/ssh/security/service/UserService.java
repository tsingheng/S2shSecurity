package net.shangtech.ssh.security.service;

import net.shangtech.ssh.core.BaseDao;
import net.shangtech.ssh.core.BaseService;
import net.shangtech.ssh.security.dao.UserDao;
import net.shangtech.ssh.security.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 文件名： UserService.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午9:37:51 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Service
@Transactional
public class UserService extends BaseService<User> {
	@Autowired private UserDao dao;
	@Override
	protected BaseDao<User> dao() {
		return dao;
	}

}

  	