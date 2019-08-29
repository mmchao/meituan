(function(){
	// 模板字符串
	var itemTemp = '<div class="list-item">'+
                        '<img class="item-img" src=$url />'+
                        '$brand'+
                        '<div class="item-info">'+
                            '<p class="item-title">$name</p>'+
                            '<div class="item-desc">'+
                                '<div class="left">'+
                                    '<span class="item-score">$score</span>'+
                                    '<span class="item-count">月售$count</span>'+
                                '</div>'+
                                '<div class="right">'+
                                    '<span class="item-time">$time&nbsp;|</span>'+
                                    '<span class="item-distance">&nbsp;$distance</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="item-price">$min_price</div>'+
                            '<div class="item-others">'+
                                '$others'+
                            '</div>'+
                        '</div>'+
                    '</div>'

    var page = 0;
    var isLoading = false;
    
	// 渲染list
	function initList() {
		// ajax获取数据
        // 模拟延迟加载
        $('.loading').text('加载中');
        page++
        isLoading = true
        setTimeout(function(){
            
            $.get('./static/json/homelist.json',function(res){
            var shoplist = res.data.poilist
            console.log(shoplist)
            shoplist.forEach(function(item) {
                // 替换字符串
                var str = itemTemp.replace('$url',item.pic_url)
                .replace('$brand',getBrand(item))
                .replace('$name',item.name)
                .replace('$score',getStarScore(item))
                .replace('$count',getMonthNum(item))
                .replace('$time',item.mt_delivery_time)
                .replace('$distance',item.distance)
                .replace('$min_price',item.min_price_tip)
                .replace('$others',getOthers(item))
                $('.list-wrap').append($(str))
            })
            $('.loading').text('加载完成');
            isLoading = false
        })
        },1000)
	}

	// 获取是否为品牌
	function getBrand(item){
		if (item.brand_type) {
            return '<div class="brand brand-pin">品牌</div>';
        } else {
            return '<div class="brand brand-xin">新到</div>';
        }
	}

	// 获取评分 转换为星星
	function getStarScore(item) {
		// 满星、半星、空星的数量

		var fullStar = parseInt(item.wm_poi_score),
			halfStar = (item.wm_poi_score - fullStar) < 0.5 ? 0 : 1,
			nullStar = 5 - fullStar - halfStar,
			starstr = ''

		for (var i = 0 ; i < fullStar ; i++) {
            starstr += '<span class="star fullstar"></span>'
        }
        for (var j = 0 ; j < halfStar ; j++) {
            starstr += '<span class="star halfstar"></span>'
        }
        for (var k = 0 ; k < nullStar ; k++) {
            starstr += '<span class="star nullstar"></span>'
        }

        return starstr
	}

	// 月售
	function getMonthNum(item){
        var num = item.month_sale_num;
        // 大于999采用999+
        if (num > 999) {
            return '999+'
        }
        return num
    }

    // 获取活动数据
    function getOthers(item){
        var array = item.discounts2,
         	str = ''

        array.forEach(function(item){

            // 内部的商家活动模版字符串
            var _str = '<div class="other-info">'+
                           '<img src=$icon_url class="other-tag" />'+
                           '<span class="other-content">$info</span>'+
                        '</div>'

            // 模版字符串替换数据
            _str = _str.replace('$icon_url',item.icon_url).replace('$info', item.info)

            // 字符串拼接
            str = str + _str;
        })

        return str;
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
    function addClick(){
        $('.list-wrap').on('click','.list-item',function(){  // 无法直接绑定到list-item  因为还没生成  ajax是异步的
            window.location.href = 'menu.html'
        })
    }
    function init(){
        initList()
        scrollLoad()
        addClick()
    }
	init()
})()