---
title: 第一章
category: webgl
tag:
  - 图像处理
---

## 图像处理操作原理
在WebGL中绘制图片需要使用纹理。渲染纹理时需要纹理坐标，纹理坐标范围始终是0.0到1.0。

## 在GLSL中为什么变量的前缀都是 a_, u_ 或 v_ ？
那只是一个命名约定，不是强制要求的。 但是对我来说可以轻松通过名字知道值从哪里来，a_ 代表属性，值从缓冲中提供； u_ 代表全局变量，直接对着色器设置；v_ 代表可变量，是从顶点着色器的顶点中插值来出来的。

## 进一步处理图像
WebGL/OpenGL中的帧缓冲只是一系列状态（一列附加物）不是任何形式的缓冲。 但是当我们给帧缓冲绑定一个纹理后，可以将渲染结果写入那个纹理。




