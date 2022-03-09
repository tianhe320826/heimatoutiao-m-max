// 封装本地存储模块


// 1. 调用方法,存储数据
export const setItem = (key, value) => {
    // 如果value值的数据类型 ==== object
    if (typeof value === 'object') {
        // 为对象或者数组的话,则把这个value值转成字符串的形式进行存储
        value = JSON.stringify(value)
    }
    // 需要把对象形式的数据转成JSON格式的字符串再进行存储
    // 接上面的if判断,如果不是数组或者对象的形式,则直接进行存储
    window.localStorage.setItem(key, value)
}

// 2. 获取数据
// 使用export导出  此处的getItem需要传入一个key参数(访问的这个数据的名称)
export const getItem = key => {
    // 将数据读出来  
    const data = window.localStorage.getItem(key)
    // 此处加入try..catch   其实从此处也可以使用if..else,但很麻烦,需要正则表达式之类的操作
    // 使用JSON.parse(data)对data这个数据进行转换,如果data真的是一个有效的JSON格式字符串,则程序执行成功
    // 但如果不是一个有效的JSON格式字符串,则直接报错,进入到catch,然后将这个data数据原封不动的直接返回
    try {
        // JSON.parse(data) 将data数据转成对象
        return JSON.parse(data)
    } catch(err) {
           // 前面将数据data转成了字符串,但是此处需要读取数据,
           // 所以需要将data数据还原成对象或者数组的形式
        return data
    }
 
}

// 3. 删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}