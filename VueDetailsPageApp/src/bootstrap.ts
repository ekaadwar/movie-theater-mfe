import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createAppRouter } from './router'
import './styles/main.css'

export interface MountOptions {
  base?: string
}

export function mountApp(container: string | Element, options: MountOptions = {}) {
  const target = typeof container === 'string' ? document.querySelector(container) : container

  if (!target) {
    throw new Error('Mount container was not found')
  }

  const app = createApp(App)
  const pinia = createPinia()
  const router = createAppRouter(options.base ?? '/')

  app.use(pinia)
  app.use(router)
  app.mount(target)

  return {
    app,
    router,
    pinia,
    unmount: () => app.unmount()
  }
}
