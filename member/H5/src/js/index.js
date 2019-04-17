
//引入配置模块
require.config({
	paths:{
		"mui":"libs/mui.min"
	}
})

require(["mui"],function(mui){
	
	mui.ajax('/api/getUser',{
		data:{
			
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(res){
			console.log(res);
			
			var str = "";
			res.data.forEach(function(item){
				str +=`<li class="mui-table-view-cell">
					${item.name}
					<button type="button" class="mui-btn mui-btn-blue look">查看</button>
					<button type="button" class="mui-btn mui-btn-red">删除</button>
				</li>`
			})
			document.querySelector(".list").innerHTML = str;
			
		},
		error:function(xhr,type,errorThrown){
			
		}
	});
	
	
})
