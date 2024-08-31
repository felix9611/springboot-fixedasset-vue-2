package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
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

    public String voidData(Long id) {
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

        return  "This data was void" + taxableCountry;
    }
    public TaxableCountry createNew(TaxableCountry taxableCountry) {
        taxableCountry.setCreated(LocalDateTime.now());
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

    public List<TaxableCountry> getAll() {
        return  taxableCountryMapper.getALL();
    }
    public int createdAction(ActionRecord actionRecord) {

        return actionRecordMapper.insert(actionRecord);
    }
}
