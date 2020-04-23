$(function() {
	//获取下拉框的值
	var select=$('#page_select')
	
	select.change(function() {　　　　　　　
		var p1 = $(this).children('option:selected').val(); //这就是selected的值  
　　　　location.href = 'read.html?index=' + p1 + '&id=' + id;　　　　
	})
	
	//获取章节，id
	var chapter = localStorage.getItem('chapters');
	var item = chapter == undefined ? null : JSON.parse(chapter);
	
	var id = localStorage.getItem('id');
	var ids = id == undefined ? null : JSON.parse(id);
	
	console.log(item)
	//数据请求加载中
	$('#page_select').loading(1);
	//获取查询章节参数
	var queryParams = location.search.slice(1).split('&'); //['type=meizhuang', 'id=mz1']

	var params = {};

	$.each(queryParams, function (i, v) {
		var paramsValue = v.split('=');
		params[paramsValue[0]] = paramsValue[1];
	})
	



	var images = [];
	var index = parseInt(params.index)
	var id =parseInt(params.id)
	var headertit = item.aka[0]
$('.next').on('click', function() {　　　　　　
		
		if(index==images.length){
			
			if(confirm("当前章节已读完,是否跳到下一章")){
				nextmulus()
	
			}
		}else{
			index=index+1
			location.href = 'read.html?index=' + index + '&id=' + id;
		}
		
　　　　　　　　　
	})

$('.comic-name').on('click', function() {　　
	console.log('1')
	　location.href = 'read.html'
		
	})

$('#premulu').on('click', function() {　　
	　　premulus()
		
	})

$('#nextmulu').on('click', function() {　　
	　　nextmulus()

	})

$('.prve').on('click', function() {　　　　　　
		
		if(index==1){
			if(confirm("当前页面是第一页,是否跳到上一章")){
				premulus()
	
			}
			
		}else{
			index=index-1
			location.href = 'read.html?index=' + index + '&id=' + id;
		}
		
　　　　　　　　　
	})

	$.get({
		//请求服务器地址
		url: `https://www.mangaeden.com/api/chapter/${item.chapters[id][3]}`,
		// url:'https://baidu.com',
		// url:'shopcart',
		//  url: 'C:/Program%20Files/feiq/Recv%20Files/day36/shopcart.html',

		//jsonp数据类型
		dataType: 'json',

		//请求成功
		success: function(data) {

			images = data.images.slice().reverse();
			//data: 服务器响应的数据
			addheader(headertit, images)
			console.log(images)
			$('.loadingbg').hide();
		},

		//请求失败
		error: function(err) {
			console.log('err ==>', err);
			$('.loadingbg').hide();
		}
	})
	
	 $.MsgBox = {
        Alert: function(title, msg) {
            GenerateHtml("alert", title, msg);
            btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo();
        },
        Confirm: function(title, msg, callback) {
            GenerateHtml("confirm", title, msg);
            btnOk(callback);
            btnNo();
        }
    }
	  //生成Html
    var GenerateHtml = function(type, title, msg) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';
        _html += '<a id="mb_ico">x</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
        if (type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
        }
        if (type == "confirm") {
            _html += '<input id="mb_btn_ok" type="button" value="确定" />';
            _html += '<input id="mb_btn_no" type="button" value="取消" />';
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html);
        //生成Css
        GenerateCss();
    }

    //生成Css
    var GenerateCss = function() {
        
        //右上角关闭按钮hover样式
        
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //让提示框居中
        $("#mb_con").css({
            top: (_height - boxHeight) / 2 + "px",
            left: (_widht - boxWidth) / 2 + "px"
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        $("#mb_btn_ok").click(function() {
            $("#mb_box,#mb_con").remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        $("#mb_btn_no,#mb_ico").click(function() {
            $("#mb_box,#mb_con").remove();
        });
    }
	function addheader(tit, im) {
		var $divheader = $(`<div class="crumbs">
            	<a href="../index.html" title="歪果仁漫画漫画">歪果仁漫画</a>  &gt; 
            	<a class="comic-name"  href="detail.html?id=${ids}">${tit}</a>
        	</div>
        	<h1 class="title">${tit}第${item.chapters[id][0]}话<span>(<span class="showcurindex">${index}</span>/${im.length})</span></h1>`)

		$('#header-box').append($divheader);

		var $divimg = $(`<img class="item-img col-xs-8  col-xs-offset-2" data-original="http://cdn.mangaeden.com/mangasimg/${im[index-1][1]}">`)

		$('#img-box').append($divimg);
		$("img").lazyload({
			placeholder : "../img/loading1.gif", //用图片提前占位
			effect: "fadeIn"
		});
		for(var j = 1; j < im.length + 1; j++) {

			var $divsele = $(`<option value="${j}" >第${j}页</option>`);
			$('#page_select').append($divsele);
		}
		select[0].children[index-1].selected=true

	}
	function premulus() {
		　if(id==item.chapters.length){
			$.MsgBox.Alert("消息", "已经是第一章了");
		}else{
			id=id+1
			console.log(id,'id')
			location.href = 'read.html?index=' + 1 + '&id=' + id;
		}
	}
	function nextmulus() {
		　if(id==0){
			$.MsgBox.Alert("消息", "已经是最后一章了");
		}else{
			id=id-1
			location.href = 'read.html?index=' + 1 + '&id=' + id;
		}
	}
	
})