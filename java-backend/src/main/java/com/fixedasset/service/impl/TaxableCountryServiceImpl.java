package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.TaxInformationUploadData;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.TaxableCountry;
import com.fixedasset.mapper.ActionRecordMapper;
import com.fixedasset.mapper.TaxableCountryMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.service.InvRecordService;
import com.fixedasset.service.TaxableCountryService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaxableCountryServiceImpl extends ServiceImpl<TaxableCountryMapper, TaxableCountry> implements TaxableCountryService {

    @Resource TaxableCountryMapper taxableCountryMapper;

    @Resource TaxableCountry taxableCountry;
    @Resource ActionRecordMapper actionRecordMapper;
    @Resource private ActionRecord actionRecord;

    public void importData(List<TaxInformationUploadData> taxInformationUploadDatas) {
        for (TaxInformationUploadData taxInformationUploadData : taxInformationUploadDatas) {
            taxableCountry.setNationCode(taxInformationUploadData.getNationCode());
            taxableCountry.setNationName(taxInformationUploadData.getNationName());
            taxableCountry.setCountryCode(taxInformationUploadData.getCountryCode());
            taxableCountry.setCountryName(taxInformationUploadData.getCountryName());
            taxableCountry.setTaxType(taxInformationUploadData.getTaxType());
            taxableCountry.setTaxCode(taxInformationUploadData.getTaxCode());
            taxableCountry.setTaxName(taxInformationUploadData.getTaxName());
            taxableCountry.setTaxRate(taxInformationUploadData.getTaxRate());
            taxableCountry.setImportRate(taxInformationUploadData.getImportRate());

            this.createNew(taxableCountry);
        }
    }

    public void voidData(Long id) {
        LambdaQueryWrapper<TaxableCountry> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(TaxableCountry::getStatu, 1);
        queryWrapper.eq(TaxableCountry::getId, id);

        TaxableCountry checkOne = taxableCountryMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(id)) {

            taxableCountry.setId(id);
            taxableCountry.setStatu(0);
            taxableCountry.setUpdated(LocalDateTime.now());
            taxableCountryMapper.updateById(taxableCountry);

            actionRecord.setActionName("Void");
            actionRecord.setActionMethod("DELETE");
            actionRecord.setActionFrom("Taxable Data");
            actionRecord.setActionData(id.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);

        } else {
            throw new RuntimeException("No active data in records!");
        }
    }
    public TaxableCountry createNew(TaxableCountry taxableCountry) {
        LambdaQueryWrapper<TaxableCountry> queryWrapper = Wrappers.lambdaQuery();
        if (StringUtils.isNotBlank(taxableCountry.getNationCode())) {
            queryWrapper.eq(TaxableCountry::getNationCode, taxableCountry.getNationCode());
        }
        if (StringUtils.isNotBlank(taxableCountry.getCountryCode())) {
            queryWrapper.eq(TaxableCountry::getCountryCode, taxableCountry.getCountryCode());
        }
        if (StringUtils.isNotBlank(taxableCountry.getTaxType())) {
            queryWrapper.eq(TaxableCountry::getTaxType, taxableCountry.getTaxType());
        }
        if (StringUtils.isNotBlank(taxableCountry.getTaxCode())) {
            queryWrapper.eq(TaxableCountry::getTaxCode, taxableCountry.getTaxCode());
        }
        queryWrapper.eq(TaxableCountry::getStatu, 1);

        TaxableCountry checkOne = taxableCountryMapper.selectOne(queryWrapper);
        if (checkOne == null) {
            taxableCountry.setCreated(LocalDateTime.now());
            taxableCountry.setStatu(1);
            taxableCountryMapper.insert(taxableCountry);

            actionRecord.setActionName("Save");
            actionRecord.setActionMethod("POST");
            actionRecord.setActionFrom("Taxable Data");
            actionRecord.setActionData(taxableCountry.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);

            return taxableCountry;
        } else {
            throw new RuntimeException("Exist in records!");
        }
    }

    public TaxableCountry update(TaxableCountry taxableCountry) {
        LambdaQueryWrapper<TaxableCountry> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(TaxableCountry::getStatu, 1);
        queryWrapper.eq(TaxableCountry::getId, taxableCountry.getId());

        TaxableCountry checkOne = taxableCountryMapper.selectOne(queryWrapper);
        if (checkOne.getId().equals(taxableCountry.getId())) {
            taxableCountry.setUpdated(LocalDateTime.now());
            taxableCountryMapper.updateById(taxableCountry);

            actionRecord.setActionName("Update");
            actionRecord.setActionMethod("UPDATE");
            actionRecord.setActionFrom("Taxable Data");
            actionRecord.setActionData(taxableCountry.toString());
            actionRecord.setActionSuccess("Success");
            actionRecord.setCreated(LocalDateTime.now());
            this.createdAction(actionRecord);

            return taxableCountry;
        } else {
            throw new RuntimeException("No active data in records!");
        }
    }

    public TaxableCountry findOne(Long id) {
        return this.getById(id);
    }

    public List<TaxableCountry> getAll() {
        return  taxableCountryMapper.getALL();
    }
    public int createdAction(ActionRecord actionRecord) {

        return actionRecordMapper.insert(actionRecord);
    }
}
