(function(){
    var itemTmpl = '<a class="$key btn-item" href="$key.html">'+
                      '<div class="tab-icon"></div>'+
                      '<div class="btn-name">$text</div>'+
                   '</a>'


    function init(){
        var items = [{
            key: 'index',
            text: '首页'
        },{
            key: 'order',
            text: '订单'
        },{
            key: 'my',
            text: '我的'
        }]

        var str = ''

        items.forEach(function(item){
            str += itemTmpl.replace(/\$key/g,item.key)
                            .replace('$text',item.text)
        })


        $('.bottom-bar').append($(str));


        // 找到当前页面的url来确定key值
        var arr = window.location.pathname.split('/');
        var page = arr[arr.length-1].replace('.html','');
        // console.log(window.location.pathname)
        // console.log(arr)
        // console.log(page)

        // page为空
        if(!page || page == ' '){
            $('.bottom-bar a.index').addClass('active');
            return
        }
        // $('.bottom-bar a.'+page) 不存在就说明访问的是index.html
        if($('.bottom-bar a.'+page).length == 0){
            $('.bottom-bar a.index').addClass('active');
            return
        }
        // 将当前的页面对应的key值的a元素设置active的class
        $('.bottom-bar a.'+page).addClass('active');
    }
    init();
    

})();


