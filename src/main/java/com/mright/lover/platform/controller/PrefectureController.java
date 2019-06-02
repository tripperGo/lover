package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.Dictionary;
import com.mright.lover.platform.service.IDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prefecture")
public class PrefectureController {

    private final IDictionaryService iDictionaryService;

    @Autowired
    public PrefectureController(IDictionaryService iDictionaryService) {
        this.iDictionaryService = iDictionaryService;
    }

    @PostMapping("update")
    public String update(Dictionary dictionary) {
        return iDictionaryService.update(dictionary);
    }

    @GetMapping("/delete")
    public String delete(Integer id) {
        return iDictionaryService.delete(id);
    }
}
