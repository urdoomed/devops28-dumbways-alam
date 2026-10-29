module.exports = {
  apps: [
    {
      name: "wayshub-backend",
      script: "index.js", 
      cwd: "/home/alam/wayshub/backend/wayshub-backend", // Sesuai path di screenshot
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 5000 // Pastikan port ini sama dengan yang ada di index.js backend kamu
      }
    }
  ]
};
