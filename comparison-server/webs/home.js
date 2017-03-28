var cheerio=require('cheerio');
var request=require('sync-request');

var url="http://m.smzdm.com/";

function getList(url){
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
        item.shop=itemHtml('address').text();
        item.name=itemHtml('h2').text();
        item.logo=itemHtml('img').attr('src');
        if(item.name!=undefined && item.shop!=''&& item.price!='')
            packet.data.push(item);
    });
    console.log(packet);
    return packet;
}

//getList(url);
exports.getHomeList=getList;
