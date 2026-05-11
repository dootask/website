export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const privacyUrl = config.privacyRedirectUrl

  if (!privacyUrl) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Privacy redirect URL is not configured',
    })
  }

  return sendRedirect(event, privacyUrl, 302)
})
