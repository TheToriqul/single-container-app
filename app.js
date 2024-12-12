/**
 * ContainerCraft - Node.js HTTP Server
 * A simple, elegant HTTP server demonstrating containerization best practices
 * Author: Md Toriqul Islam
 */

const http = require('http');
const os = require('os');

// Server Configuration
const config = {
    hostname: '0.0.0.0',
    port: 8080,
    environment: process.env.NODE_ENV || 'development'
};

// Create response content
const getServerInfo = () => ({
    message: 'Welcome to ContainerCraft! 🚀',
    timestamp: new Date().toISOString(),
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: Math.floor(process.uptime()) + ' seconds',
    environment: config.environment
});

// Create HTTP server
const server = http.createServer((req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle different HTTP methods
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Set response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'ContainerCraft');

    // Send response
    res.writeHead(200);
    res.end(JSON.stringify(getServerInfo(), null, 2));

    // Log request
    console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
});

// Start server
server.listen(config.port, config.hostname, () => {
    console.log('\x1b[36m%s\x1b[0m', '🐳 ContainerCraft Server');
    console.log('\x1b[32m%s\x1b[0m', `🚀 Server running at http://${config.hostname}:${config.port}/`);
    console.log('\x1b[33m%s\x1b[0m', `🔧 Environment: ${config.environment}`);
    console.log('\x1b[34m%s\x1b[0m', `📝 Process ID: ${process.pid}`);
    console.log('\x1b[35m%s\x1b[0m', '✨ Ready for incoming connections\n');
});