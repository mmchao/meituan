(function(){
	// 模板字符串
	var itemTemp = '<div class="type-item">'+
						'<img src=$url class="item-icon">'+
						'<p class="item-name">$name</p>'+
					'</div>'
	// 渲染type的内容
	function appendType() {
		// ajax获取数据
		$.get('./static/json/head.json',function(res){
			var typelist = res.data.primary_filter.slice(0,10);
			console.log(typelist)
			typelist.forEach(function(item) {
				// 替换字符串
				var str = itemTemp.replace('$url',item.url).replace('$name',item.name)
				$('.type').append($(str))
			})
		})
	}
	// 绑定点击
	function addClick(){
        $('.type').on('click','.type-item', function(e){
        	console.log(e)
            alert($(e.currentTarget).text());
        });
    }

    function init() {
    	appendType()
    	addClick()
    }

    init()
	
})()