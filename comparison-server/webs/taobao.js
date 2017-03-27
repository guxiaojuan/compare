
var system = require('system');
var page = require('webpage').create();

var word = '';
if(system.args.length <= 1){
    console.log('至少需要两个参数');
    phantom.exit();
}

word=encodeURIComponent(system.args[1]);

//淘宝按照价格排序
var url='https://s.taobao.com/search?q='+word+'&sort=price-asc';

page.open(url,function(status){
    var product;
    product = page.evaluate(function () {
        var list = [];
        var ItemUtils = {
            //获取物品
            getItems: function () {
                var items = document.getElementsByClassName('item J_MouserOnverReq');
                if (items.length == 0) {
                    items = document.getElementsByClassName('item g-clearfix');
                }
                return items;
            },

            //获取图片
            getImgUrl: function (item) {
                var img = item.getElementsByTagName('img');
                var img_url = img[0].getAttribute('src');
                return img_url;
            },

            //获取标题
            getTitle: function (item) {
                var titles = item.getElementsByClassName('J_ClickStat');
                var title = titles[1].text;
                return title;
            },

            //获取链接
            getItemUrl: function (item) {
                var titles = item.getElementsByClassName('J_ClickStat');
                var item_url = titles[1].getAttribute('href');
                return item_url;
            },

            //获取价格
            getPrice: function (item) {
                var prices = item.getElementsByClassName('price g_price g_price-highlight');
                var price = '' + prices[0].children[0].textContent + prices[0].children[1].textContent;
                return price;
            },

            //获取销量
            getCount: function (item) {
                var counts = item.getElementsByClassName('deal-cnt');
                var count = counts[0].textContent;
                return count;
            }
        };
        var items = ItemUtils.getItems();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            //获取标题
            var title = ItemUtils.getTitle(item);
            //获取价格
            var price = ItemUtils.getPrice(item);
            //获取销量
            var count = ItemUtils.getCount(item);
            //组成对象
            var obj_item = {
                'title': title,
                'price': price,
                'count': count
            };
            list.push(obj_item);
        }
        return list;
    });

    var listData=JSON.stringify(product);
    console.log(listData);

    phantom.exit();
});

