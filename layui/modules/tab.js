﻿
layui.define(['element'], function (exports) {
    var mod_name = 'tab',
		$ = layui.jquery,
		element = layui.element(),
		globalTabIdIndex = 0,
		Tab = function () {
		    this.config = {
		        elem: undefined,
		        closed: true //是否包含删除按钮
		    };
		};
		
		
    var ELEM = {};
    /**
	 * 参数设置
	 * @param {Object} options
	 */
    Tab.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };
    /**
	 * 初始化
	 */
    Tab.prototype.init = function () {
        var that = this;
        var _config = that.config;
        if (typeof (_config.elem) !== 'string' && typeof (_config.elem) !== 'object') {
            alert('Tab error: elem参数未定义或设置出错，具体设置格式请参考文档API.');
        }
        var $container;
        if (typeof (_config.elem) === 'string') {
            $container = $('' + _config.elem + '');
        }
        if (typeof (_config.elem) === 'object') {
            $container = _config.elem;
        }
        if ($container.length === 0) {
            alert('Tab error:找不到elem参数配置的容器，请检查.');
        }
        var filter = $container.attr('lay-filter');
        if (filter === undefined || filter === '') {
            alert('Tab error:请为elem容器设置一个lay-filter过滤器');
        }
        _config.elem = $container;
        ELEM.titleBox = $container.children('ul.layui-tab-title');
        ELEM.contentBox = $container.children('div.layui-tab-content');
        ELEM.tabFilter = filter;
        return that;
    };
    /**
	 * 查询tab是否存在，如果存在则返回索引值，不存在返回-1
	 * @param {String} 标题
	 */
    Tab.prototype.exists = function (id) {
        var that = ELEM.titleBox === undefined ? this.init() : this,
			tabIndex = -1;
        ELEM.titleBox.find('li').each(function (i, e) {
            if ($(this).attr("lay-id") == id) {
                tabIndex = i;
            };
        });
        return tabIndex;
    };
    /**
	 * 添加选择卡，如果选择卡存在则获取焦点
	 * @param {Object} data
	 */
    Tab.prototype.tabAdd = function (data) {
        var that = this;
        var tabIndex = that.exists(data.id);
        if (tabIndex === -1) {
            globalTabIdIndex++;
            var content = '<iframe src="' + data.href + '" data-id="' + globalTabIdIndex + '"></iframe>';
            var title = '';
            if (data.icon !== undefined) {
                if (data.icon.indexOf('fa-') !== -1) {
                    title += '<i class="' + data.icon + '" aria-hidden="true"></i>';
                } else {
                    title += '<i class="layui-icon">' + data.icon + '</i>';
                }
            }
            title += data.title ;
            title += '<i class="layui-icon layui-unselect layui-tab-close layui-refresh" data-id="' + globalTabIdIndex + '">&#x1002;</i>';
            if (that.config.closed) {
                title += '<i class="layui-icon layui-unselect layui-tab-close layui-close" data-id="' + globalTabIdIndex + '">&#x1006;</i>';
            }
            //添加tab
            element.tabAdd(ELEM.tabFilter, {
                title: title,
                content: content,
                id: data.id
               
            });
            //iframe 自适应
            ELEM.contentBox.find('iframe[data-id=' + globalTabIdIndex + ']').each(function () {
                $(this).height(ELEM.contentBox.height());
            });
            //tab刷新
            ELEM.titleBox.find('li').children('i.layui-refresh[data-id=' + globalTabIdIndex + ']').on('click', function () {
                   that.refreshByIndex($(this).parent('li').index());
                });
            if (that.config.closed) {
                //监听关闭事件
                ELEM.titleBox.find('li').children('i.layui-close[data-id=' + globalTabIdIndex + ']').on('click', function () {
                    element.tabDelete(ELEM.tabFilter, that.getTabId($(this).parent('li').index())).init();
                });
            };
            //切换到当前打开的选项卡
            element.tabChange(ELEM.tabFilter, that.getTabId(ELEM.titleBox.find('li').length - 1));
        } else {
            element.tabChange(ELEM.tabFilter, that.getTabId(tabIndex));
        }
    };
    
    Tab.prototype.refreshByIndex=function(i)
    {
    	var that = ELEM.contentBox === undefined ? this.init() : this;
    	ELEM.contentBox.find('.layui-tab-item').each(function (j, e) {
            if(i==j)
            {
            	var _iframeUrl = $(this).children().attr("src");
            	$(this).children().attr("src",_iframeUrl);
            }
        });
    }
    
    Tab.prototype.refreshByLayId=function(id)
    {
    	var that = ELEM.titleBox === undefined ? this.init() : this;
    	ELEM.titleBox.find('li').each(function (j, e) {
            if($(this).attr("lay-id")==id)
            {
            	that.refreshByIndex(j);
            	return;
            }
        });
    }

    Tab.prototype.getTabId=function(i){
    	var that = ELEM.titleBox === undefined ? this.init() : this,
			tabId = -1;
        ELEM.titleBox.find('li').each(function (j, e) {
            if(i==j)
            {
            	tabId = $(this).attr("lay-id");
            }
        });
        return tabId;
    };
    
    Tab.prototype.on = function (events, callback) {

    }

    var tab = new Tab();
    exports(mod_name, function (options) {
        return tab.set(options);
    });
});