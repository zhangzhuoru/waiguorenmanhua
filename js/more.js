window.onload = function () {
	var fenlei = [
		"All",
		"Action",
		"Adult",
		"Adventure",
		"Comedy",
		"Doujinshi",
		"Drama",
		"Ecchi",
		"Fantasy",
		"Gender Bender",
		"Harem",
		"Historical",
		"Horror",
		"Josei",
		"Martial Arts",
		"Mature",
		"Mecha",
		"Mystery",
		"One Shot",
		"Psychological",
		"Romance",
		"School Life",
		"Sci-fi",
		"Seinen",
		"Shoujo",
		"Shounen",
		"Slice of Life",
		"Smut",
		"Sports",
		"Supernatural",
		"Tragedy",
		"Webtoons",
		"Yaoi",
		"Yuri"
	];

	var select = $('#page_select')
	var newgroup = [];
	var index = 1;
	var page = 1;
	adddfenlei()

	//获取路由参数
	var queryParams = location.search.slice(1).split('?'); //['type=meizhuang', 'id=mz1']
	var params = {};

	$.each(queryParams, function (i, v) {
		var paramsValue = v.split('=');
		params[paramsValue[0]] = paramsValue[1];
	})
	console.log('success', params);

	//输入框获取焦点时focus，高亮
	$("#searchtxt").focus(function(){
		$(".searchimgbox").attr("src","../img/search2.png");
	});
	$("#searchtxt").blur( function () { 
		$(".searchimgbox").attr("src","../img/search1.png");
	} );


	//做数据缓存，如果数据存在就不用再次请求
	var manhua = localStorage.getItem('manhua');
	var manhualist = manhua == undefined ? null : JSON.parse(manhua);
	if (manhualist) {
		var page = Math.ceil(manhualist.length / 30)
		var hot = manhualist.slice(0, 30);
		newgroup = manhualist
		adddiv(hot, page)
	}
	if (!manhualist) {
		$.get({
			//请求服务器地址
			url: 'https://www.mangaeden.com/api/list/0/',
			// url:'https://baidu.com',
			// url:'shopcart',
			//  url: 'C:/Program%20Files/feiq/Recv%20Files/day36/shopcart.html',

			//jsonp数据类型
			dataType: 'json',

			//请求成功
			success: function (data) {

				console.log('success');

				//data: 服务器响应的数据
				var d = data.manga;

				localStorage.setItem('manhua', JSON.stringify(d));

				adddiv(d)


			},

			//请求失败
			error: function (err) {
				console.log('err ==>', err);
			}
		})
	}

	
	//当选中精选时
	function jingxuan() {
		$("#topbox > li >a").css("color", "#9d9d9d")
		$("#topbox > li").eq(1).css('backgroundColor', '#080808')
		$("#topbox > li>a").eq(1).css('color', '#fff')
		params.select=1
		$(".fenleiact").removeClass("fenleiact");
		$(".fenlei").eq(0).addClass("fenleiact");
		var page = Math.ceil(manhualist.length / 30)
		var hot = manhualist.slice(0, 30);
		newgroup = manhualist
		adddiv(hot, page)
	}
	//当选中分类时
	function morefenlei() {
		$("#topbox > li >a").css("color", "#9d9d9d")
		$("#topbox > li").eq(2).css('backgroundColor', '#080808')
		$("#topbox > li>a").eq(2).css('color', '#fff')
		params.select=2
		$(".fenleiact").removeClass("fenleiact");
		$(".fenlei").eq(1).addClass("fenleiact");
		console.log($(".fenlei").eq(1).html())
		newgroup=[]
		for (var j = 0; j < manhualist.length; j++) {
			for (var k = 0; k < manhualist[j].c.length; k++) {
				if (manhualist[j].c[k].search($(".fenlei").eq(1).html()) != -1) {
					newgroup.push(manhualist[j]);

				}
			}
		}
		index = 1
		page = Math.ceil(newgroup.length / 30)
		let hot = newgroup.slice(0, 30);
		console.log('err ==>', hot);
		adddiv(hot, page)
	}
	if(params.select==1){
		jingxuan()
	}
	if(params.select==2){
		morefenlei()
	}
	//顶部栏的点击高亮特效
	$("#topbox").find('li').click(function () {
		
		
		if($(this).children().html()=='精选'){
			jingxuan()
		}
		if($(this).children().html()=='分类'){
			morefenlei()
		}
	})
	//添加搜索点击事件
	$("#seobut").click( function () { 
		if($("#searchtxt").val().replace(/\s*/g, "")==''){
			return
		}else{
			newgroup=[]
			for (var j = 0; j < manhualist.length; j++) {
				
					if (manhualist[j].t.search($("#searchtxt").val().replace(/\s*/g, "")) != -1) {
						newgroup.push(manhualist[j]);

					}
				
			}
			if (JSON.stringify(newgroup) === '[]') {
				return
			} else {
				index = 1
				page = Math.ceil(newgroup.length / 30)
				let hot = newgroup.slice(0, 30);
				console.log('err ==>', hot);
				adddiv(hot, page)
				console.log($("#searchtxt").val().replace(/\s*/g, ""),page)
			}
		}
		// console.log($("#searchtxt").val())
	});

	//动态添加可选分类
	function adddfenlei() {
		for (var i = 0; i < fenlei.length; i++) {
			var $divfenlei = $(`<div class="fenlei">${fenlei[i]}</div>`);

			$('#fenleibox').append($divfenlei);

		}

	}
	//添加分类点击样式，根据点击内容分类
	$(".fenlei").click(function () {
		newgroup = [];
		$(".fenleiact").removeClass("fenleiact");
		//"this" is the element clicked on
		$(this).addClass("fenleiact");
		console.log('err ==>', $(this));
		if($(this)[0].innerHTML=='All'){
			newgroup=manhualist
		}
		else{
			for (var j = 0; j < manhualist.length; j++) {
				for (var k = 0; k < manhualist[j].c.length; k++) {
					if (manhualist[j].c[k].search($(this)[0].innerHTML) != -1) {
						newgroup.push(manhualist[j]);
	
					}
				}
			}
		}
		
		index = 1
		page = Math.ceil(newgroup.length / 30)
		let hot = newgroup.slice(0, 30);
		console.log('err ==>', hot);
		adddiv(hot, page)

	});
	//上一页
	preyeshu(newgroup, page)
	function preyeshu(d, p) {
		$('#premulu').on('click', function () {
			if (index == 1) {
				return

			} else {
				index = index - 1
				let hot1 = newgroup.slice((index - 1) * 30, index * 30);

				adddiv(hot1, page)
			}

		})
	}
	//选择想要的页数跳转
	select.change(function () {
		var p1 = $(this).children('option:selected').val(); //这就是selected的值 当前选中的页数 

		index = p1

		var hot = newgroup.slice((index - 1) * 30, index * 30);

		adddiv(hot, page)
	})
	//下一页
	nextyeshu(newgroup, page)

	function nextyeshu(d, p) {

		$('#nextmulu').on('click', function (d) {

			if (index == page) {

				return


			} else {
				index = index + 1

				var hot = newgroup.slice((index - 1) * 30, index * 30);

				adddiv(hot, page)
			}
		})

	}
	//局部渲染当前页数的漫画
	function adddiv(hot, page) {
		//先清空
		$('#box').empty()
		//再添加
		for (var i = 0; i < hot.length; i++) {
			var $div = $(`<div class="col-sm-6 col-md-4 col-lg-2 padtop col-xs-6" id="${hot[i].i}"> 
			<div class="img-box"> 
			<img class="img-responsive" data-original="${hot[i].im !== null ? ' http://cdn.mangaeden.com/mangasimg/' + hot[i].im : '../img/oo.png'}"/>
			</div> 
			<div class="manhuatit"> ${ hot[i].t}</div> 
			<div class="manhuabar">标签：${ hot[i].c.join(',')}</div>
			</div>`);
			$('#box').append($div);
			$("img").lazyload({
				placeholder : "../img/loading.gif", //用图片提前占位
				effect: "fadeIn"
			});
		}
		//先清空选择框的数据
		$('#page_select').empty()
		//再添加
		for (var j = 1; j < page + 1; j++) {

			var $divsele = $(`<option value="${j}" >第${j}页</option>`);
			$('#page_select').append($divsele);
		}
		//再添加对应的点击事件
		addEvent()
		//定为选中当前页数
		select[0].children[index - 1].selected = true
	}
	//为漫画添加点击事件
	function addEvent() {

		var $colItem = $('.padtop');

		$colItem.off('click').on('click', function () {

			//获取当前节点父元素
			var parent = $(this).parents('.row');

			//商品id
			var id = $(this).attr('id');

			//商品id
			localStorage.setItem('id', JSON.stringify(id));
			location.href = './detail.html?id=' + id;

		})
	}


	var oplay = document.getElementById('autoplay');
	var oleft = document.getElementById('sleft_btn');
	var oright = document.getElementById('sright_btn');
	var obox = document.getElementById('scrollbox');
	var onav1 = document.getElementsByClassName('nav1')[0];
	var onav2 = document.getElementsByClassName('nav2')[0];
	var obtn1 = document.getElementById('imgbtn1');
	var obtn2 = document.getElementById('imgbtn2');
	var timer = null;

}