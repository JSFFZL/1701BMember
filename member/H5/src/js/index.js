//引入配置模块
require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {


	function init() {
		getUser()

	}


	//获取所有的成员信息
	function getUser() {
		mui.ajax('/api/getUser', {
			data: {

			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				render(res);
				// click();
				muiLook();
				muiDelete()
			},
			error: function(xhr, type, errorThrown) {

			}
		});
	}

	//第一种方式 js实现事件绑定
	function click() {
		let btn = [...document.querySelectorAll(".look")]; //

		for (let i = 0; i < btn.length; i++) {
			btn[i].onclick = function() {
				console.log(this.getAttribute("data-id"));
			}
		}
	}


	//第二种方式 mui on 实现事件绑定
	//点击查看的方法
	function muiLook() {
		mui(".list").on("tap", ".look", function() {
			let userId = this.getAttribute("data-id");
			localStorage.setItem("userId", userId); //永久存储
			location.href = "../html/default.html";
		})
	}

	//点击删除的方法
	function muiDelete() {
		mui(".list").on("tap", ".delete", function() {
			let userId = this.getAttribute("data-id");

			mui.confirm('您是否要删除本条数据', '警告', ['确认', '取消'], function(e) {
				// console.log(e.index);
				if(e.index === 0){
					
					//删除数据
					mui.ajax('/api/deleteUser',{
						data:{
							id:userId
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						success:function(res){
							mui.alert(res.msg,'提示','确定',function (e) {
								//dom节点 删除 
								// getUser();
							})
						},
						error:function(xhr,type,errorThrown){
							
						}
					});
				}
			})

		})
	}


	//渲染方法
	function render(res) {
		var str = "";
		res.data.forEach(function(item) {
			str +=
				`<li class="mui-table-view-cell">
				${item.name}
				<button type="button" class="mui-btn mui-btn-blue look" data-id="${item._id}">查看</button>
				<button type="button" class="mui-btn mui-btn-red delete" data-id="${item._id}">删除</button>
			</li>`
		})
		document.querySelector(".list").innerHTML = str;
	}

	init()
})
