
# 1. Update sistem
sudo apt-get update -y

# 2. Install dependencies dasar
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# 3. Install Docker dan Docker Compose
sudo apt-get install -y docker.io docker-compose-v2

# 4. Menjalankan dan mengaktifkan Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Tambahkan user saat ini ke grup docker agar tidak perlu sudo
sudo usermod -aG docker $USER
