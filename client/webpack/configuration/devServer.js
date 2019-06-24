export default {
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: "http://localhost:3001",
      secure: false
    }
  }
}