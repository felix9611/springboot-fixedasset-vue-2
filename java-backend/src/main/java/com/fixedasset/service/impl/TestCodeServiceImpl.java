package com.fixedasset.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fixedasset.entity.TestCode;
import com.fixedasset.mapper.TestCodeMapper;
import com.fixedasset.service.TestCodeService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class TestCodeServiceImpl extends ServiceImpl<TestCodeMapper, TestCode> implements TestCodeService {
    @Resource TestCodeMapper testCodeMapper;

    public void createNew(TestCode assetList) {
        String newCode = this.getNewAssetCode();
        assetList.setTestCode(newCode);
        testCodeMapper.insert(assetList);
    }

    public String getNewAssetCode() {
        LambdaQueryWrapper<TestCode> lambdaQueryWrapper = Wrappers.lambdaQuery();
        lambdaQueryWrapper.select(TestCode::getTestCode);

        List<Object> assetCodes = testCodeMapper.selectObjs(lambdaQueryWrapper);
        AtomicReference<Integer> maxAssetCodes = new AtomicReference<>(0);

        assetCodes.forEach(o -> {
            String code = String.valueOf(o);
            if (code.length() >= 6) {
                Integer one = Integer.parseInt(code.substring(code.length() - 5));
                if (one > maxAssetCodes.get()) {
                    maxAssetCodes.set(one);
                }
            }

        });
        return padRight(maxAssetCodes.get() + 1, 6, "0");
    }

    public static String padRight(int oriStr, int len, String alexi) {
        StringBuilder str = new StringBuilder();
        int strlen = String.valueOf(oriStr).length();
        if (strlen < len) {
            for (int i = 0; i < len - strlen; i++) {
                str.append(alexi);
            }
        }
        str.append(oriStr);
        return str.toString();
    }
}
