package net.shangtech.ssh.security.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import net.shangtech.ssh.core.IBaseEntity;

/**
 * 文件名： User.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午2:36:54 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Table
@Entity
public class User extends IBaseEntity {

	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么)
	 * @since v1.0
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "USER_NAME")
	private String userName;
	
	@Column(name = "PASSWORD")
	private String password;
	
	@Column(name = "REAL_NAME")
	private String realName;
	
	@Column(name = "TEL")
	private String tel;
	
	@Column(name = "EMAIL")
	private String email;
	
	@Column(name = "QQ")
	private String qq;
	
	@Column(name = "FAILED_TIMES")
	private String failedTimes;
	
	@ManyToOne(targetEntity = Role.class, fetch=FetchType.EAGER)
	@JoinColumn(name = "ROLE_ID")
	private Role role;
	
	@Column(name = "MEMO")
	private String memo;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getFailedTimes() {
		return failedTimes;
	}
	public void setFailedTimes(String failedTimes) {
		this.failedTimes = failedTimes;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
}

  	