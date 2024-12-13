/* 动态标题 */
let defaultTitle = document.title; // 保存默认标题
let timeout;

// 当用户离开窗口时
window.addEventListener('blur', function () {
    document.title = "别走啊~"; // 修改为离开时的标题
});

// 当用户回到窗口时
window.addEventListener('focus', function () {
    document.title = "你回来啦！"; // 修改为回来时的标题

    // 设置一个2秒后的超时，恢复默认标题
    if (timeout) {
        clearTimeout(timeout); // 清除之前的超时，防止重复设置
    }
    timeout = setTimeout(() => {
        document.title = defaultTitle; // 恢复默认标题
    }, 1500); // 2秒后
});
