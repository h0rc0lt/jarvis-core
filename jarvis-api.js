/**
 * JARVIS Core API Module
 * OpenClaw Gateway API wrapper
 * 
 * Használat:
 *   <script src="jarvis-api.js"></script>
 *   <script>
 *     const jarvis = new JARVISApi();
 *     jarvis.getStatus().then(data => console.log(data));
 *   </script>
 */

class JARVISApi {
    constructor(options = {}) {
        this.gatewayUrl = options.gatewayUrl || 'http://localhost:18789';
        this.token = options.token || null;
        this.debug = options.debug || false;
    }

    // Set API token
    setToken(token) {
        this.token = token;
    }

    // Debug mode
    setDebug(enabled) {
        this.debug = enabled;
    }

    // Generic API call
    async call(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(`${this.gatewayUrl}${endpoint}`, {
                method: options.method || 'GET',
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (this.debug) {
                console.log(`[JARVIS API] ${endpoint}`, data);
            }

            return data;
        } catch (error) {
            console.error(`[JARVIS API Error] ${endpoint}:`, error);
            throw error;
        }
    }

    // ============ Gateway Status ============
    
    async getStatus() {
        return this.call('/status');
    }

    async getSessionStatus() {
        return this.call('/api/session_status');
    }

    // ============ Sessions ============
    
    async listSessions(options = {}) {
        return this.call('/api/sessions/list', {
            method: 'POST',
            body: options
        });
    }

    async getSessionHistory(sessionKey, options = {}) {
        return this.call('/api/sessions/history', {
            method: 'POST',
            body: { sessionKey, ...options }
        });
    }

    async sendToSession(sessionKey, message) {
        return this.call('/api/sessions/send', {
            method: 'POST',
            body: { sessionKey, message }
        });
    }

    // ============ Tools ============
    
    async listTools() {
        return this.call('/api/tools/list');
    }

    async invokeTool(toolName, args = {}) {
        return this.call('/api/tools/invoke', {
            method: 'POST',
            body: { tool: toolName, args }
        });
    }

    // ============ Memory ============
    
    async searchMemory(query, options = {}) {
        return this.call('/api/memory/search', {
            method: 'POST',
            body: { query, ...options }
        });
    }

    async getMemory(path) {
        return this.call('/api/memory/get', {
            method: 'POST',
            body: { path }
        });
    }

    // ============ Cron / Tasks ============
    
    async listJobs() {
        return this.call('/api/cron/list');
    }

    async runJob(jobId) {
        return this.call('/api/cron/run', {
            method: 'POST',
            body: { jobId }
        });
    }

    // ============ Gateway Config ============
    
    async getConfig(path) {
        return this.call('/api/config/get', {
            method: 'POST',
            body: { path }
        });
    }

    async patchConfig(path, value) {
        return this.call('/api/config/patch', {
            method: 'POST',
            body: { path, value }
        });
    }

    // ============ Chat / Messages ============
    
    async sendMessage(message, options = {}) {
        return this.call('/api/chat', {
            method: 'POST',
            body: { message, ...options }
        });
    }

    // ============ Browser ============
    
    async browserSnapshot(options = {}) {
        return this.call('/api/browser/snapshot', {
            method: 'POST',
            body: options
        });
    }

    async browserAct(options = {}) {
        return this.call('/api/browser/act', {
            method: 'POST',
            body: options
        });
    }

    // ============ Nodes ============
    
    async listNodes() {
        return this.call('/api/nodes/list');
    }

    async getNodeStatus(nodeId) {
        return this.call('/api/nodes/status', {
            method: 'POST',
            body: { nodeId }
        });
    }

    // ============ Utility ============
    
    // Check if gateway is reachable
    async ping() {
        try {
            await this.call('/status');
            return true;
        } catch {
            return false;
        }
    }

    // Get gateway info
    async info() {
        return this.call('/api/info');
    }
}

// Export for use in browser
if (typeof window !== 'undefined') {
    window.JARVISApi = JARVISApi;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JARVISApi;
}
