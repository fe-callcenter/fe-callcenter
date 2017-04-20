/**
 * jQuery 扩展函数
 * 
 * jquery-extend - v1.0.0 - 2017-04-15 Copyright (c) 2017 jack
 */

(function($){
	
	$.layer={
			/********************************alert********************************/
			alert:function(text,options){
				if(!options){
					options= {
							time : 5000,
							resize : false,
							zIndex : layer.zIndex,
							anim : Math.ceil(Math.random() * 6)
						}
				}
				return parent.layer.alert(text,options);
			},
			// 成功提示
			alertS : function(text, title) {
				return $.layer.alert(text, {
					title : title,
					icon : 1,
					time : 5000,
					resize : false,
					zIndex : layer.zIndex,
					anim : Math.ceil(Math.random() * 6)
				});
			},
			// 错误提示
			alertE : function(text, title) {
				return $.layer.alert(text, {
					title : title,
					icon : 2,
					time : 5000,
					resize : false,
					zIndex : layer.zIndex,
					anim : Math.ceil(Math.random() * 6)
				});
			},
			// 信息提示,不带图标
			alertI : function(text) {
				return $.layer.alert(text);
			},
			/********************************msg********************************/
			//信息提示不带按钮
			msg:function(context,options){
				return parent.layer.msg(context,options);
			},
			//信息提示 错误图标
			msgE:function(context,options){
				return $.layer.msg(context,{
					icon:2,
					shade :0.1,
					shadeClose:true
				});
			},
			/********************************load********************************/
			//加载层
			load:function(icon,options){
				if(!options){
					options={};
					options.shade=0.1;
				}
				return parent.layer.load(icon,options);
			},
			close:function(index)
			{
				parent.layer.close(index);
			},
			/********************************confirm********************************/
			confirmContext:function(content,title,btn,callBack,options){
				console.log(callBack);
				if(!options){
					options={};
				}
				options.title=title;
				options.resize=false;
				options.btn=btn;
				options.btnAlign='c';
				parent.layer.confirm(content, options, function(index) {
					callBack(index);
				});
			},
			/********************************open********************************/
			open:function(options){
				return parent.layer.open(options);
			},
			//打开一个url
			openUrl:function(url,title,options){
				if(!title) title="信息";
				if(!options){
					options={};
					options.area=["850px","600px"];
				}
				options.type=2;
				options.content=url;
				options.title=title;
				options.btnAlign='c';
				return $.layer.open(options);
			},
			//打开一个div
			openContent:function(content,title,options){
				if(!title) title="信息";
				if(!options){
					options={};
					options.area=["550px","400px"];
				}
				options.type=1;
				options.content=content;
				options.title=title;
				options.btnAlign='c';
				return $.layer.open(options);
			},
			//打开一个tab
			openTab:function(url,options){
				if(!options){
					options={};
					options.area=["850px","600px"];
				}
				options.type=2;
				options.content=url;
				options.btnAlign='c';
				return $.layer.open(options);
			}
	}
	
}(jQuery));