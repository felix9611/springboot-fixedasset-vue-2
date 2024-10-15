package com.fixedasset.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.common.lang.Result;
import com.fixedasset.dto.AssetListUploadDataDto;
import com.fixedasset.dto.AssetListViewDTO;
import com.fixedasset.entity.AssetList;
import com.fixedasset.entity.AssetListFile;
import com.fixedasset.entity.WriteOff;
import com.fixedasset.service.AssetListFileService;
import com.fixedasset.service.AssetListService;
// import org.springframework.util.StringUtils;
import com.fixedasset.service.WriteOffService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Tag(name = "Asset List")
@RestController
@RequestMapping("/asset/assetList")
public class AssetListController extends BaseController {

    @Resource AssetListService assetListService;

    @Resource AssetListFileService assetListFileService;

    @Resource WriteOffService writeOffService;

    @Operation(summary = "Page and list")
    @PostMapping("/listAll")
    public Result listAll(@RequestBody AssetList assetList) {
        Page page = new Page(assetList.getPage(), assetList.getLimit());
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isBlank(assetList.getAssetCode())){
            queryWrapper.like(AssetList::getAssetCode, assetList.getAssetCode());
        }

        if (!StringUtils.isBlank(assetList.getAssetName())){
            queryWrapper.like(AssetList::getAssetName, assetList.getAssetName());
        }

        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getPlaceId() == 0)) {
            queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }

        queryWrapper.orderByDesc(true, AssetList::getAssetCode);
        queryWrapper.eq(AssetList::getStatu, 1);
        Page<AssetListViewDTO> iPage = assetListService.newPage(page, queryWrapper);
        return Result.succ(iPage);
    }

    @Operation(summary = "List all assets")
    @PostMapping("/report/listAll")
    public Result reportListAll(@RequestBody AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.orderByDesc(true, AssetList::getAssetCode);
        queryWrapper.eq(AssetList::getStatu, 1);
        List<AssetListViewDTO> iPage = assetListService.newReport(queryWrapper);
        return Result.succ(iPage);
    }

    @Operation(summary = "Page and list of write off assets")
    @PostMapping("/writeOff/listAll")
    public Result listAllWriteOff(@RequestBody AssetList assetList) {
        LambdaQueryWrapper<AssetList> queryWrapper = Wrappers.lambdaQuery();

        if (!StringUtils.isBlank(assetList.getAssetCode())){
            queryWrapper.like(AssetList::getAssetCode, assetList.getAssetCode());
        }

        if (!StringUtils.isBlank(assetList.getAssetName())){
            queryWrapper.like(AssetList::getAssetName, assetList.getAssetName());
        }

        if (!(assetList.getTypeId() == 0)) {
            queryWrapper.eq(AssetList::getTypeId, assetList.getTypeId());
        }
        if (!(assetList.getPlaceId() == 0)) {
            queryWrapper.eq(AssetList::getPlaceId, assetList.getPlaceId());
        }
        if (!(assetList.getDeptId() == 0)) {
            queryWrapper.eq(AssetList::getDeptId, assetList.getDeptId());
        }

        queryWrapper.orderByDesc(true, AssetList::getAssetCode);
        queryWrapper.eq(AssetList::getStatu, 0);
        List<AssetListViewDTO> iPage = assetListService.newPageInWriteOff(queryWrapper);
        return Result.succ(iPage);
    }

    @Operation(summary = "Get total cost")
    @PostMapping("/getTotalSum")
    public Result getTotalSum(@RequestBody AssetList assetList) {
        return Result.succ(assetListService.sumTotal(assetList));
    }

    @Operation(summary = "Get total cost with Sponsor")
    @PostMapping("/sumCostWithSponsor")
    public Result sumCostWithSponsor(@RequestBody AssetList assetList) {
        return Result.succ(assetListService.sumCostWithSponsor(assetList));
    }

    @Operation(summary = "Batch to import")
    @PostMapping("/batch-create")
    public Result batchCreate(@RequestBody List<AssetListUploadDataDto> uploadDatas) {
        assetListService.importData(uploadDatas);
        return Result.succ(uploadDatas);
    }

    @Operation(summary = "Create")
    @PostMapping("/create")
    public Result create(@RequestBody AssetList assetList) {
        String newAssetCode = assetListService.createNew(assetList);
        return Result.succ(newAssetCode);
    }

    @Operation(summary = "Update")
    @PostMapping("/update")
     public Result update(@RequestBody AssetList assetList) {
        assetListService.update(assetList);
        return Result.succ(assetList);
    }

    @Operation(summary = "Get one by id")
    @GetMapping("/{id}")
    public Result getOne(@PathVariable("id") Long id) {
        return Result.succ(assetListService.findOneById(id));
    }

    @Operation(summary = "Get one by asset code")
    @GetMapping("/assetCode/{assetCode}")
    public Result getOneByAssetCode(@PathVariable("assetCode") String id) {
        AssetList assetList = new AssetList();
        assetList.setAssetCode(id);
        return Result.succ(assetListService.findOneByAssetCode(assetList));
    }

    @Operation(summary = "Void one by id")
    @DeleteMapping("/remove/{id}")
    public Result remove(@PathVariable("id") Long id) {
        assetListService.remove(id);
        return Result.succ(id);
    }

    @Operation(summary = "Find by asset code and name")
    @PostMapping("/findAsset")
    public Result findAsset(@RequestBody AssetList assetList) {
        AssetList assetList1 = assetListService.findOne(assetList);
        return Result.succ(assetList1);
    }

    @Operation(summary = "Upload file")
    @PostMapping("/addFile")
    public Result addFile(@RequestBody AssetListFile assetListFile){
        assetListFileService.saveListPicture(assetListFile);
        return Result.succ(assetListFile);
    }

    @Operation(summary = "Loading file")
    @PostMapping("/loadFile")
    public  Result loadFile(@RequestBody AssetListFile assetListFile) {
        return Result.succ(assetListFileService.getByAssetId(assetListFile));
    }

    @Operation(summary = "Loading file")
    @DeleteMapping("/removeFile/{id}")
    public Result removeFile(@PathVariable("id") Long id) {
        assetListFileService.removeFile(id);
        return Result.succ(id);
    }

    @Operation(summary = "Get cost with department")
    @GetMapping("/getCostWithDept")
    public Result getCostWithDept() { return Result.succ(assetListService.getCostWithDept()); }

    @Operation(summary = "Get all cost per department")
    @PostMapping("/getAssetYearCostDeptFind")
    public Result assetYearCostDeptFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.assetYearCostDeptFind(assetList)); }
    
    @Operation(summary = "Get all items per month")
    @PostMapping("/getItemYearMonthFind")
    public Result getItemYearMonthFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getItemYearMonthFind(assetList)); }
    
    @Operation(summary = "Get all costs per months")
    @PostMapping("/getAssetYearCostTypeFind")
    public Result getAssetYearCostTypeFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.assetYearCostTypeFind(assetList)); }
    
    @Operation(summary = "Get all items per types")
    @PostMapping("/groupByTypeFind")
    public Result groupByTypeFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.groupByTypeFind(assetList)); }
    
    @Operation(summary = "Get all items per places")
    @PostMapping("/getAssetGroupPlaceFind")
    public Result getAssetGroupPlaceFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getAssetGroupPlaceFind(assetList)); }
    
    @Operation(summary = "Get all items per places and months")
    @PostMapping("/getAssetYearQtyTypeFind")
    public Result getAssetYearQtyTypeFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getAssetYearQtyTypeFind(assetList)); }
   
    @Operation(summary = "Get all items per departments and months")
    @PostMapping("/getAssetYearQtyDeptFind")
    public Result getAssetYearQtyDeptFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getAssetYearQtyDeptFind(assetList)); }
    
    @Operation(summary = "Get all costs per months")
    @PostMapping("/getAssetCostYearMonthFind")
    public Result getAssetCostYearMonthFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getAssetCostYearMonthFind(assetList)); }
    
    @Operation(summary = "Get all costs per months")
    @PostMapping("/getAssetYearQtyPlaceFind")
    public Result getAssetYearQtyPlaceFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getAssetYearQtyPlaceFind(assetList)); }
    
    @Operation(summary = "Get all costs per months and locations")
    @PostMapping("/getAssetYearCostPlaceFind")
    public Result getAssetYearCostPlaceFind(@RequestBody AssetList assetList) { return Result.succ(assetListService.getAssetYearCostPlaceFind(assetList)); }

    @Operation(summary = "Write Off asset")
    @PostMapping("/writeOff")
    public Result writeItem(@RequestBody WriteOff writeOff) {
        writeOffService.saveWriteOff(writeOff);
        return Result.succ("");
    }
}
