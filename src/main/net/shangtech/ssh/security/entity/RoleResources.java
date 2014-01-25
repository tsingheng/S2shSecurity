package net.shangtech.ssh.security.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import net.shangtech.ssh.core.IBaseEntity;

/**
 * 文件名： RoleResources.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午2:36:44 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Table(name = "role_resources")
@Entity
public class RoleResources extends IBaseEntity {
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么)
	 * @since v1.0
	 */
	private static final long serialVersionUID = 1L;
	public static final String BY_ROLE = "where roleId=?";
	
	@Column(name = "ROLE_ID")
	private Integer roleId;
	
	@Column(name = "RESOURCE_ID")
	private Integer resourceId;
	
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Integer getResourceId() {
		return resourceId;
	}
	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	
}

  	