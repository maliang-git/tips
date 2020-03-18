/* 使用方式：
1、main.js中引入
import Tips from './components/tips.js'
import './assets/css/tips.css'

Vue.prototype.tips = Tips  //并挂载到vue实例上

2、需要使用的方法中：
    this.tips.open({"eleName":"","text":"提交成功！","icon":0});

    eleName：是需要将提示框定位到绑定了ref的元素的位置；传空字符串或不传则默认提示框相对屏幕居中；
    text： 为需要提示的信息
    icon:  设置图标；
 */
// vue公用提示框插件
function open(data) {
    var { eleName, text, icon } = data;
    //首先判断页面内是否有tips-info-text-text这个元素,若有的话就删除
    var idObject = document.getElementsByClassName("tips-info-text")[0];
    if (idObject != null) {
        idObject.parentNode.removeChild(idObject);
    }
    // 向body内插入元素
    var tispsInfo = document.createElement("div");
    tispsInfo.className = "tips-info-text";

    document.body.appendChild(tispsInfo);
    document.body.insertBefore(tispsInfo, document.body.firstElementChild);

    var p = document.createElement("p");
    p.innerHTML = text;
    tispsInfo.appendChild(p);

    // 根据传入参数设置icon类名
    if (icon != undefined || icon != "") {
        var b = document.createElement("b");
        b.className = "iconfont";
        if (icon === 0) {
            b.className += " icon-finish";
        }
        if (icon === 1) {
            b.className += " icon-error";
        }
        if (icon === 2) {
            b.className += " icon-warn";
        }
        tispsInfo.insertBefore(b, tispsInfo.firstElementChild);
    }

    // 获取元素的宽高
    var tupsBoxHeight = parseInt(window.getComputedStyle(tispsInfo).height);
    var tupsBoxWidth = parseInt(window.getComputedStyle(tispsInfo).width);

    // 需要垂直水平居中定位
    if (eleName == undefined || eleName == "" || eleName == null) {
        tispsInfo.style.position = "fixed";
        tispsInfo.style.marginLeft = -tupsBoxWidth / 2 + "px";
        tispsInfo.style.marginTop = -tupsBoxHeight / 2 + "px";
        // 需要根据元素定位
    } else {
        tispsInfo.style.left = eleName.offsetLeft + "px";
        if (eleName.offsetTop < tupsBoxHeight + 8) {
            var span = document.createElement("span");
            document
                .getElementsByClassName("tips-info-text")[0]
                .appendChild(span);
            var eleHeight = parseInt(window.getComputedStyle(eleName).height);
            tispsInfo.style.top = eleName.offsetTop + eleHeight + 8 + "px";
        } else {
            var i = document.createElement("i");
            document.getElementsByClassName("tips-info-text")[0].appendChild(i);
            tispsInfo.style.top = eleName.offsetTop - tupsBoxHeight - 8 + "px";
        }
    }

    setTimeout(function() {
        timers(tispsInfo);
    }, 2000);
}

function timers(tispsInfo) {
    var alpha = 100; // 透明度值变量
    var timer = setInterval(function() {
        tispsInfo.style.filter = "alpha(opacity:" + alpha + ")"; // 设置IE的透明度
        tispsInfo.style.opacity = alpha / 100; // 设置fierfox等透明度，注意透明度值是小数
        alpha -= 10;

        if (alpha == 0) {
            // 当元素透明后停止计时器，并删除添加的节点
            clearInterval(timer);
            var idObject = document.getElementsByClassName("tips-info-text")[0];
            if (idObject != null) {
                idObject.parentNode.removeChild(idObject);
            }
        }
    }, 100);
}

export default {
    open
};
