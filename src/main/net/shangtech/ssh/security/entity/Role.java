package net.shangtech.ssh.security.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import net.shangtech.ssh.core.IBaseEntity;

/**
 * 文件名： Role.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午2:36:31 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Table
@Entity
public class Role extends IBaseEntity {
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么)
	 * @since v1.0
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "ROLE_NAME")
	private String roleName;
	
	@Column(name = "ROLE_CODE")
	private String roleCode;
	
	@Column(name = "MEMO")
	private String memo;
	
	@Column(name = "ICON_CLS")
	private String iconCls;
	
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	
}

  	