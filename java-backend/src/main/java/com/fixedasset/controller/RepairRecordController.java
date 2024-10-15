package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.Location;
import com.fixedasset.entity.RepairRecord;
import com.fixedasset.service.RepairRecordService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.List;

@Tag(name = "Asset Repair Record")
@RestController
@RequestMapping("/asset/asset-repair")
public class RepairRecordController {
    @Resource RepairRecordService repairRecordService;
 //   @Resource RepairRecord repairRecord;

    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody RepairRecord repairRecord) {
        Page page = new Page(repairRecord.getPage(),repairRecord.getLimit());
        LambdaQueryWrapper<RepairRecordListDto> queryWrapper = Wrappers.lambdaQuery();

        if (repairRecord.getRepairInvoiceDateFrom() != null && repairRecord.getRepairInvoiceDateTo() != null) {
            queryWrapper.between(RepairRecord::getMaintenanceDate, repairRecord.getRepairInvoiceDateFrom(), repairRecord.getRepairInvoiceDateTo());
        }
        queryWrapper.eq(RepairRecord::getStatus, 1);
        Page<RepairRecordListDto> iPage = repairRecordService.newPage(page, queryWrapper);
        return Result.succ(iPage);
    }

    @Operation(summary = "Batch to import Asset Repair Record")
    @PostMapping("/batch-create")
    public Result batchCreate(@RequestBody List<RepairRecord> rapairRecords) {
        repairRecordService.importData(rapairRecords);
        return Result.succ(rapairRecords);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(repairRecordService.findOneById(id));
    }

    @Operation(summary = "Update")
    @PostMapping("/update")
     public Result update(@RequestBody RepairRecord repairRecord) {
        repairRecordService.update(repairRecord);
        return Result.succ(repairRecord);
    }

    @Operation(summary = "Create")
    @PostMapping("/create")
     public Result create(@RequestBody RepairRecord repairRecord) {
        repairRecordService.createNew(repairRecord);
        return Result.succ(repairRecord);
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public Result voidOne(@PathVariable("id") Long id) {
        repairRecordService.voidRecord(id);
        return Result.succ(id);
    }
}
