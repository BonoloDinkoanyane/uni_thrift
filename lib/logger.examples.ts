/**
 * Example Usage of Production Logger
 * 
 * This file demonstrates various ways to use the logger in your application.
 * Copy and adapt these examples to your specific use cases.
 */

import {
    logDebug,
    logInfo,
    logWarn,
    logError,
    createLogger,
    startPerformanceLog,
    generateCorrelationId,
    type LogMetadata,
} from './logger';

// ============================================================================
// Example 1: Basic Function-Based Logging
// ============================================================================

export async function basicLoggingExample() {
    // Debug logging (development only)
    logDebug('Example', 'This only shows in development', { data: 'test' });

    // Info logging
    logInfo('Example', 'Application started successfully', {
        version: '1.0.0',
        environment: process.env.NODE_ENV
    });

    // Warning logging
    logWarn('Example', 'Cache miss detected', {
        cacheKey: 'user:123',
        fallback: 'database'
    });

    // Error logging
    try {
        throw new Error('Something went wrong');
    } catch (error) {
        logError('Example', error, {
            operation: 'basicLoggingExample',
            timestamp: new Date().toISOString()
        });
    }
}

// ============================================================================
// Example 2: Class-Based Logger with Context
// ============================================================================

class UserService {
    private logger = createLogger('UserService', {
        service: 'authentication',
        version: '2.0.0'
    });

    async createUser(email: string, name: string) {
        this.logger.info('Creating new user', { email, name });

        try {
            // Simulate user creation
            const user = { id: 'usr_123', email, name };

            this.logger.info('User created successfully', {
                userId: user.id,
                email: user.email
            });

            return user;
        } catch (error) {
            this.logger.error(error, {
                operation: 'createUser',
                email
            });
            throw error;
        }
    }

    async deleteUser(userId: string) {
        this.logger.warn('User deletion requested', { userId });

        try {
            // Simulate deletion
            await new Promise(resolve => setTimeout(resolve, 100));

            this.logger.info('User deleted', { userId });
        } catch (error) {
            this.logger.error(error, {
                operation: 'deleteUser',
                userId
            });
            throw error;
        }
    }
}

// ============================================================================
// Example 3: Performance Monitoring
// ============================================================================

export async function performanceMonitoringExample() {
    const logger = createLogger('PerformanceExample');

    // Method 1: Using startPerformanceLog function
    const perf1 = startPerformanceLog('DatabaseQuery', 'fetchUsers');

    // Simulate slow operation
    await new Promise(resolve => setTimeout(resolve, 1500));

    perf1.end({ recordCount: 150 });
    // Will log warning because > 1000ms

    // Method 2: Using logger.perf() method
    const perf2 = logger.perf('cacheOperation');

    // Simulate fast operation
    await new Promise(resolve => setTimeout(resolve, 50));

    perf2.end({ cacheHit: true });
    // Will log debug message
}

// ============================================================================
// Example 4: API Route with Correlation IDs
// ============================================================================

export async function apiRouteExample(request: Request) {
    // Generate correlation ID for request tracking
    const correlationId = generateCorrelationId();
    const logger = createLogger('UserAPI', { correlationId });

    const perf = logger.perf('handleRequest');

    try {
        logger.info('Request received', {
            method: request.method,
            url: request.url,
        });

        const body = await request.json();

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 100));

        logger.info('Request processed successfully');
        perf.end({ status: 'success' });

        return { success: true, correlationId };
    } catch (error) {
        logger.error(error, { operation: 'handleRequest' });
        perf.end({ status: 'error' });
        throw error;
    }
}

// ============================================================================
// Example 5: Server Action with Detailed Logging
// ============================================================================

export async function serverActionExample(userId: string, data: any) {
    const logger = createLogger('UserActions', {
        userId,
        action: 'updateProfile'
    });

    const perf = logger.perf('updateProfile');

    try {
        logger.info('Profile update started', {
            fields: Object.keys(data)
        });

        // Validate data
        if (!data.name) {
            logger.warn('Missing required field', { field: 'name' });
            throw new Error('Name is required');
        }

        // Simulate update
        await new Promise(resolve => setTimeout(resolve, 200));

        logger.info('Profile updated successfully', {
            updatedFields: Object.keys(data)
        });

        perf.end({ success: true, fieldCount: Object.keys(data).length });

        return { success: true };
    } catch (error) {
        logger.error(error, {
            operation: 'updateProfile',
            attemptedFields: Object.keys(data)
        });

        perf.end({ success: false });
        return { success: false, error: 'Update failed' };
    }
}

// ============================================================================
// Example 6: Error Handling with Retries
// ============================================================================

export async function retryableOperationExample() {
    const logger = createLogger('RetryService');
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            logger.info('Attempting operation', { attempt, maxRetries });

            // Simulate operation that might fail
            if (Math.random() > 0.7) {
                throw new Error('Random failure');
            }

            logger.info('Operation succeeded', { attempt });
            return { success: true };
        } catch (error) {
            logger.warn('Operation failed, will retry', {
                attempt,
                maxRetries,
                error: error instanceof Error ? error.message : String(error)
            });

            if (attempt === maxRetries) {
                logger.error(error, {
                    operation: 'retryableOperation',
                    finalAttempt: attempt
                });
                throw error;
            }

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

// ============================================================================
// Example 7: Sensitive Data Handling
// ============================================================================

export function sensitiveDataExample() {
    const logger = createLogger('AuthService');

    // These will be automatically redacted
    logger.info('User login attempt', {
        email: 'user@example.com',
        password: 'secret123', // Will be [REDACTED]
        token: 'abc123xyz', // Will be [REDACTED]
        apiKey: 'sk_live_123', // Will be [REDACTED]
    });

    // Safe to log
    logger.info('Login successful', {
        userId: 'usr_123',
        email: 'user@example.com',
        loginTime: new Date().toISOString(),
    });
}

// ============================================================================
// Example 8: Multi-Step Process Logging
// ============================================================================

export async function multiStepProcessExample(orderId: string) {
    const correlationId = generateCorrelationId();
    const logger = createLogger('OrderProcessing', {
        orderId,
        correlationId
    });

    logger.info('Order processing started');

    // Step 1: Validate
    const validatePerf = logger.perf('validateOrder');
    try {
        logger.debug('Validating order');
        await new Promise(resolve => setTimeout(resolve, 100));
        validatePerf.end({ valid: true });
    } catch (error) {
        logger.error(error, { step: 'validation' });
        validatePerf.end({ valid: false });
        throw error;
    }

    // Step 2: Process Payment
    const paymentPerf = logger.perf('processPayment');
    try {
        logger.info('Processing payment');
        await new Promise(resolve => setTimeout(resolve, 200));
        paymentPerf.end({ status: 'success' });
    } catch (error) {
        logger.error(error, { step: 'payment' });
        paymentPerf.end({ status: 'failed' });
        throw error;
    }

    // Step 3: Fulfill Order
    const fulfillPerf = logger.perf('fulfillOrder');
    try {
        logger.info('Fulfilling order');
        await new Promise(resolve => setTimeout(resolve, 150));
        fulfillPerf.end({ status: 'completed' });
    } catch (error) {
        logger.error(error, { step: 'fulfillment' });
        fulfillPerf.end({ status: 'failed' });
        throw error;
    }

    logger.info('Order processing completed successfully');
    return { orderId, correlationId, status: 'completed' };
}

// ============================================================================
// Example 9: Conditional Logging
// ============================================================================

export function conditionalLoggingExample(config: { enableVerboseLogging: boolean }) {
    const logger = createLogger('ConfigService');

    logger.info('Service initialized');

    if (config.enableVerboseLogging) {
        logger.debug('Verbose logging enabled', { config });
    }

    // Only log in specific conditions
    const threshold = 100;
    const value = 150;

    if (value > threshold) {
        logger.warn('Value exceeded threshold', {
            value,
            threshold,
            difference: value - threshold
        });
    }
}

// ============================================================================
// Example 10: Database Query Logging
// ============================================================================

export async function databaseQueryExample() {
    const logger = createLogger('Database', {
        database: 'postgres',
        schema: 'public'
    });

    const queries: string[] = [
        'SELECT * FROM users WHERE active = true',
        'UPDATE users SET last_login = NOW() WHERE id = $1',
        'DELETE FROM sessions WHERE expires_at < NOW()',
    ];

    for (const query of queries) {
        const perf = logger.perf('executeQuery');

        try {
            logger.debug('Executing query', {
                query: query.substring(0, 50) + '...'
            });

            // Simulate query execution
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

            const rowCount = Math.floor(Math.random() * 100);

            perf.end({ rowCount, success: true });

            logger.debug('Query completed', { rowCount });
        } catch (error) {
            logger.error(error, { query: query.substring(0, 50) });
            perf.end({ success: false });
        }
    }
}

// ============================================================================
// Run Examples (for testing)
// ============================================================================

export async function runAllExamples() {
    console.log('\n=== Running Logger Examples ===\n');

    await basicLoggingExample();

    const userService = new UserService();
    await userService.createUser('test@example.com', 'Test User');

    await performanceMonitoringExample();

    sensitiveDataExample();

    await multiStepProcessExample('ord_123');

    conditionalLoggingExample({ enableVerboseLogging: true });

    await databaseQueryExample();

    console.log('\n=== Examples Completed ===\n');
}

// Uncomment to run examples:
// runAllExamples();
