let { start_app, click_item, has_text, wait_for,set_runing_tip,swipe_down,swipe_up } = require("libsdk.js");
// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
  if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
    set_runing_tip("脚本正在运行中");
    engines.myEngine().forceStop();
  }
});
const cle = function(e){
    let eb = e.bounds();
    click(eb.centerX(),eb.centerY());
}
const ctt=['35.9','36.0','36.1','36.2','36.3','36.4','36.5','36.6','36.7','36.8'];
Date.prototype.Format = function(fmt){ //author: meizz
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
const capimg = '/storage/emulated/0/脚本/随申码上传问卷星/temp/screencapture.png';
let main = function(){
    sleep(3000);
    id('cns').text('我').findOne().parent().parent().click();
    click_item('支付');
    click_item('防疫健康码');
    click_item('查看防疫健康码');
    click_item('亲属随申码');
    wait_for('兰玥的随申码');
    let e=text('查看').findOnce(1);
    cle(e);
    wait_for('更新于');
    captureScreen(capimg);
    sleep(1000);
    start_app(subaction, '微信', '截图上传到问卷星', false, true);
};
let subaction = function(){
    sleep(3000);
    id('cns').text('我').findOne().parent().parent().click();
    click_item('收藏');
    click_item('政海幼儿园幼儿每日健康随申码收集表');
    //let ddd = new Date().Format("yyyy-MM-dd");
    sleep(7*1000);
    click_item('请选择日期',[250,125]);
    wait_for('确定');
    click_item('确定');
    input(1,'兰玥');
    input(2,ctt[random(0,9)]);
    while (!has_text('上海')){
        swipe_up();
    }
    click_item('上海');
    click_item('选择文件');
    click_item('文件管理');
    while (!has_text('脚本')){
        swipe_up();        
    }
    click_item('脚本');
    while (!has_text('随申码上传问卷星')){
        swipe_down();
    }
    click_item('随申码上传问卷星');
    click_item('temp');
    click_item('screencapture.png');
    click_item('确定');
    wait_for('上传成功');
    while (!has_text('提交')){
        swipe_up();
    }
    click_item('提交');
};
start_app(main, '微信', '查找兰玥随申码并截图', false, true);

//start_app(subaction, '微信', '截图上传到问卷星', false, true);

