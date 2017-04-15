//用于ifarme的自适应
function iFrameHeight() { 
	var ifm= document.getElementById("index_main"); 
	var subWeb = document.frames ? document.frames["index_main"].document : ifm.contentDocument; 
	if(ifm != null && subWeb != null) { 
		ifm.height = subWeb.body.scrollHeight; 
	} 
};

function indexCallCenteriFrameHeight() { 
	var ifm= document.getElementById("index_callCenter"); 
	var subWeb = document.frames ? document.frames["index_callCenter"].document : ifm.contentDocument; 
	if(ifm != null && subWeb != null) { 
		ifm.height = subWeb.body.scrollHeight; 
	} 
};

/*function setIframeHeight(id){
	try{
		var iframe = document.getElementById(id);
		if(iframe.attachEvent){
			iframe.attachEvent("onload", function(){
				iframe.height =  iframe.contentWindow.document.documentElement.scrollHeight;
			});
			return;
		}else{
			iframe.onload = function(){
				iframe.height = iframe.contentDocument.body.scrollHeight;
			};
			return;				 
		}	 
	}catch(e){
		throw new Error('setIframeHeight Error');
	}
}*/

/*封装的公共弹出框*/

