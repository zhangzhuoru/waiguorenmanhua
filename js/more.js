window.onload = function() {
	var fenlei = [
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
	var select=$('#page_select')
	var newgroup = [];
	var index=1;
	var page =1;
	adddfenlei()
	console.log('success', $('#box').children);

	function adddfenlei() {
		console.log('111')
		for(var i = 0; i < fenlei.length; i++) {
			var $divfenlei = $(`<div class="fenlei">${fenlei[i]}</div>`);

			$('#fenleibox').append($divfenlei);

		}

	}

	var manhua = localStorage.getItem('manhua');
	var manhualist = manhua == undefined ? null : JSON.parse(manhua);
	if(manhualist) {
		var page = Math.ceil(manhualist.length / 30)
		var hot = manhualist.slice(0, 30);
		newgroup =manhualist
		adddiv(hot,page)

		
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

				console.log('success');

				//data: 服务器响应的数据
				var d = data.manga;

				localStorage.setItem('manhua', JSON.stringify(d));

				adddiv(d)

				
			},

			//请求失败
			error: function(err) {
				console.log('err ==>', err);
			}
		})
	}
	$(".fenlei").click(function() {
		newgroup = [];
		$(".fenleiact").removeClass("fenleiact");
		//"this" is the element clicked on
		$(this).addClass("fenleiact");
		console.log('err ==>', $(this));
		for(var j = 0; j < manhualist.length; j++) {
			for(var k = 0; k < manhualist[j].c.length; k++) {
				if(manhualist[j].c[k].search($(this)[0].innerHTML) != -1) {
					newgroup.push(manhualist[j]);

				}
			}
		}
		index =1
		page = Math.ceil(newgroup.length / 30)
		let hot = newgroup.slice(0, 30);
		console.log('err ==>', hot);
		adddiv(hot,page)

	});
	
	preyeshu(newgroup,page)
	nextyeshu(newgroup,page)
	function preyeshu(d,p) {
		console.log(111)
		$('#premulu').on('click', function() {　　　　
			if(index == 1) {
				return

			} else {
				index = index - 1
				let hot1 = newgroup.slice((index - 1) * 30, index * 30);

				adddiv(hot1,page)
			}

		})
	}
select.change(function() {　　　　　　　
		var p1 = $(this).children('option:selected').val(); //这就是selected的值  
　　　　index =p1

				var hot = newgroup.slice((index - 1) * 30, index * 30);

				adddiv(hot,page)　　
	})
	
	function nextyeshu(d, p) {

		$('#nextmulu').on('click', function(d) {　　　　
				if(index == p) {

					return

				
			} else {
				index = index + 1

				var hot = newgroup.slice((index - 1) * 30, index * 30);

				adddiv(hot,page)
			}
		})

}

function adddiv(hot,page) {
	
	$('#box').empty()
	for(var i = 0; i < hot.length; i++) {
		var $div = $(`<div class="col-sm-6 col-md-4 col-lg-2 padtop col-xs-6" id="${hot[i].i}"> 
			<div class="img-box"> 
			<img class="img-responsive" src="${hot[i].im ?' http://cdn.mangaeden.com/mangasimg/'+hot[i].im:'./img/oo.png'}"/> 
			</div> 
			<div class="manhuatit"> ${ hot[i].t}</div> 
			<div class="manhuabar">标签：${ hot[i].c.join(',')}</div>
			</div>`);
		console.log('hot','http://cdn.mangaeden.com/mangasimg/'+hot[i].im)
		$('#box').append($div);

	}

	$('#page_select').empty()
	for(var j = 1; j < page + 1; j++) {

		var $divsele = $(`<option value="${j}" >第${j}页</option>`);
		$('#page_select').append($divsele);
	}
	addEvent()
	console.log()
	select[0].children[index-1].selected=true
}

function addEvent() {
	
	console.log('111')
	var $colItem = $('.padtop');

	$colItem.off('click').on('click', function() {

		//获取当前节点父元素
		var parent = $(this).parents('.row');

		//商品id
		var id = $(this).attr('id');

		//商品id
		localStorage.setItem('id', JSON.stringify(id));
		location.href = 'detail/detail.html?id=' + id;

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