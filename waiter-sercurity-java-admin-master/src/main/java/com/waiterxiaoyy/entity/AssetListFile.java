package com.waiterxiaoyy.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("asset_list_file")
public class AssetListFile extends BaseEntity {

    @TableField("asset_id")
    String assetId;

    @TableField("file_name")
    String fileName;

    @TableField("base64")
    String base64;
}
