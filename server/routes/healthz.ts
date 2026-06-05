// /healthz → 健康检查,返回 200,零依赖、零外部 I/O
export default defineEventHandler(() => ({ status: 'ok' }))
