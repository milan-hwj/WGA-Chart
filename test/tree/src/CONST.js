/* global  */
export default {
    ranksep: 200, // 节点层级间的距离
    nodesep: 42, // 同级节点间距离
    rankdir: 'LR', // 图布局方向
    borderWidth: 1, // 节点边框厚度
    childNodeBorderColor: 'rgba(253, 189, 97, 1)', // 右侧节点边框颜色
    childNodeColor: 'rgba(254, 220, 171, 1)', // 右侧节点填充色
    childLinkColor: 'rgba(255, 242, 224, 1)', // 右侧线颜色
    parentNodeBorderColor: 'rgba(160, 218, 131, 1)', // 左侧节点边框颜色
    parentNodeColor: 'rgba(187, 229, 165, 1)', // 左侧节点填充色
    parentLinkColor: 'rgba(236, 248, 230, 1)', // 左侧线颜色
    rootNodeBorderColor: 'rgba(93, 198, 236, 1)', // 根节点边框颜色
    rootNodeColor: 'rgba(164, 231, 254, 1)', // 根节点填充色
    // highLightCurrentColor: 'rgba(237, 95, 97, 1)', // 高亮节点颜色(当前聚焦点)
    // highLightColor: 'rgba(255, 150, 50, 1)', // 高亮节点颜色
    topLevelColors: [
        'rgba(203, 101, 102, 1)',
        'rgba(246, 130, 131, 1)',
        'rgba(235, 107, 42,  1)',
        'rgba(231, 145, 68,  1)',
        'rgba(236, 182, 55,  1)',
        'rgba(243, 209, 66,  1)',
        'rgba(207, 232, 98,  1)',
        'rgba(182, 214, 92,  1)',
        'rgba(156, 209, 121, 1)',
        'rgba(118, 182, 85,  1)'
    ], // 第一层树节点颜色序列
    topLevelBorderColors: [
        'rgba(171, 82, 2, 1)',
        'rgba(186, 93, 13, 1)',
        'rgba(202, 78, 1, 1)',
        'rgba(195, 89, 4, 1)',
        'rgba(198, 153, 14, 1)',
        'rgba(202, 174, 8, 1)',
        'rgba(162, 191, 13, 1)',
        'rgba(130, 155, 11, 1)',
        'rgba(118, 169, 3, 1)',
        'rgba(89, 142, 12, 1)'
    ], // 第一层树节点边框颜色
    fontColor: '#666', // 字体颜色
    fontSize: 12,
    fontFamily: '',
    fontMargin: 5, // 字体与节点距离
    highLightLabelMargin: 6, // 字体与高亮背景边框距离
    highLightLabelBackgroud: 'rgba(196, 237, 253, 1)', // 文字高亮背景色
    highLightLabelBorder: 'rgba(92, 196, 236, 1)', // 文字高亮边框色
    highLightLineWidth: 2, // 文字高亮边框厚度
    nodeSize: 20, // 普通节点直径
    linkSize: 4, // 线宽度
    rootSize: 32 // 根节点直径
};
