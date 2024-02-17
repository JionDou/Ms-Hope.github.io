---
title: 第一章
category: webgl
tag:
  - 二维平移、旋转缩放和矩阵运算
---

## 二维平移

平移就是普通意义的“移动”物体。可以改变传递给 setRectangle 的值，移动矩形的位置。

```js
//定义一些变量存储矩形的平移，宽，高和颜色
const translation = [0, 0];
const width = 100;
const height = 30;
const color = [Math.random(), Math.random(), Math.random(), 1];
//然后定义一个方法重绘所有东西，可以在更新变换之后调用这个方法。
// 绘制场景
function drawScene() {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // 告诉WebGL如何从裁剪空间对应到像素
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // 清空画布
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 使用我们的程序
  gl.useProgram(program);

  // 启用属性
  gl.enableVertexAttribArray(positionLocation);

  // 绑定位置缓冲
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 设置矩形参数
  setRectangle(gl, translation[0], translation[1], width, height);

  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 2; // 每次迭代运行提取两个单位数据
  var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
  var offset = 0; // 从缓冲起始位置开始读取
  gl.vertexAttribPointer(
    positionLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // 设置分辨率
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

  // 设置颜色
  gl.uniform4fv(colorLocation, color);

  // 绘制矩形
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}
//添加一对滑块，当它们值改变时会更新translation[0] 和 translation[1] 并且调用drawScene方法。拖动滑块来平移矩形。
function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}
```

## 二维旋转
一个圆有一个半径，圆的半径是圆心到圆边缘的距离。单位圆是半径为 1.0 的圆。

## 二维缩放

## 二维矩阵
