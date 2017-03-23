## 网站性能优化项目

### 开始之前
此项目使用了gulp构建工具
请事先安装依赖

```bash
npm install
```

使用gulp命令搭建本地服务器

```bash
npm run dev
```

如有必要可先删除dist文件夹

```bash
gulp clean
```

使用5800端口访问项目主页

```bash
http://localhost:5800
```

#### Part 1: 优化 index.html 的 PageSpeed Insights 得分

- 使用内联css
- 压缩css及javascript
- 为print.css添加媒体查询，防止其阻止网页呈现
- 为script标签添加async属性，防止阻止网页呈现
- 压缩图片

#### Part 2: 优化 pizza.html 的 FPS（每秒帧数）

##### 优化resizePizzas函数

- 用`pizzaSize`变量储存`document.querySelector("#pizzaSize")`
- 用`changePizzaSizes`函数遍历所有需要改变大小的pizza，配合`getNewWidth`函数直接改变目标的宽度，避免强制同步布局
- 使用内联css和javascript，压缩并合并`style.css`和`bootstrap-grid.css`两个文件，减少http请求

##### 优化updatePositions函数

- 将获取`document.body.scrollTop`的行为从`for循环`中提取出来，避免强制同步布局
- 将获取`document.querySelector("#movingPizzas1")`的行为从`for循环`中提取出来，避免强制同步布局

###### 第二次提交修改内容（`main.js`）

- 使用`getElementsByClassName`代替`querySelectorAll`提高性能
- 在`for循环`外声明变量
- 在`updatePosition`函数外获取`mover`类
- 根据屏幕宽度设置`mover`类的列数（`cols`变量）
- 根据屏幕高度设置`mover`类的行数（`rows`变量）

    >在1600*900的屏幕上，生成了21个`mover`类

###### 第三次提交修改内容(`main.js`)

- 使用transform: translate3d来代替修改left值

    ```bash
    var phase = [];
    var top = document.body.scrollTop / 1250;

    // 在主循环外保存参数的数组
    for (var j = 0; j < 5; j++) {
        phase.push(100 * Math.sin(top + j));
    }

    // 使用translate3d修改pizza位置
    var translate;
    for (var i = 0; i < items.length; i++) {
        translate = items[i].basicLeft + phase[i % 5] + 'px';
        items[i].style.transform = "translate3d(" + translate + ", 0, 0)";
    }
    ```

    >在`style.css`文件中为`.mover`添加`left: 0;`

### 性能（2017-3-23）

![性能](https://raw.githubusercontent.com/nichenqin1001/website-optimization/master/dist/views/images/2017-03-23.png)
![性能](https://raw.githubusercontent.com/nichenqin1001/website-optimization/master/dist/views/images/2017-03-23%20(1).png)
![性能](https://raw.githubusercontent.com/nichenqin1001/website-optimization/master/dist/views/images/2017-03-23%20(2).png)
