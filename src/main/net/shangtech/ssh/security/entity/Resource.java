package net.shangtech.ssh.security.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import net.shangtech.ssh.core.sort.Sortable;

/**
 * 文件名： Resource.java<br/>
 * 作者： 宋相恒<br/>
 * 版本： 2014-1-16 下午2:36:14 v1.0<br/>
 * 日期： 2014-1-16<br/>
 * 描述：
 */
@Table
@Entity
public class Resource extends Sortable {
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么)
	 * @since v1.0
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "RESOURCE_NAME")
	private String resourceName;
	
	@Column(name = "RESOURCE_CODE")
	private String resourceCode;
	
	@Column(name = "RESOURCE_TYPE")
	private Integer resourceType;
	public static final Integer TYPE_MENU = 1;
	public static final Integer TYPE_BUTTON = 2;
	
	@Column(name = "RESOURCE_URI")
	private String resourceUri;
	
	@Column(name = "PARENT_ID")
	private Integer parentId;
	
	private Integer sort;
	
	@Column(name = "ICON_CLS")
	private String iconCls;
	
	private Boolean leaf;
	
	private String memo;
	
	public static final String BY_PARENT = "where parentId=?";
	public static final String BY_CODE = "where resourceCode=?";
	public static final String BY_PARENT_ORDER = "where parentId=? order by sort desc";
	
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getResourceCode() {
		return resourceCode;
	}
	public void setResourceCode(String resourceCode) {
		this.resourceCode = resourceCode;
	}
	public Integer getResourceType() {
		return resourceType;
	}
	public void setResourceType(Integer resourceType) {
		this.resourceType = resourceType;
	}
	public String getResourceUri() {
		return resourceUri;
	}
	public void setResourceUri(String resourceUri) {
		this.resourceUri = resourceUri;
	}
	public Integer getParentId() {
		if(parentId == null)
			return 0;
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public Boolean getLeaf() {
		return leaf;
	}
	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	@Override
	public String getSortHql() {
		return BY_PARENT;
	}
	
}

  	