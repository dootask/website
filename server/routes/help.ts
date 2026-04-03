export default defineEventHandler((event) => {
  return sendRedirect(event, '/help/', 301)
})
