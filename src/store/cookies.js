import { useCookie } from "vue-cookie-next";

const { get, set, remove } = useCookie();

// 导出可在全局范围内使用的 cookie 实例
export { get, set, remove };