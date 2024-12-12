# ContainerCraft: Node.js Single-Container App Command Reference Guide

### Project content table
- [Section 1: Core Project Workflow](#section-1-core-project-workflow)
- [Section 2: Container Management](#section-2-container-management)
- [Section 3: Advanced Operations](#section-3-advanced-operations)
- [Section 4: Production Guide](#section-4-production-guide)
- [Section 5: Maintenance and Troubleshooting](#section-5-maintenance-and-troubleshooting)

> **Author**: [Md Toriqul Islam](https://linkedin.com/TheToriqul)  
> **Description**: Command reference for containerizing Node.js applications  
> **Learning Focus**: From basic containerization to production deployment  
> **Note**: Replace <docker_username> with your Docker Hub username

## Section 1: Core Project Workflow

### Project Setup
```bash
# Create project directory
mkdir my-node-app
cd my-node-app

# Verify setup
pwd
ls -la
```

### Container Build
```bash
# Build image
docker build -t my-node-app:1.0 .
```

### Docker Hub Operations
```bash
# Login to Docker Hub (will prompt for password)
docker login --username <docker_username>

# Tag image
docker tag my-node-app:1.0 <docker_username>/my-node-app:1.0

# Push to Docker Hub
docker push <docker_username>/my-node-app:1.0

# Pull image
docker pull <docker_username>/my-node-app:1.0

# List remote tags
curl -s https://registry.hub.docker.com/v2/repositories/<docker_username>/my-node-app/tags | jq '.'

```

### Run the Container
```bash
# Run container
docker run -d \
    --name my-node-app-container \
    -p 80:8080 \
    my-node-app:1.0

# Verify container
docker ps | grep my-node-app-container

# Test application
curl http://localhost:80
```

## Section 2: Container Management

### Layer Management
```bash
# View image layers
docker history my-node-app:1.0

# Detailed layer info
docker history --no-trunc my-node-app:1.0

# Show image details
docker inspect my-node-app:1.0

# Export image layers
docker save my-node-app:1.0 | gzip > my-node-app.tar.gz

# Load image from archive
docker load < my-node-app.tar.gz
```

### Basic Operations
```bash
# Stop container
docker stop my-node-app-container

# Start container
docker start my-node-app-container

# Restart container
docker restart my-node-app-container

# Remove container
docker rm my-node-app-container

# Remove image
docker rmi my-node-app:1.0

# Remove all unused images
docker image prune -a --force

# Verify cleanup
docker ps -a | grep my-node-app-container
```

## Section 3: Advanced Operations

### Multi-Stage Build
```bash
# Build with multi-stage Dockerfile and build args
docker build \
    --file Dockerfile.multistage \
    --build-arg NODE_VERSION=14 \
    --build-arg PORT=8080 \
    --no-cache \
    --compress \
    -t my-node-app:prod .

# Build for multiple platforms
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --push \
    -t <docker_username>/my-node-app:multi-arch .

# Compare image sizes
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | grep my-node-app
```

### Advanced Runtime Configuration
```bash
# Run with advanced network settings
docker run -d \
    --name my-node-app-container \
    --network host \
    --dns 8.8.8.8 \
    --add-host host.docker.internal:host-gateway \
    my-node-app:1.0

# Run with volume mounts
docker run -d \
    --name my-node-app-container \
    --volume $(pwd)/logs:/app/logs \
    --tmpfs /tmp \
    --mount type=bind,source=$(pwd)/config,target=/app/config \
    my-node-app:1.0

# Run with advanced resource constraints
docker run -d \
    --name my-node-app-container \
    --cpuset-cpus 0-1 \
    --memory-reservation 256m \
    --kernel-memory 100m \
    --pids-limit 100 \
    --ulimit nofile=1024:2048 \
    my-node-app:1.0
```

### Network Management
```bash
# Create custom network
docker network create \
    --driver bridge \
    --subnet 172.20.0.0/16 \
    --gateway 172.20.0.1 \
    my-node-app-network

# Connect container to network
docker network connect \
    --ip 172.20.0.10 \
    my-node-app-network my-node-app-container

# Network inspection
docker network inspect my-node-app-network

# Disconnect and remove network
docker network disconnect my-node-app-network my-node-app-container
docker network rm my-node-app-network
```

## Section 4: Production Guide

### Security Configuration
```bash
# Run with advanced security options
docker run -d \
    --name my-node-app-container \
    --user 1000:1000 \
    --cap-drop ALL \
    --cap-add NET_BIND_SERVICE \
    --security-opt no-new-privileges \
    --security-opt apparmor=docker-default \
    --read-only \
    --tmpfs /tmp:rw,noexec,nosuid \
    my-node-app:1.0

# Security scanning
docker scan \
    --file Dockerfile \
    --exclude-base \
    --severity high \
    my-node-app:1.0

# Sign image
docker trust sign my-node-app:1.0
```

### Production Deployment
```bash
# Run with production settings
docker run -d \
    --name my-node-app-container \
    --restart unless-stopped \
    --health-cmd "curl -f http://localhost:8080/health || exit 1" \
    --health-interval 30s \
    --health-retries 3 \
    --health-timeout 5s \
    --memory "1g" \
    --memory-swap "2g" \
    --cpus "1.0" \
    --pids-limit 100 \
    --log-driver json-file \
    --log-opt max-size=10m \
    --log-opt max-file=3 \
    -e NODE_ENV=production \
    -e TZ=UTC \
    my-node-app:1.0

# Check container health
docker inspect \
    --format "{{json .State.Health }}" \
    my-node-app-container | jq

# Configure logging
docker run -d \
    --name my-node-app-container \
    --log-driver syslog \
    --log-opt syslog-address=udp://localhost:514 \
    --log-opt tag="{{.Name}}/{{.ID}}" \
    my-node-app:1.0
```

### Performance Monitoring
```bash
# Monitor resource usage
docker stats \
    --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"

# Export container metrics
docker container stats \
    --no-stream \
    --format "json" > container-metrics.json

# Monitor events
docker events \
    --filter type=container \
    --format "{{json .}}"
```

## Section 5: Maintenance and Troubleshooting

### Debugging
```bash
# Interactive shell access
docker exec -it my-node-app-container sh

# Copy files from container
docker cp my-node-app-container:/app/logs .

# View processes in container
docker top my-node-app-container

# Follow container logs with timestamp
docker logs \
    --follow \
    --tail 100 \
    --timestamps \
    my-node-app-container

# Inspect container changes
docker diff my-node-app-container

# Export container filesystem
docker export my-node-app-container > container-backup.tar
```

### System Cleanup
```bash
# Remove all stopped containers
docker container prune --force

# Remove unused volumes
docker volume prune --force

# Remove unused networks
docker network prune --force

# Complete system cleanup
docker system prune \
    --all \
    --force \
    --volumes
```

## Learning Notes

1. Progress from basic commands to advanced configurations
2. Understand Docker layers and caching mechanisms
3. Implement proper security measures
4. Monitor and maintain production containers
5. Use appropriate debugging tools when needed

---

> 💡 **Best Practice**: 
> - Use multi-stage builds for smaller production images
> - Implement proper health checks
> - Set appropriate resource limits
> - Configure logging and monitoring
> - Regular security scanning

> ⚠️ **Warning**: 
> - Always verify security configurations
> - Monitor resource usage in production
> - Regularly update base images
> - Be cautious with privileged containers

> 📝 **Note**: 
> - Commands progress from basic to advanced
> - Production deployment requires careful planning
> - Security should be a primary concern
> - Regular maintenance is essential