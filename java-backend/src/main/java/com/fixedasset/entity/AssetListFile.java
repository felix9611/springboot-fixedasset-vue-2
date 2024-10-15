package com.fixedasset.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@TableName("asset_list_file")
public class AssetListFile extends BaseEntity {

    @Schema(description = "The asset data id")
    @TableField("asset_id")
    private int assetId;

    @Schema(description = "Uploaded file name")
    @TableField("file_name")
    private String fileName;

    @Schema(description = "File content in base64")
    @TableField("base64")
    private String base64;
}
