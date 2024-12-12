# ContainerCraft: Command Reference Guide

### 📑 Content Table
- [Core Container Operations](#core-container-operations)
- [Image Management](#image-management)
- [Container Management](#container-management)
- [Monitoring and Debugging](#monitoring-and-debugging)
- [Production Operations](#production-operations)

<div align="left">

> **Author**: [Md Toriqul Islam](https://linkedin.com/in/thetoriqul)  
> **Project**: ContainerCraft - Advanced Node.js Containerization  
> **Focus**: Docker optimization and production deployment  
> **Note**: Review commands thoroughly before execution

</div>

## Core Container Operations

### Building the Application Image
```bash
# Build the Docker image with tag
docker build -t my-node-app:1.0 .

# Verify image creation
docker images | grep my-node-app
```

### Running the Container
```bash
# Run container in detached mode with port mapping
docker run -d \
    --name my-node-app-container \
    -p 80:8080 \
    my-node-app:1.0

# Verify container is running
docker ps -f name=my-node-app-container
```

### Testing the Application
```bash
# Test using curl
curl http://localhost:80

# Check container logs
docker logs my-node-app-container
```

## Image Management

### Multi-Stage Build
```bash
# Build using multi-stage Dockerfile
docker build \
    --target production \
    -t my-node-app:prod \
    .

# Verify image size reduction
docker images my-node-app
```

### Image Push Operations
```bash
# Tag image for Docker Hub
docker tag my-node-app:1.0 ${DOCKER_ID}/my-node-app:1.0

# Push to Docker Hub
docker push ${DOCKER_ID}/my-node-app:1.0

# Verify remote image
docker pull ${DOCKER_ID}/my-node-app:1.0
```

## Container Management

### Container Lifecycle
```bash
# Stop container
docker stop my-node-app-container

# Start container
docker start my-node-app-container

# Remove container
docker rm -f my-node-app-container
```

### Resource Management
```bash
# Run with resource limits
docker run -d \
    --name my-node-app-container \
    --memory="512m" \
    --cpus="1.0" \
    -p 80:8080 \
    my-node-app:1.0

# View container resource usage
docker stats my-node-app-container
```

## Monitoring and Debugging

### Container Inspection
```bash
# View container details
docker inspect my-node-app-container

# Follow container logs
docker logs -f my-node-app-container

# Execute command inside container
docker exec -it my-node-app-container sh
```

### Health Monitoring
```bash
# Check container health status
docker inspect \
    --format='{{.State.Health.Status}}' \
    my-node-app-container

# View health check logs
docker inspect \
    --format='{{json .State.Health}}' \
    my-node-app-container | jq
```

## Production Operations

### Production Deployment
```bash
# Run with automatic restart
docker run -d \
    --name my-node-app-prod \
    --restart always \
    -p 80:8080 \
    -e NODE_ENV=production \
    my-node-app:prod

# Verify production configuration
docker exec my-node-app-prod printenv NODE_ENV
```

### Security Operations
```bash
# Scan image for vulnerabilities
docker scan my-node-app:prod

# Run with security options
docker run -d \
    --name my-node-app-secure \
    --security-opt no-new-privileges \
    --cap-drop ALL \
    -p 80:8080 \
    my-node-app:prod
```

## Learning Notes

1. Always use specific version tags for production images
2. Implement health checks for production containers
3. Use multi-stage builds to reduce image size
4. Apply resource limits in production environments
5. Regular security scanning is crucial for production images

---

> 💡 **Best Practice**: Use multi-stage builds and .dockerignore to optimize image size

> ⚠️ **Warning**: Never run containers with root privileges in production

> 📝 **Note**: Adjust memory and CPU limits based on your application's needs