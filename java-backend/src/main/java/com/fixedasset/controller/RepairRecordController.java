package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.RepairRecordListDto;
import com.fixedasset.entity.RepairRecord;
import com.fixedasset.service.RepairRecordService;

import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
@RestController
@RequestMapping("/asset/asset-repair")
public class RepairRecordController {
    @Resource RepairRecordService repairRecordService;
 //   @Resource RepairRecord repairRecord;


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

    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(repairRecordService.findOneById(id));
    }

    @PostMapping("/update")
     public Result update(@RequestBody RepairRecord repairRecord) {
        repairRecordService.update(repairRecord);
        return Result.succ(repairRecord);
    }

    @PostMapping("/create")
     public Result create(@RequestBody RepairRecord repairRecord) {
        repairRecordService.createNew(repairRecord);
        return Result.succ(repairRecord);
    }

    @DeleteMapping("/remove/{id}")
    public Result voidOne(@PathVariable("id") Long id) {
        repairRecordService.voidRecord(id);
        return Result.succ(id);
    }
}
