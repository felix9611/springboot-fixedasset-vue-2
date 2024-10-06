package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.dto.TaxInformationUploadData;
import com.fixedasset.entity.TaxableCountry;

import java.util.List;

public interface TaxableCountryService extends IService<TaxableCountry> {
    TaxableCountry createNew(TaxableCountry taxableCountry);

    TaxableCountry update(TaxableCountry taxableCountry);

    TaxableCountry findOne(Long id);

    List<TaxableCountry> getAll();

    void voidData(Long id);

    void importData(List<TaxInformationUploadData> taxInformationUploadDatas);
}
