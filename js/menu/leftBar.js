(function(){
	                 
    // 获取食物列表
    function getFoodList(){
    	$.get('./static/json/food.json',function(res){
    		window.food_spu_tags = res.data.food_spu_tags || []  // 获取食物分类列表 定义到全局变量
    		initLeftBar(window.food_spu_tags) // ajax是异步执行 初始化右侧列表要放在回调里 否则渲染不出来
            // 更新配送费
            $('.shipping-fee').text(res.data.poi_info.shipping_fee)
    	})
    }

    // 渲染leftBar
    function initLeftBar(list){
    	var itemTemp = '<div class="left-item">$getItemContent</div>'
    	list.forEach(function(item){
    		var str = itemTemp.replace('$getItemContent',getItemContent(item))
    		var $leftItem = $(str)
    		$leftItem.data('foodData',item) // 绑定food数据到每一项item
    		$('.left-bar').append($leftItem)
    	})
    	$('.left-item').first().click()
    	
    }

    // 获取leftBar内容
    function getItemContent(item){
    	if (item.icon) {
            return '<img class="item-icon" src='+item.icon+' />'+'<p>'+item.name+'</p>';
        } else {
            return item.name;
        }
    }

    function addClick(){
    	$('.left-bar').on('click','.left-item',function(e){  // 这里用click绑定事件会失效 click方法绑定事件 前面的元素必须事先存在dom中
    		var $target = $(e.currentTarget)
    		$target.addClass('active').siblings().removeClass('active')

    		// 调用right方法 传递数据
    		window.Right.refresh($target.data('foodData'))

    	})
    }

    function init(){
    	getFoodList()
    	addClick()
    }

    init()
})()