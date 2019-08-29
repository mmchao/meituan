(function(){
	// 右侧类目item模版字符串
    var itemTemp = '<div class="list-item">'+
                        '<img class="img" src=$picture />'+
                        '<div class="list-item-right">'+
                           '<p class="item-title">$name</p>'+
                           '<p class="item-desc">$description</p>'+
                           '<p class="item-zan">$praise_content</p>'+
                           '<p class="item-price">¥$min_price<span class="unit">/$unit</span></p>'+
                        '</div>'+
                        '<div class="select-content">'+
                            '<div class="minus"></div>'+
                            '<div class="count">$chooseCount</div>'+
                            '<div class="plus"></div>'+
                        '</div>'+
                    '</div>';


    function initRightList(list){

    	$('.right-list').html('')  //先清空
    	list.forEach(function(item){

    		if (!item.chooseCount) {
                item.chooseCount = 0;
            }
    		var str = itemTemp.replace('$picture',item.picture)
    						  .replace('$name',item.name)
    						  .replace('$description',item.description)
    						  .replace('$praise_content',item.praise_content)
    						  .replace('$min_price',item.min_price)
    						  .replace('$unit',item.unit)
    						  .replace('$chooseCount',item.chooseCount)

  			var $target = $(str)
            $target.data('foodData',item); // 绑定数据
            $('.right-list').append($target);
    	})
    }
    // 更新title
    function initRightTitle(name){
    	$('.right-title').text(name)
    }



    function addClick(){

    	// right-list已经存在 如果在right-list上绑定 那么每多渲染一次 点击事件的触发次数就会多一次 因为多次绑定了
        // list-item 可以获取到 因为这里没有ajax请求 执行都是按代码顺序执行
    	$('.list-item').on('click','.plus',function(e){
    		var	$item = $(e.currentTarget).parents('.list-item'),
    			$count = $(e.currentTarget).siblings('.count')
    		var count = ++$item.data('foodData').chooseCount
    		$count.text(count)

    		// 渲染购物车
    		window.shopBar.renderItem()
    	})

    	$('.list-item').on('click','.minus',function(e){
    		var	$item = $(e.currentTarget).parents('.list-item'),
    			$count = $(e.currentTarget).siblings('.count')

    		if($item.data('foodData').chooseCount<=0) return
    		var count = --$item.data('foodData').chooseCount
    		$count.text(count)
    		window.shopBar.renderItem()
    	})
    }

    
    function init(data){
    	initRightList(data.spus || [])
    	initRightTitle(data.name)
    	addClick()
    }

    // 定义全局方法
    window.Right = {
    	refresh:init
    }

})()