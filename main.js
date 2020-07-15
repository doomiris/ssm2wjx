let { start_app, click_item, has_text, wait_for, swipe_down, swipe_up } = require('autojs_sdk.js');
// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
  if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
    toastLog('脚本正在运行中');
    engines.myEngine().forceStop();
  }
});

const getToday = (sep) => {
    if (!sep) sep = '-';
    const d = new Date();
    return [d.getFullYear(),(d.getMonth()+1).toString().padStart(2,'0'), (d.getDate()).toString().padStart(2,'0')].join(sep);
};

const storage = storages.create('wjx');
let myname = storage.get('name');
if (!myname) {
    myname = dialogs.prompt('请输入孩子的真实姓名', '');
    if (myname.length>0) storage.put('name', myname);
}

const ctt = random(358,368) / 10 ;
console.log(myname, ctt);

const capimg = files.cwd() + '/temp/screencapture.' + getToday() + '.png';
files.ensureDir(capimg);
console.log(capimg);

if (files.exists(capimg)) {
    toastLog('今天已经上传了');
    exit();
}
const cle = (e) => {
    let eb = e.bounds();
    click(eb.centerX(),eb.centerY());
};
const swipe_to_click = function(text, upward) {
    while (!has_text(text)){
        if (upward) swipe_down();
        else swipe_up();
    }
    click_item(text);
};
let main = function(){
    sleep(3000);
    id('cns').text('微信').findOne().parent().parent().click();
    swipe_down();
    sleep(2000);
    id('gam').text('随申办').findOne().parent().click();
    className('android.view.View').text('随申码').findOne().click()
    className('android.view.View').text('亲属随申码').findOne().click()
    className('android.view.View').text(myname + '的随申码').waitFor()
    let e = text('查看').findOnce( 0 + 1 );
    cle(e);
    className('android.view.View').text('绿色').depth(22).waitFor();
    sleep(1000);
    captureScreen(capimg);
    sleep(100);
    start_app(lmain, '微信', '把截图上传到问卷星', false, true);
};
let main_bak = function(){
    sleep(3000);
    id('cns').text('我').findOne().parent().parent().click();
    click_item('支付');
    click_item('随申码');
    click_item('防疫健康码');
    click_item('查看防疫健康码');
    click_item('亲属随申码');    
    wait_for(myname + '的随申码');
    let e = text('查看').findOnce( 0 + 1 );
    cle(e);
    wait_for('绿色');
    sleep(1000);
    captureScreen(capimg);
    sleep(100);
    start_app(subaction, '微信', '把截图上传到问卷星', false, true);
};
let lmain = function(){
    sleep(2000);
    id('cns').text('我').findOne().parent().parent().click();
    sleep(1000);
    let sc = className('android.widget.TextView').text('收藏').depth(20).findOne();
    cle(sc);
    swipe_to_click('政海幼儿园幼儿每日健康随申码收集表');
    sleep(7*1000);
    click_item('请选择日期',[250,125]);
    wait_for('确定');
    click_item('确定');
    input(1,myname); 
    input(2,ctt);
    swipe_to_click('上海');
    click_item('选择文件');
    click_item('文件管理');
    swipe_to_click('脚本');
    swipe_to_click('随申码上传问卷星',true);
    click_item('temp');
    if (!has_text(files.getName(capimg))){
      toastLog('没找到截图!');
      exit();
    }
    click_item(files.getName(capimg));
    click_item('确定');
    wait_for('上传成功');
    swipe_to_click('提交');
};
start_app(main, '微信', '查找' + myname + '的随申码并截图', false, true);
