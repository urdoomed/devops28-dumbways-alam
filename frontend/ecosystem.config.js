module.exports = {
  apps: [{
    name: "wayshub-frontend",
    script: "npm",
    args: "start",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
