window.onload = function() {
	$('.rit').on('click', function() {
		location.href = 'html/more.html?select=1'
	})
	$('#gomore').on('click', function() {
		location.href = 'html/more.html?select=1'
	})
	$('#somemore').on('click', function() {
		location.href = 'html/more.html?select=2'
	})
	$('.rit').loading();
	var manhua = localStorage.getItem('manhua');
	var manhualist = manhua == undefined ? null : JSON.parse(manhua);
	if(manhualist) {
		$('.loadingbg').hide();
		adddiv(manhualist);
		addEvent();
		addphdiv(manhualist);
		addph();
	}
	if(!manhualist) {
		$.get({
			//请求服务器地址
			url: 'https://www.mangaeden.com/api/list/0/',
			// url:'https://baidu.com',
			// url:'shopcart',
			//  url: 'C:/Program%20Files/feiq/Recv%20Files/day36/shopcart.html',

			//jsonp数据类型
			dataType: 'json',

			//请求成功
			success: function(data) {

				console.log('success1111111');
				$('.loadingbg').hide();
				//data: 服务器响应的数据
				var d = data.manga;

				localStorage.setItem('manhua', JSON.stringify(d));

				adddiv(d);
				addEvent();
				addphdiv(d);
				addph();
			},

			//请求失败
			error: function(err) {
				console.log('err ==>', err);
			}
		})
	}

	function adddiv(d) {
		var now = d.slice(0, 6);
		d.sort(function(a, b) {
			var x = a.h;
			var y = b.h;
			return x > y ? -1 : x < y ? 1 : 0;
		});
		var hot = d.slice(0, 6);
		console.log('success', hot);
		for(var i = 0; i < hot.length; i++) {
			var $div = $(`<div class="col-sm-6 col-md-4 col-lg-2 padtop col-xs-6" id="${hot[i].i}"> 
			<div class="img-box"> 
			<img class="img-responsive" data-original="${hot[i].im ?' http://cdn.mangaeden.com/mangasimg/'+hot[i].im:'./img/oo.png'}"/>
			</div> 
			<div class="manhuatit"> ${hot[i].t}</div> 
			<div class="manhuabar">标签：${hot[i].c.join(',')}</div>
			</div>`);

			$('#box').append($div);

		}
		
		var arrIndex = Math.floor(Math.random() * 500);
		now = d.slice(arrIndex,arrIndex+6);
		console.log('success', now);
		for(var j = 0; j < now.length; j++) {
			var $div2 = $(`<div class="col-sm-6 col-md-4 col-lg-2 padtop col-xs-6" id="${now[j].i}">
			<div class="img-box">
			<img class="img-responsive" data-original="${now[j].im ?' http://cdn.mangaeden.com/mangasimg/'+now[j].im:'./img/oo.png'}"/>
			</div>
			<div class="manhuatit"> ${now[j].t} </div>
			<div class="manhuabar">标签： ${now[j].c.join(',')} </div>`);

			$('#box2').append($div2);

		}
		$("img").lazyload({
			placeholder : "./img/loading.gif", //用图片提前占位
			effect: "fadeIn"
		});
	}

	function addphdiv(d) {
		var phbox1 = d.slice(0, 5);
		console.log(phbox1)
		for(var x1 = 0; x1 < phbox1.length; x1++) {
			var $phdiv1 = $(`<div class="ph-img-box"  id="${phbox1[x1].i}">
										<img src="http://cdn.mangaeden.com/mangasimg/${phbox1[x1].im}" class="ph-img-responsive" />
									</div>
									<div class="nub-box color${x1+1}">
										${x1+1}
									</div>
									<div class="ph-manhuatit">
										${phbox1[x1].t} <br>
										题材：${phbox1[x1].c.join(',')}
									</div>`);

			$('#phbox1').append($phdiv1);

		}
		var phbox2 = d.slice(5, 10);
		console.log(phbox2)
		for(var x2 = 0; x2 < phbox1.length; x2++) {
			var $phdiv2 = $(`<div class="ph-img-box" id="${phbox2[x2].i}">
										<img src="http://cdn.mangaeden.com/mangasimg/${phbox2[x2].im}" class="ph-img-responsive" />
									</div>
									<div class="nub-box color${x2+1}">
										${x2+1}
									</div>
									<div class="ph-manhuatit">
										${phbox2[x2].t} <br>
										题材：${phbox2[x2].c.join(',')}
									</div>`);

			$('#phbox2').append($phdiv2);

		}
		var phbox3 = d.slice(18, 23);
		console.log(phbox3)
		for(var x3 = 0; x3 < phbox1.length; x3++) {
			var $phdiv3 = $(`<div class="ph-img-box"  id="${phbox3[x3].i}">
										<img src="http://cdn.mangaeden.com/mangasimg/${phbox3[x3].im}" class="ph-img-responsive" />
									</div>
									<div class="nub-box color${x3+1}">
										${x3+1}
									</div>
									<div class="ph-manhuatit">
										${phbox3[x3].t} <br>
										题材：${phbox3[x3].c.join(',')}
									</div>`);

			$('#phbox3').append($phdiv3);

		}
	}

	function addEvent() {

		var $colItem = $('.padtop');

		$colItem.off('click').on('click', function() {

			//获取当前节点父元素
			var parent = $(this).parents('.row');

			//商品id
			var id = $(this).attr('id');

			//商品id
			localStorage.setItem('id', JSON.stringify(id));
			location.href = 'html/detail.html?id=' + id;

		})
	}
	function addph() {

		var $colItem = $('.ph-img-box');

		$colItem.off('click').on('click', function() {

			//获取当前节点父元素
			var parent = $(this).parents('.row');

			//商品id
			var id = $(this).attr('id');

			//商品id
			localStorage.setItem('id', JSON.stringify(id));
			location.href = 'html/detail.html?id=' + id;

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