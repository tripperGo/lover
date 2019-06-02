package com.mright.lover.platform.controller;

import com.mright.lover.platform.entity.Dictionary;
import com.mright.lover.platform.service.IDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author: mright
 * @date: Created in 2019/6/1 6:55 PM
 * @desc:
 */
@RestController
@RequestMapping("/index")
public class IndexController {

    @Autowired
    private IDictionaryService iDictionaryService;

    @GetMapping()
    public String index() {
        return "/index";
    }

    @GetMapping("/dic/{type}")
    public List<Dictionary> listDicByTypeNoRoot(@PathVariable("type") String type){
        return iDictionaryService.listDicByTypeNoRoot(type);
    }

    @GetMapping("/allDic/{type}")
    public List<Dictionary> listAllDicByTypeNoRoot(@PathVariable("type") String type){
        return iDictionaryService.listAllDicByTypeNoRoot(type);
    }
}
