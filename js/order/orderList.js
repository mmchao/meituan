(function(){
	var itemTemp = '<div class="order-item">'+
						'<div class="main">'+
							'<img class="left-img" src=$imgUrl>'+
							'<div class="right-info">'+
								'<div class="right-top-name">'+
                                    '<div class="item-name">$itemName</div>'+  
                                    '<div class="item-statu">$itemStatu</div>'+
                                '</div>'+
                                '<div class="right-middle-pList">$productList</div>'+
                                '<div class="right-bottom-total">$total</div>'+
                            '</div>'+
                        '</div>'+
                       '$commentButton'+
                    '</div>'

    var page = 0, isLoading = false
	// 获取列表进行渲染 
    function initList() {
    	// 模拟加载延迟
        page++
        isLoading = true
        $('.loading').text('加载中');
    	setTimeout(function(){
    		
	    	$.get('../../static/json/orders.json', function(res){		
    			console.log(res)
    			var list = res.data.digestlist || []
    			appendList(list)
                $('.loading').text('加载完成');
	    		isLoading = false
	    	})
    	},1000)
    }

    // 渲染列表
    function appendList(list) {
    	console.log(list)
    	list.forEach(function(item){
    		var str = itemTemp.replace('$imgUrl',item.poi_pic)
    						  .replace('$itemName',item.poi_name)
    						  .replace('$itemStatu',item.status_description)
    						  .replace('$productList',getProductList(item))
    						  .replace('$total',getTotal(item))
    						  .replace('$commentButton',getCommentButton(item))
    		$('.order-wrap').append(str)
    	})

    }


    // 获取商品列表
    function getProductList(item) {

    	var list = item.product_list || [],
    		str = ''

    	list = list.slice(0,3) // 最多显示3个 slice(start,end) 不包含end
    	list.forEach(function(_item){
    		str += '<div class="product-item">'+
    					'<div class="product-name">'+_item.product_name+'</div>'+
    					'<div class="product-count">x'+_item.product_count+'</div>'+
    				'</div>'
    	})
    	return str
    }

    // 获取总数 总价
    function getTotal(item){
    	var str = '<div class="more">$more</div>'+
    			  '<div class="total">总计'+item.product_count+'个菜，实付'+'<span class="total-price">¥'+item.total+'</span></div>'
    	
    	// 数量大于3 显示省略号
    	if(item.product_count > 3){
    		str = str.replace("$more","...")
    	} else {
    		str = str.replace("$more","")
    	}
    	return str
    }

    // 获取评价信息
    function getCommentButton(item){
    	var str = ''
    	if (!item.is_comment){
    		str = '<div class="comment">'+
				  	'<div class="comment-btn">评价</div>'+
				  '</div>'
    	}
    	return str
    }

    // 滚动加载
    function scrollLoad() {
        window.addEventListener('scroll',function(){
            var clientHeight = document.documentElement.clientHeight; // 视口高度
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            var proDis = 30;
            if ((scrollTop + clientHeight) >= (scrollHeight-proDis)) {
        
                // 最多滚动加载3页
                if (page < 3) {

                    // 在发送ajax请求时避免触发多次滚动加载
                    if (isLoading) {
                        return;
                    }
                    initList();
                }
            }
        })
    }


    function init(){
    	initList()
    	scrollLoad()
    }

    init()
})()