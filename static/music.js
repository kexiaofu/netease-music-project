//http://music.163.com/#/playlist?id=313819234
var webPage = require('webpage');
var page = webPage.create();

var system = require('system'),
    args = system.args;

var fs = require('fs');

page.onConsoleMessage = function(msg) {
  console.log('msg --'+msg);
};

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/6.2.3964.2 Safari/537.36';

console.log(JSON.stringify(args));

var url = 'http://music.163.com/playlist?id='+args[1];

console.log(url);


var getPage = function(addr) {
  console.log('OK');
  var title = page.evaluate(function() {
    console.log(document.querySelector('body').innerText)
    var trs = window.frames['contentFrame'].document.querySelectorAll('tr');
    var arr = [],tr = null,tds=null;
    for(var i=1,l=trs.length;i<l;i++) {
      tds = trs[i].querySelectorAll('td');
      arr.push({
        title:tds[1].querySelector('b').getAttribute('title'),
        dur:tds[2].querySelector('span').innerText,
        singer:tds[3].querySelector('.text').getAttribute('title'),
        album:tds[4].querySelector('a').getAttribute('title')
      });
    }
    return arr;
  });

  console.log(title.length);

  fs.write(addr,JSON.stringify(title),'w');

  phantom.exit();
};

page.open('http://music.163.com/playlist?id='+args[1],{loadImage:false,acceptLanguage:'zn-CN,zn'}, function(status) {
  console.log(status);
  if(status === 'success') {
    console.log('success');
    getPage(args[2]+'/'+args[1]+'.json');
  } else {
    console.log('again');
    setTimeout(function(){
      getPage(args[2]+'/'+args[1]+'.json');
    },1000)
  }
});