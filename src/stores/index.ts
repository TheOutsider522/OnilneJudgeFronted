//引入pinia
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//创建pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
//导出pinia用于main.ts注册
export default pinia
