package com.fixedasset.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fixedasset.entity.TaxableCountry;

import java.util.List;

public interface TaxableCountryService extends IService<TaxableCountry> {
    TaxableCountry createNew(TaxableCountry taxableCountry);

    TaxableCountry update(TaxableCountry taxableCountry);

    TaxableCountry findOne(Long id);

    List<TaxableCountry> getAll();

    String voidData(Long id);
}
