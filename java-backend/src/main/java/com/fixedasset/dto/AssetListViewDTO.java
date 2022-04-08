package com.fixedasset.dto;

import com.fixedasset.entity.AssetList;
import lombok.Data;
import lombok.EqualsAndHashCode;
// import org.springframework.data.annotation.Transient;
import javax.persistence.Transient;
@EqualsAndHashCode(callSuper = true)
@Data
public class AssetListViewDTO extends AssetList {

    @Transient private String typeName;

    @Transient private String typeCode;

    @Transient private String deptName;

    @Transient private String deptCode;

    @Transient private String placeName;

    @Transient private String placeCode;
}
