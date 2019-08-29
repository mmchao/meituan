(function(){
	var itemTemp = '<div class="choose-item">'+
	                   '<div class="item-name">$name</div>'+
	                   '<div class="price">¥<span class="total">$price</span></div>'+
                   '<div class="select-content">'+
		               '<div class="minus"></div>'+
		               '<div class="count">$chooseCount</div>'+
		               '<div class="plus"></div>'+
                   '</div>';

    function renderItem(){
    	$('.choose-item').remove()
    	var list = window.food_spu_tags || [],
    		totalCount = 0
    		totalPrice = 0
    	list.forEach(function(item){
    		item.spus.forEach(function(_item){
    			if(_item.chooseCount > 0){
    				appendItem(_item)
    				totalCount += _item.chooseCount
    				totalPrice += _item.min_price*_item.chooseCount // 总价格
    			}
    		})
    	})

    	// 如果购物车在显示 重设高度
    	if (isShow) {
    		var height = $('.choose-item').length*7.6+3.5+'rem'
			$('.choose-content').css('height',height)
    	}

		


		//更新数量和总价
    	$('.dot-num').text(totalCount)
    	$('.total-price-span').text(totalPrice)

    	// 小红点显示隐藏
    	if(totalCount>0){
    		$('.dot-num').show()
    	} else {
    		$('.dot-num').hide()
    	}
    	//绑定事件
    	addClick()

    }


    function appendItem(item) {
    	var str = itemTemp.replace('$name',item.name)
					      .replace('$price',item.min_price)
					      .replace('$chooseCount',item.chooseCount)

		// 绑定数据 data()方法可以实现数据同步更新
		var $target = $(str)
		$target.data('foodData',item)
		$('.choose-content').append($target)
    }

    function addClick() {
    	$('.choose-item').on('click','.plus',function(e){
    		
    		var	$item = $(e.currentTarget).parents('.choose-item'),
    			$count = $(e.currentTarget).siblings('.count')
    		var count = ++$item.data('foodData').chooseCount
    		$count.text(count)

    		// 重新渲染购物车
    		renderItem()

    		// 模拟点击当前活跃的left-item 实现右侧数据更新
    		$('.left-item.active').click()
    	})

    	$('.choose-item').on('click','.minus',function(e){
    		
    		var	$item = $(e.currentTarget).parents('.choose-item'),
    			$count = $(e.currentTarget).siblings('.count')

    		if($item.data('foodData').chooseCount<=0) return
    		var count = --$item.data('foodData').chooseCount // 小于零返回
    		$count.text(count)

    		// 重新渲染购物车
    		renderItem()

    		// 模拟点击当前活跃的left-item 实现右侧数据更新
    		$('.left-item.active').click()
    	})
    }

    // 清空购物车
    function clearShopCar(){
    	window.food_spu_tags.forEach(function(item){
    		item.spus.forEach(function(_item){
    			_item.chooseCount = 0
    		})
    	})

    	// 模拟点击当前活跃的left-item 实现右侧数据更新
    	$('.left-item.active').click()

    	// 隐藏购物车
    	toggle()

    	// 清空item
    	renderItem()
    }

    // 购物车显示隐藏切换
    var isShow = false
    function toggle() {
    	if(isShow){
    		$('.choose-content').animate({
				height: 0
			})
			$('.mask').animate({
				opacity: 0
			})
			setTimeout(function(){
				$('.mask').hide()
			},500) // 延迟隐藏 保证动画效果
			isShow = false
    	} else {
    		// 获取choose-content的高度
    		var height = $('.choose-item').length*7.6+3.5+'rem'
    		$('.choose-content').animate({
				height: height
			})
			$('.mask').show().animate({
				opacity: 1 
			})
			isShow = true

    	}
    }
    $('.clear-car').click(function(){
    	clearShopCar()
    })
    // 隐藏显示切换购物车
	$('.shop-icon').click(function(){
		toggle()
	})
  


	// 暴露renderItem方法
    window.shopBar = {
    	renderItem: renderItem
    }
})()