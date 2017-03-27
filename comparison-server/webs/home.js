var cheerio=require('cheerio');
var request=require('sync-request');

var url="http://m.smzdm.com/";

function getList(url){
    var reg=/\d+|-|:|\s/g;
    var body = request('GET',url).getBody().toString();
    var $=cheerio.load(body);
    var packet = {
        status : 100,
        message: "success",
        data   : []
    };

    var items=$(".list_preferential>li");
    items.each(function(index,elem){
        var itemHtml=cheerio.load($(this).html());
        var item={};
        item.price=itemHtml('.tips>em').text();
        item.shop=itemHtml('address').text().replace(reg,'');
        item.name=itemHtml('h2').text();
        item.logo=itemHtml('img').attr('src');
        if(item.name!=undefined)
            packet.data.push(item);
    });
    return packet;
}
exports.getHomeList=getList;
