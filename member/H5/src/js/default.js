require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {

	//全局变量
	let userId = localStorage.getItem("userId");
	
	function init() {
		getUserOne()
		
	}


	//获取具体成员信息
	function getUserOne() {
		
		let html = `<div class="mui-button-row">
				<button type="button" class="mui-btn mui-btn-primary updateOk">确认</button>
				<button type="button" class="mui-btn mui-btn-danger updateNo">取消</button>
			</div>`
			
		mui.ajax('/api/getUserOne', {
			data: {
				id: userId
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				console.log(res);
				var str = "";
				res.data.forEach(function(item){
					str +=`
					<div class="mui-input-row">
						<label>用户名</label>
						<input type="text" class="mui-input-clear name" placeholder="${item.name}">
					</div>
					<div class="mui-input-row">
						<label>性别</label>
						<input type="text" class="mui-input-clear sex" placeholder="${item.sex}">
					</div>
					<div class="mui-input-row">
						<label>年龄</label>
						<input type="text" class="mui-input-clear age" placeholder="${item.age}">
					</div>
					<div class="mui-input-row">
						<label>手机号</label>
						<input type="text" class="mui-input-clear iphone" placeholder="${item.iphone}">
					</div>
					<div class="mui-input-row">
						<label>地址</label>
						<input type="text" class="mui-input-clear adress" placeholder="${item.adress}">
					</div>
					<div class="mui-input-row">
						<label>爱好</label>
						<input type="text" class="mui-input-clear hobby" placeholder="${item.hobby = item.hobby ? item.hobby : "无"}">
					</div>`
				})
				document.querySelector(".table").innerHTML = str + html;
				updateOk();
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}
	
	function updateOk(){
		document.querySelector(".updateOk").addEventListener("tap",function(){
			mui.ajax('/api/getUpdate',{
				data:{
					id:userId,
					name:document.querySelector(".name").value || document.querySelector(".name").placeholder,
					age:document.querySelector(".age").value || document.querySelector(".age").placeholder,
					sex:document.querySelector(".sex").value || document.querySelector(".sex").placeholder,
					adress:document.querySelector(".adress").value || document.querySelector(".adress").placeholder,
					iphone:document.querySelector(".iphone").value || document.querySelector(".iphone").placeholder,
					hobby:document.querySelector(".hobby").value || document.querySelector(".hobby").placeholder,
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					console.log(res);
					mui.alert(res.msg,'温馨提示','确认',function (e) {
					  location.href = "../index.html"
					})
					// location.href = "../index.html"
					
				},
				error:function(xhr,type,errorThrown){
					
				}
			});
		})
	}


	init()

})
