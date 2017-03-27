var system = require('system');
var page=require('webpage').create();
var word = '';
if(system.args.length <= 1){
    console.log('至少需要两个参数');
}else{
    //word = system.args[1];
    word=encodeURIComponent(system.args[1]);
}
//亚马逊按照价格排序
var url="https://www.amazon.cn/s/ref=sr_st_price-asc-rank?keywords="+word+"&sort=price-asc-rank";

page.open(url,function(status){
    if(status!='success'){
        console.log('fail');
    }
    //page.render('amazon.jpg');
    var product=page.evaluate(function(){
        var list=[];
        var itemUtils={
            //获取物品
            getItem:function(){
                return document.getElementsByClassName('s-item-container');
            },
            //获取商品名称
            getTitle:function(item){
                var name=item.getElementsByClassName('s-access-detail-page')[0].textContent;
                return name;
            },
            //获取商品价格

            getPrice:function(item){
                return item.getElementsByClassName('s-price')[0].textContent;
            }

        };

        var items=itemUtils.getItem();
        var len=items.length;
        for(var i=0;i<len;i++){
            var item=items[i];
            var title=itemUtils.getTitle(item);
            var price=itemUtils.getPrice(item);

            var objItem={
                'title':title,
                'price':price,
            };
            list.push(objItem);
        }
        return list;
    });
    var listData=JSON.stringify(product);

    phantom.exit();
})
