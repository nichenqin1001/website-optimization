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
- 在`DOMContentLoaded`事件及`scroll`事件中使用`requestAnimationFrame`调用`updatePositions`函数

###### 第二次提交修改内容（main.js）

- 使用`getElementsByClassName`代替`querySelectorAll`提高性能
- 在`for循环`外声明变量
- 在`updatePosition`函数外获取`mover`类
- 根据屏幕宽度设置`mover`类的列数（`cols`变量）
- 根据屏幕高度设置`mover`类的行数（`rows`变量）
- 根据屏幕高度设置`mover`类的间隔距离（`s`变量）

    >在1600*900的屏幕上，生成了21个`mover`类
