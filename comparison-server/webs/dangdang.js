
/**
 * Created by guxiaojuan on 2017/3/6.
 */
var system = require('system');
var page=require('webpage').create();
var word = '';
if(system.args.length <= 1){
    console.log('至少需要两个参数');
}else{
    //word = system.args[1];
    word=encodeURIComponent(system.args[1]);
}
//当当是按照价格排序
var url="http://search.dangdang.com/?key="+word+"&act=input&sort_type=sort_xlowprice_asc";

page.open(url,function(status){
    if(status!='success'){
        console.log('fail');
    }
    //console.log('------');
   page.render('dangdang.jpg');
    var product=page.evaluate(function(){
        var list=[];
        var itemUtils={
            //获取物品
            getItem:function(){
                return document.getElementById('search_nature_rg');
            },
            //获取商品名称
            getTitle:function(item){
                var name=item.getElementsByClassName('name')[0].textContent;
                return name;
            },
            //获取商品价格
            getPrice:function(item){
                return item.getElementsByClassName('price')[0].textContent;
            },
            //评论
            getComment:function(item){
                return item.getElementsByClassName('star')[0].textContent;
            }
        };

        var items=itemUtils.getItem();
        var len=items.children[0].children.length;
        for(var i=0;i<len;i++){

            var item=items.children[0].children[i];
            var title=itemUtils.getTitle(item);
            var price=itemUtils.getPrice(item);
            var comment=itemUtils.getComment(item);

            var objItem={
                'title':title,
                'price':price,
                'comment':comment
            };
            list.push(objItem);
        }
        return list;
    });
    var listData=JSON.stringify(product);
    console.log(listData);

    phantom.exit();
})

