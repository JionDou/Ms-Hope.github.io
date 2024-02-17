---
title: 函数封装合理控制并发请求
icon: list
date: 2024-01-01
category: JavaScript
---

## 封装函数的思路📦
1. 创建函数并传入待请求的url数组和最大的并发数，等待所有请求完毕，返回promise
```vue
<script>
// urls：待请求的url数组 num：最大的并发数
const concurrentRequests = (urls, num) => {
    //返回promise
    return new Promise(resolve => {
        let index = 0; //下一次执行请求对应的下标
        let resList = []; //请求结果集合
        const request = async () => {
            const url = urls[index]; //获取url
            let i = index; //保存下标
            index++;
            try {
                const res = await fetch(url);
                resList[i] = res;
            } catch(err){
                resList[i] = err;
            } finally {
                if(index < urls.length){
                    request()
                }
            }
        }
    })
}
// 获取urls待请求的地址
const getUrls = () => {
    const urls = [];
    for(let i = 0; i <= 100; i++) {
         urls.push(
            `http://jsonplaceholder.typicode.com/posts/${i}`
        )
    }
    concurrentRequests(urls, 4).then(res => {
        console.log(res);
    })
}
</script>
```