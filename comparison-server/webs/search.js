var cheerio = require('cheerio');
var request = require('sync-request');

function getList(word){
    //构造请求路径
    var path = "http://search.smzdm.com/?c=home&s="+encodeURIComponent(word);
    var body = request('GET',path).getBody().toString();
    var $ = cheerio.load(body);
    var packet = {
        data   : []
    };
    var items = $(".feed-row-wide");
    items.each(function(i,elem){
        var itemHtml = cheerio.load($(this).html());
        var item = {};
        item.price = itemHtml('.z-highlight').text();
        item.name = itemHtml('.feed-nowrap').attr('title');
        item.logo = itemHtml('img').attr('src');
        item.shop = itemHtml('.feed-block-extras > span').text();
        item.shopurl = itemHtml('.feed-link-btn-inner > a').attr('href');
        if(item.name!=undefined)
           packet.data.push(item);
    });
        return packet
}

exports.getSearchList = getList;
