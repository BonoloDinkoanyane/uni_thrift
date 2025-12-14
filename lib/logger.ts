/**
 * Production-Level Logger
 * 
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Structured logging with metadata
 * - Error tracking service integration
 * - Sensitive data sanitization
 * - Performance monitoring
 * - Environment-based configuration
 * - Correlation IDs for request tracking
 */

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export interface LogMetadata {
    [key: string]: any;
    userId?: string;
    correlationId?: string;
    timestamp?: string;
    requestId?: string;
    sessionId?: string;
}

export interface LogEntry {
    level: LogLevel;
    context: string;
    message: string;
    metadata?: LogMetadata;
    error?: Error;
    timestamp: string;
    environment: string;
}

// Sensitive field patterns to sanitize
const SENSITIVE_PATTERNS = [
    'password',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'authorization',
    'cookie',
    'sessionId',
    'session_id',
    'ssn',
    'creditCard',
    'credit_card',
];

/**
 * Sanitize sensitive data from metadata
 */
function sanitizeMetadata(metadata?: LogMetadata): LogMetadata | undefined {
    if (!metadata) return undefined;

    const sanitized = { ...metadata };

    Object.keys(sanitized).forEach((key) => {
        const lowerKey = key.toLowerCase();
        const isSensitive = SENSITIVE_PATTERNS.some((pattern) =>
            lowerKey.includes(pattern.toLowerCase())
        );

        if (isSensitive) {
            sanitized[key] = '[REDACTED]';
        }
    });

    return sanitized;
}

/**
 * Format log entry for console output
 */
function formatConsoleLog(entry: LogEntry): void {
    const emoji = {
        [LogLevel.DEBUG]: '🔍',
        [LogLevel.INFO]: 'ℹ️',
        [LogLevel.WARN]: '⚠️',
        [LogLevel.ERROR]: '❌',
    };

    const timestamp = new Date(entry.timestamp).toISOString();
    const prefix = `${emoji[entry.level]} [${entry.level.toUpperCase()}] [${entry.context}] ${timestamp}`;

    const logFn = {
        [LogLevel.DEBUG]: console.debug,
        [LogLevel.INFO]: console.info,
        [LogLevel.WARN]: console.warn,
        [LogLevel.ERROR]: console.error,
    }[entry.level];

    if (entry.error) {
        logFn(prefix, entry.message, '\n', entry.error, entry.metadata || {});
    } else {
        logFn(prefix, entry.message, entry.metadata || {});
    }
}

/**
 * Send logs to external monitoring service
 */
async function sendToMonitoringService(entry: LogEntry): Promise<void> {
    try {
        // Integration point for Sentry, DataDog, LogRocket, etc.
        // Uncomment and configure based on your monitoring service

        // Example: Sentry integration
        // if (entry.level === LogLevel.ERROR && entry.error) {
        //   Sentry.captureException(entry.error, {
        //     tags: {
        //       context: entry.context,
        //       environment: entry.environment,
        //     },
        //     extra: entry.metadata,
        //     level: 'error',
        //   });
        // } else {
        //   Sentry.captureMessage(entry.message, {
        //     tags: {
        //       context: entry.context,
        //       environment: entry.environment,
        //     },
        //     extra: entry.metadata,
        //     level: entry.level,
        //   });
        // }

        // Example: Custom API endpoint
        // await fetch('/api/logs', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(entry),
        // });
    } catch (error) {
        // Fallback to console if monitoring service fails
        console.error('Failed to send log to monitoring service:', error);
    }
}

/**
 * Core logging function
 */
async function log(
    level: LogLevel,
    context: string,
    message: string,
    metadata?: LogMetadata,
    error?: Error
): Promise<void> {
    const entry: LogEntry = {
        level,
        context,
        message,
        metadata: sanitizeMetadata(metadata),
        error,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    };

    // Always log to console in development
    if (process.env.NODE_ENV !== 'production') {
        formatConsoleLog(entry);
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
        await sendToMonitoringService(entry);
    }

    // Optional: Also log errors to console in production for server logs
    if (process.env.NODE_ENV === 'production' && level === LogLevel.ERROR) {
        formatConsoleLog(entry);
    }
}

/**
 * Log debug messages (development only)
 */
export function logDebug(
    context: string,
    message: string,
    metadata?: LogMetadata
): void {
    if (process.env.NODE_ENV !== 'production') {
        log(LogLevel.DEBUG, context, message, metadata);
    }
}

/**
 * Log informational messages
 */
export function logInfo(
    context: string,
    message: string,
    metadata?: LogMetadata
): void {
    log(LogLevel.INFO, context, message, metadata);
}

/**
 * Log warning messages
 */
export function logWarn(
    context: string,
    message: string,
    metadata?: LogMetadata
): void {
    log(LogLevel.WARN, context, message, metadata);
}

/**
 * Log error messages with error object
 */
export function logError(
    context: string,
    error: unknown,
    metadata?: LogMetadata
): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorObject = error instanceof Error ? error : new Error(String(error));

    log(LogLevel.ERROR, context, errorMessage, metadata, errorObject);
}

/**
 * Performance monitoring helper
 */
export class PerformanceLogger {
    private startTime: number;
    private context: string;
    private operation: string;

    constructor(context: string, operation: string) {
        this.context = context;
        this.operation = operation;
        this.startTime = performance.now();
    }

    /**
     * End performance tracking and log duration
     */
    end(metadata?: LogMetadata): void {
        const duration = performance.now() - this.startTime;
        const enhancedMetadata = {
            ...metadata,
            duration: `${duration.toFixed(2)}ms`,
            operation: this.operation,
        };

        if (duration > 1000) {
            logWarn(this.context, `Slow operation: ${this.operation}`, enhancedMetadata);
        } else {
            logDebug(this.context, `Operation completed: ${this.operation}`, enhancedMetadata);
        }
    }
}

/**
 * Create a performance logger for tracking operation duration
 * 
 * @example
 * const perf = startPerformanceLog('UserService', 'fetchUserData');
 * await fetchUserData();
 * perf.end({ userId: '123' });
 */
export function startPerformanceLog(
    context: string,
    operation: string
): PerformanceLogger {
    return new PerformanceLogger(context, operation);
}

/**
 * Generate a correlation ID for request tracking
 */
export function generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Structured logger class with context
 */
export class Logger {
    private context: string;
    private defaultMetadata: LogMetadata;

    constructor(context: string, defaultMetadata: LogMetadata = {}) {
        this.context = context;
        this.defaultMetadata = defaultMetadata;
    }

    private mergeMetadata(metadata?: LogMetadata): LogMetadata {
        return { ...this.defaultMetadata, ...metadata };
    }

    debug(message: string, metadata?: LogMetadata): void {
        logDebug(this.context, message, this.mergeMetadata(metadata));
    }

    info(message: string, metadata?: LogMetadata): void {
        logInfo(this.context, message, this.mergeMetadata(metadata));
    }

    warn(message: string, metadata?: LogMetadata): void {
        logWarn(this.context, message, this.mergeMetadata(metadata));
    }

    error(error: unknown, metadata?: LogMetadata): void {
        logError(this.context, error, this.mergeMetadata(metadata));
    }

    perf(operation: string): PerformanceLogger {
        return startPerformanceLog(this.context, operation);
    }
}

/**
 * Create a logger instance with context
 * 
 * @example
 * const logger = createLogger('UserService', { service: 'api' });
 * logger.info('User created successfully', { userId: '123' });
 * logger.error(new Error('Failed to update user'), { userId: '123' });
 */
export function createLogger(
    context: string,
    defaultMetadata?: LogMetadata
): Logger {
    return new Logger(context, defaultMetadata);
}