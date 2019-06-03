package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.SysFamily;
import com.mright.lover.platform.service.IFamilyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author : zhaochuanzhen
 * @date : 2019/6/3 10:16
 * @Desc:
 */
@RestController
@RequestMapping("/family")
public class FamilyController {

    private final IFamilyService iFamilyService;

    public FamilyController(IFamilyService iFamilyService) {
        this.iFamilyService = iFamilyService;
    }

    @GetMapping("/list")
    public List<SysFamily> listFamily() {
        return iFamilyService.listFamily();
    }

    @GetMapping("/{id}")
    public SysFamily getFamilyById(@PathVariable Integer id) {
        return iFamilyService.getFamilyById(id);
    }

    @PostMapping("/update")
    public String update(SysFamily family) {
        return iFamilyService.update(family);
    }

    @GetMapping("/delete")
    public String delete(Integer id) {
        return iFamilyService.delete(id);
    }
}
