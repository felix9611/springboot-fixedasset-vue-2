package com.fixedasset.controller;

import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.FieldMatch;
import com.fixedasset.service.FieldMatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/base/field/match")
public class FieldMatchController {

    @Resource private FieldMatchService fieldMatchService;

    @GetMapping("/{category}/{type}")
    public Result findBqQuery(@PathVariable("category") String category, @PathVariable("type") String type) {
        FieldMatch fieldMatch = new FieldMatch();
        fieldMatch.setFunctionCategoryCode(category);
        fieldMatch.setType(type);

        return Result.succ(fieldMatchService.findBqQuery(fieldMatch));
    }

    @GetMapping("/category/{category}")
    public Result findByCategory(@PathVariable("category") String category) {
        return Result.succ(fieldMatchService.findByCategory(category));
    }

}
