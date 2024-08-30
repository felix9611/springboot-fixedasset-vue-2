package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fixedasset.dto.AssetListViewDTO;
import com.fixedasset.entity.ActionRecord;
import com.fixedasset.entity.AssetList;
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
    @Resource ActionRecordMapper actionRecordMapper;
    @Resource private ActionRecord actionRecord;
    public TaxableCountry createNew(TaxableCountry taxableCountry) {

        taxableCountryMapper.insert(taxableCountry);

        actionRecord.setActionName("Save");
        actionRecord.setActionMethod("POST");
        actionRecord.setActionFrom("Taxable Data");
        actionRecord.setActionData(taxableCountry.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        return taxableCountry;
    }

    public TaxableCountry update(TaxableCountry taxableCountry) {

        taxableCountryMapper.updateById(taxableCountry);

        actionRecord.setActionName("Update");
        actionRecord.setActionMethod("UPDATE");
        actionRecord.setActionFrom("Taxable Data");
        actionRecord.setActionData(taxableCountry.toString());
        actionRecord.setActionSuccess("Success");
        actionRecord.setCreated(LocalDateTime.now());
        this.createdAction(actionRecord);

        return taxableCountry;
    }

    public TaxableCountry findOne(Long id) {
        return this.getById(id);
    }

    // public List<AssetType> getAll() {
    //        return assetTypeMapper.getALL();
    //    }

    public List<TaxableCountry> getAll() {
        return  taxableCountryMapper.getALL();
    }
    public int createdAction(ActionRecord actionRecord) {

        return actionRecordMapper.insert(actionRecord);
    }
}
