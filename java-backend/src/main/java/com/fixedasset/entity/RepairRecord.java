package com.fixedasset.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

import javax.persistence.Transient;
@Data
@TableName("repair_record")
@Component
public class RepairRecord {
    @Schema(description = "The data id, Only apply for response and update apis")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "The asset data Id")
    @TableField("asset_id")
    private int assetId;

    @Schema(description = "The asset repair reason")
    @TableField("repair_reason")
    private String repairReason;

    @Schema(description = "1= Within maintenance period status, 0 = Non of maintenance period status")
    @TableField("maintenance_period")
    private int maintenanceReriod;

    @Schema(description = "Maintenance person name")
    @TableField("maintenance_name")
    private String maintenanceName;

    @Schema(description = "Maintenance date")
    @TableField("maintenance_date")
    private String maintenanceDate;

    @Schema(description = "Finish maintenance date")
    @TableField("maintenance_finish_date")
    private String maintenanceFinishDate;

    @Schema(description = "Repair invoice date")
    @TableField("repair_invoice_date")
    private String repairInvoiceDate;

    @Schema(description = "Repair nO.")
    @TableField("repair_invoice_no")
    private String repairInvoiceNo;

    @Schema(description = "Repair amount")
    @TableField("repair_amount")
    private Double repairAmount;

    
    @Schema(description = "Remark")
    @TableField("remark")
    private String remark;

    @Schema(description = "Created date time,Only apply for response")
    @TableField("created")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    @Schema(description = "Updated date time, Only apply for response")
    @TableField("updated")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;

    @Schema(description = "Active status, 1 = Active, 0 = Void, Only apply for response")
    @TableField("status")
    private int status;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int page;

    @Schema(description = "Only apply for paging in list api")
    @TableField(exist = false)
    private int limit;

    @Schema(description = "Asset Code ,Only apply for response")
    @TableField(exist = false)
    private String assetCode;

    @Schema(description = "Asset Name ,Only apply for response")
    @TableField(exist = false)
    private String assetName;

    @Schema(description = "Repair Invoice Date start from ,Only apply to filter for list api")
    @TableField(exist = false)
    private LocalDateTime repairInvoiceDateTo;

    @Schema(description = "Repair Invoice Date end to ,Only apply to filter for list api")
    @TableField(exist = false)
    private LocalDateTime repairInvoiceDateFrom;
}
