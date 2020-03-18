#  使用说明：

1、main.js中引入
import Tips from './components/tips.js'
import './assets/css/tips.css'

Vue.prototype.tips = Tips  // 挂载到vue实例上

2、在需要使用的地方：
    this.tips.open({"eleName":"","text":"提交成功！","icon":0});

    eleName：是需要将提示框定位到页面的某个节点位置上，如输入框处；在这里可以传ref属性绑定的元素；传空字符串或不传则默认提示框相对屏幕居中；
    text： 为需要提示的信息
    icon:  设置图标：0 为成功 1为失败 2为警告
