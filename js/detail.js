$(function() {
	var arrIndex = Math.floor(Math.random() * 500);
	console.log(arrIndex)
	var queryParams = location.search.slice(1).split('?'); //['type=meizhuang', 'id=mz1']
	var manhua = localStorage.getItem('manhua');
	var manhualist = manhua == undefined ? null : JSON.parse(manhua);
	var params = {};
	var item = []

	$.each(queryParams, function(i, v) {
		var paramsValue = v.split('=');
		params[paramsValue[0]] = paramsValue[1];
	})
	console.log('success', params);

	function addEvent() {

		var $colItem = $('.manga-chapters');

		$colItem.off('click').on('click', function() {

			//商品id
			var id = $(this).attr('id');

			//商品id

			location.href = '../html/read.html?index=' + 1 + '&id=' + id;

		})
	}
	function reverseimgbox() {

		$('.reverseimgbox>img').on('click', function() {
			console.log(1111111111)
			$('#chaptersbox').empty()
			$('#box3').empty()
			item.chapters.reverse();
			addmulu(item)
			addEvent();
		})
	}

	function moreEvent() {

		var $colItem = $('.padtop');

		$colItem.off('click').on('click', function() {

			//获取当前节点父元素
			var parent = $(this).parents('.row');

			//商品id
			var id = $(this).attr('id');

			//商品id
			localStorage.setItem('id', JSON.stringify(id));
			location.href = 'detail.html?id=' + id;

		})
	}

	$('#zk').off('click').on('click', function() {
		if($('.episode-list')[0].style.webkitLineClamp == "unset"){
			$('.episode-list')[0].style.webkitLineClamp = ""
			$('#zk').text('显示全部章节')
		}
		else{
			$('.episode-list')[0].style.webkitLineClamp = "unset";
			$('#zk').text('回到顶部')
		}
		
	})

	$('#zk').loading(1);

	$.get({
		//请求服务器地址
		url: `https://www.mangaeden.com/api/manga/${params.id}`,
		dataType: 'json',
		//请求成功
		success: function(data) {
			console.log('data', item);
			//data: 服务器响应的数据
			item = data;

			$('.loadingbg').hide();
			item.chapters.map((value,index,array) => {
				　　value.push(index)
				});
			// console.log('data', item.chapters);
			localStorage.setItem('chapters', JSON.stringify(item));
			adddetail(item);
			addmulu(item);
			addEvent();
			reverseimgbox();
		},
		//请求失败
		error: function(err) {
			console.log('err ==>', err);
		}
	})
	$('.rit').on('click', function() {
		location.href = 'html/more.html'
	})
	

			var d = manhualist.slice(arrIndex,arrIndex+12);


			for(var i = 0; i < d.length; i++) {
				var $div = $(`<div class="col-sm-6 col-md-4 col-lg-2 padtop col-xs-6" id="${d[i].i}"> 
			<div class="img-box"> 
				<img class="img-responsive" data-original="${d[i].im ?' http://cdn.mangaeden.com/mangasimg/'+d[i].im:'../img/oo.png'}"/>
			</div> 
			<div class="manhuatit"> ${d[i].t}</div> 
			<div class="manhuabar">标签：${d[i].c.join(',')}</div>
			</div>`);

				$('#box').append($div);
				$("img").lazyload({
					placeholder : "../img/loading.gif", //用图片提前占位
					effect: "fadeIn"
				});
				moreEvent();
			}

	function adddetail(item) {
		var $div2 = $(`<div class="bg-cover"> 
								<img src="${item.image?'http://cdn.mangaeden.com/mangasimg/'+item.image:'../img/oo.png'}" class="bg-tupan"/>
							</div>
							
							<div class="this-box"><h1> ${item.aka[0]}</h1><em class="remind">每周四更新</em><p class="subtitle">作者：${item.author}</p>
								<p class="tip">
									<span class="block">
										状态：连载中
									</span>
									<span class="block ticai">题材：热血 搞笑 奇幻</a></span>
									<span class="block">更新时间：${new Date(parseInt(item.last_chapter_date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}</span>
								</p>
								<p class="tip" style="margin-top:10px;">
									<span class="block">标签：${item.categories.join(',')}</span>
								</p>
								<p class="content" style="position: relative;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;">   ${item.title}漫画：  ${item.description}
								</p>	
							</div>`)

		$('#box2').append($div2);
	}

	function addmulu(item) {
		var $divmulu = $(`
			<span class="episode-title">章节</span>
            <span class="episode-total">全${item.chapters_len}话</span>
			`)

		$('#chaptersbox').append($divmulu);
		for(var j = 0; j < item.chapters.length; j++) {
			var $div3 = $(`<li class="manga-chapters"id='${item.chapters[j][4]}'>${item.chapters[j][0]}</li>`);

			$('#box3').append($div3);
		}
	}
})