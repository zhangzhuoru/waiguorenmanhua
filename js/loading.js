; (function ($) {
     $.fn.extend({
         loading: function (param) {
             console.log('param',param)
            if(param==1){
                var oSrc=$('<link rel="stylesheet" type="text/css" href="../css/loading.css">')
            }else{
                var oSrc=$('<link rel="stylesheet" type="text/css" href="css/loading.css">')
            }
            
            let htmlEle = `
            <div class="loadingbg">
                <div id="loading">
                    加载中
                </div>
            </div>`
            $("head").eq(0).append(oSrc);
            
            $("body").prepend(htmlEle);
         }
     });
})(jQuery);