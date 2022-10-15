//获取操作对象
var pagin = document.querySelector('.pagination')
//创建一个设置样式的普通函数
function styleCss(ele, oo1) {
    //遍历对象中的键值对
    for (let key in oo1){
        ele.style[key] = oo1[key]
        //ele.style['margin']="5px"
    }
}
//创建需要传递的数据信息
var o1 = {
    //数据信息
    pageInfo: {
        // 当前页
        pagenum: 1,
        pagesize: 7,
        totalsize: 138,
        // 总页码数
        totalpage: 20
    },
    //文本信息
    textInfo: {
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页'
    }
}
//创建分页器的构造函数
function pagination(ele, obj, cb) {
    //把传入的参数赋值给实例属性
    this.ele = ele
    this.obj = obj || {}
    this.cb = cb || function () {}
    //设置默认数据信息
    this.default = {
        //数据信息
        pageInfo: {
            pagenum: 1,
            pagesize: 9,
            totalsize: 100,
            totalpage: 12
        },
        textInfo: {
            first: 'first',
            prev: 'prev',
            list: '',
            next: 'next',
            last: 'last'
        }
    }
    //创建实例属性，存放页码的盒子
    this.list = null
    //调用入口方法
    this.init()
}
//创建入口方法
pagination.prototype.init = function () {
    //调用方法替换默认数据信息
    this.updateDefault()
    //调用方法显示所有信息
    this.show1()
    //调用方法，给大盒子绑定点击事件
    this.bigBox()
}
//创建函数，使用实参替换默认数据信息
pagination.prototype.updateDefault = function () {
    //获取传入的参数中有没有pageInfo和textInfo
    var pageInfo2 = this.obj.pageInfo
    var textInfo2 = this.obj.textInfo
    //判断pageInfo
    if (pageInfo2) {
        //遍历pageInfo对象中的所有数据
        for (let key in pageInfo2) {
            //使用传入的数据去替换默认数据信息
            this.default.pageInfo[key] = pageInfo2[key]
        }
    }
    if (textInfo2) {
        for (let key in textInfo2) {
            this.default.textInfo[key] = textInfo2[key]
        }
    }
}
//显示所有信息
pagination.prototype.show1 = function () {
    //清空大盒子中所有信息
    this.ele.innerHTML = ''
    //调用方法显示文本信息
    this.showText()
    //调用方法显示页码信息
    this.showP()
    //禁用按钮
    this.jinyong()
    //调用方法显示输入框和对应按钮
    this.showBtn()
    //调用回调函数，并传递当前页码
    this.cb(this.default.pageInfo.pagenum)
}
//按钮函数
pagination.prototype.showBtn = function () {
    //获取当前页码
    var pagenum = this.default.pageInfo.pagenum
    //创建输入框对象
    var inp = document.createElement('input')
    //给输入框添加value属性值
    inp.value = pagenum
    //设置输入框的大小
    inp.size = 1
    //创建按钮对象
    var btn = document.createElement('button')
    //给按钮设置文本
    btn.innerHTML = 'GO'
    //把输入框追加到大盒子中
    this.ele.appendChild(inp)
    this.ele.appendChild(btn)
}
//禁用按钮
pagination.prototype.jinyong = function () {
    //获取当前页码和最大页码
    var pagenum = this.default.pageInfo.pagenum
    var totalpage = this.default.pageInfo.totalpage
    //获取大盒子中所有的div子元素盒子
    var divs = this.ele.children
    //判断当前页码是否等于1
    if (pagenum == 1) {
        divs[0].style.backgroundColor = "#666"
        divs[1].style.backgroundColor = "#666"
    }
    if (pagenum == totalpage) {
        divs[3].style.backgroundColor = "#666"
        divs[4].style.backgroundColor = "#666"
    }
}
//显示页码信息
pagination.prototype.showP = function () {
    //获取默认参数中的pageInfo
    var pageInfo = this.default.pageInfo
    //获取当前页码以及总页数
    var pagenum = pageInfo.pagenum
    var totalpage = pageInfo.totalpage
    //判断总页数是否小于10
    if (totalpage < 10) {
        //遍历每个页码
        for (var i = 1; i < totalpage; i++) {
            //创建页码
            var p = createp(i, pagenum)
            //把当前页码追加到div。list盒子中
            this.list.appendChild(p)
        }
    } else {
        //判断当前页码是否小于5
        if (pagenum < 5) {
            //前面5页
            for (var i = 1; i <= 5; i++) {
                //创建页码
                var p = createP(i, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
            //中间...
            //创建span标签
            var span = document.createElement('span')
            //添加内容
            span.innerHTML = "..."
            //把当前span标签追加到div盒子中
            this.list.appendChild(span)
            //最后两页
            for (var a = totalpage - 1; a <= totalpage; a++) {
                //创建页码
                var p = createP(a, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
        } else if (pagenum == 5) {
            //前面7页
            for (var i = 1; i <= 7; i++) {
                //创建页码
                var p = createP(i, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
            //中间...
            //创建span标签
            var span = document.createElement('span')
            //添加内容
            span.innerHTML = "..."
            //把当前span标签追加到div盒子中
            this.list.appendChild(span)
            //最后两页
            for (var a = totalpage - 1; a <= totalpage; a++) {
                //创建页码
                var p = createP(a, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
        } else if (pagenum > 5 && pagenum < totalpage - 4) {
            //前面2页
            for (var i = 1; i <= 2; i++) {
                //创建页码
                var p = createP(i, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)

            }
            //中间...
            //创建span标签
            var span = document.createElement('span')
            //添加内容
            span.innerHTML = "..."
            //把当前span标签追加到div盒子中
            this.list.appendChild(span)
            //中间5页
            for (var b = pagenum - 2; b <= pagenum + 2; b++) {
                //创建页码
                var p = createP(b, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
            //创建span标签
            var span2 = document.createElement('span')
            //添加内容
            span2.innerHTML = "..."
            //把当前span标签追加到div盒子中
            this.list.appendChild(span2)

            //最后两页
            for (var a = totalpage - 1; a <= totalpage; a++) {
                //创建页码
                var p = createP(a, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
        } else if (pagenum == totalpage - 4) {
            //前面2页
            for (var i = 1; i <= 2; i++) {
                //创建页码
                var p = createP(i, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
            //中间...
            //创建span标签
            var span = document.createElement('span')
            //添加内容
            span.innerHTML = "..."
            //把当前span标签追加到div盒子中
            this.list.appendChild(span)

            //最后两页
            for (var a = totalpage - 6; a <= totalpage; a++) {
                //创建页码
                var p = createP(a, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
        } else if (pagenum > totalpage - 4) {
            //前面2页
            for (var i = 1; i <= 2; i++) {
                //创建页码
                var p = createP(i, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
            //中间...
            //创建span标签
            var span = document.createElement('span')
            //添加内容
            span.innerHTML = "..."
            //把当前span标签追加到div盒子中
            this.list.appendChild(span)

            //最后两页
            for (var a = totalpage - 4; a <= totalpage; a++) {
                //创建页码
                var p = createP(a, pagenum)
                //把当前页码追加到div.list盒子中
                this.list.appendChild(p)
            }
        }
    }
}
//显示文本信息
pagination.prototype.showText = function () {
    //获取默认参数中的文本内容
    let text1 = this.default.textInfo
    //遍历对象中的所有内容
    for (let key in text1) {
        //创建DOM元素存放每个文本信息
        var div1 = document.createElement('div')
        //给当前div对象添加一个class属性值
        div1.className = key
        //判断当前key是否等于list
        if (key == 'list') {
            //把当前div对象赋值
            this.list = div1
            //调用方法，给当前盒子设置样式
            styleCss(div1, {
                "display": "flex",
                "justify-content": "center",
                "align-items": "center"
            })
        } else {
            //调用函数来给当前div对象设置样式
            styleCss(div1, {
                "border": "1px solid #000",
                "margin": '0px 5px',
                "padding": '2px 5px'
            })
            //给div对象添加文本内容
            div1.innerHTML = text1[key]
        }
        //把当前div对象追加到大盒子中
        this.ele.appendChild(div1)
    }
}
//创建方法，给大盒子绑定点击事件
pagination.prototype.bigBox = function () {
    //获取当前页码
    var pagenum = this.default.pageInfo.pagenum
    //获取最大页码
    var totalpage = this.default.pageInfo.totalpage
    //绑定点击事件
    this.ele.onclick = (e) => {
        //兼容
        var e = e || window.event
        var tg = e.target || e.srcElement
        //下一页
        if (tg.className == 'next' && totalpage != pagenum) {
            pagenum++
            //重新赋值给页码
            this.default.pageInfo.pagenum = pagenum
            //重新加载页面
            this.show1()
        }
        //上一页
        if (tg.className == 'prev' && totalpage != 1) {
            pagenum--
            //重新赋值给页码
            this.default.pageInfo.pagenum = pagenum
            //重新加载页面
            this.show1()
        }
        //尾页
        if (tg.className == 'last' && totalpage != pagenum) {
            pagenum = totalpage
            this.default.pageInfo.pagenum = pagenum
            //重新加载页面
            this.show1()
        }
        //首页
        if (tg.className == 'first' && pagenum != 1) {
            pagenum = 1
            //重新赋值给当前页码
            this.default.pageInfo.pagenum = pagenum
            //重新加载页面
            this.show1()
        }
        //页码
        if (tg.nodeName == "p") {
            //获取当前P标签中的文本，并赋值给当前页码
            pagenum = parseInt(tg.innerHTML)
            //重新赋值给当前页面
            this.default.pageInfo.pagenum = pagenum
            //重新加载页面
            this.show1()
        }
        //GO按钮
        if (tg.innerHTML == 'GO' && tg.previousElementSibling.value != pagenum) {
            //获取输入框中的内容
            var val = tg.previousElementSibling.value
            //判断是否在页码的范围
            if (val >= 1 && val <= totalpage) {
                //把当前输入框中的内容赋值给pagenum
                pagenum = parseInt(val)
                //重新赋值给当前页码
                this.default.pageInfo.pagenum = pagenum
                //重新加载页面
                this.show1()
            }
        }

    }
}
//创建一个设置页码的方法
function createP(m, n) {
    //创建p标签对象
    var newp = document.createElement('p')
    //给p标签添加内容
    newp.innerHTML = m
    //给当前p标签对象设置样式
    styleCss(newp, {
        "border": '1px solid #000',
        "margin": '0px 5px',
        "padding": "2px 5px"
    })
    //判断m等于n时，单独设置一个背景颜色
    if (m == n) {
        styleCss(newp, {
            "background-color": "pink"
        })
    }
    //把当前创建好的p标签返回给调用的位置
    return newp
}
//创建一个设置样式的普通函数
function styleCss(ele, oo1) {
    //遍历对象中的键值对
    for (let key in oo1) {
        ele.style[key] = oo1[key]
        //ele.style['margin']="5px"
    }
}

//实例化对象
new pagination(pagin, o1, function (m) {})