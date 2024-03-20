import {CustomProperties} from "./events";
import {customPropertyKeyPattern, customPropertyKeyRegex} from "./consts";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export function validateSessionIdOrThrow(sessionId: string) {
    if (!sessionId) {
        throw new ValidationError('sessionId is required');
    }
    if (sessionId.length > 64) {
        throw new ValidationError('sessionId must be at most 64 characters');
    }
}

export function validateUserIdOrThrow(userId: string) {
    if (!userId) {
        throw new ValidationError('userId is required');
    }
    if (userId.length > 64) {
        throw new ValidationError('userId must be at most 64 characters');
    }
}

export function validateCustomPropertiesOrThrow(customProperties: CustomProperties) {
    const entries = Object.entries(customProperties);

    if (entries.length > 10) {
        throw new ValidationError('customProperties must have at most 10 keys');
    }
    entries.forEach(([key, value]) => {
        if (!key) {
            throw new ValidationError('key of customProperty is required');
        }
        if (!customPropertyKeyRegex.test(key)) {
            throw new ValidationError(`key of customProperty must match ${customPropertyKeyPattern}`);
        }
        if (value.length > 256) {
            throw new ValidationError('value of customProperty must be at most 256 characters');
        }
    })
}