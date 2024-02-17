import { arraySidebar } from "vuepress-theme-hope";

export const webgl = arraySidebar([
  "",
  {
    text: "基础概念",
    prefix: "BasicConcepts/",
    children: ["charpter1", "charpter2"],
  },
  {
    text: "图像处理",
    prefix: "ImageProcessing/",
    children: ["charpter1"],
  },
  {
    text: "二维平移、旋转缩放和矩阵运算",
    prefix: "quatum/",
    children: ["charpter1"],
  },
  {
    text: "三维",
    prefix: "tsp/",
    children: ["charpter1", "charpter2", "charpter3"],
  },
]);
