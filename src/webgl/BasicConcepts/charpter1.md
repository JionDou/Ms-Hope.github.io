---
title: 第一章
date: 2023-12-27
category: webgl
tag:
  - 图形学
---

## 创建着色器与渲染
```js
// 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
function createShader(gl, type, source) {
  let shader = gl.createShader(type); // 创建着色器对象
  gl.shaderSource(shader, source); // 提供数据源
  gl.compileShader(shader); // 编译 -> 生成着色器
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
```

### 1.属性（Attributes）和缓冲
属性用来指明怎么在缓冲中获取二进制数据并将它提供给顶点着色器。例如你可能在三个32位浮点类型的缓冲中存储一个位置值。对于一个确切的属性你需要告诉它从哪一个缓冲类型中获取数据，获取什么类型的数据（三个32位的浮点数据）, 起始偏移值是多少，到下一个位置的字节数是多少。

缓冲是发送到GPU的一些二进制数据序列，通常情况下缓冲中存储的数据包括位置，法向量，纹理坐标，顶点颜色值等。可以存储任何数据。缓冲不是随意读取的。事实上顶点着色器运行的次数是指定的一个确切数字，每一次运行的属性会从指定的缓冲中按照指定规则依次获取下一个值。

### 2.全局变量（Uniforms）

全局变量在着色程序运行前赋值，在运行过程中全局有效。


## 3.纹理（Textures）

纹理是一个数据序列，可以在着色程序中任意读取数据，大多数情况下存储图像数据，也可以存储颜色以外的其它数据。

## 4.可变量（Varyings）

可变量是一种顶点着色器给片段着色器传值的方式，依照渲染的图元是点， 线或是三角形，顶点着色器中设置的可变量会在片段着色器运行中获取不同的插值。