import {EventProperties_CustomPropertyValue} from "./buf/event_pb";
import {customPropertyKeyPattern, customPropertyKeyRegex} from "./consts";
import {CustomProperties} from "./events";

export function serializeCustomProperties(props: CustomProperties) {
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = EventProperties_CustomPropertyValue.fromJson({stringValue: value});
        }

        return acc;
    }, {} as Record<string, EventProperties_CustomPropertyValue>);
}

export function validateSessionIdOrThrow(sessionId: string) {
    if (!sessionId) {
        throw new Error('sessionId is required');
    }
    if (sessionId.length > 64) {
        throw new Error('sessionId must be at most 64 characters');
    }
}

export function validateUserIdOrThrow(userId: string) {
    if (!userId) {
        throw new Error('userId is required');
    }
    if (userId.length > 64) {
        throw new Error('userId must be at most 64 characters');
    }
}

export function validateCustomPropertiesOrThrow(customProperties: CustomProperties) {
    const entries = Object.entries(customProperties);

    if (entries.length > 10) {
        throw new Error('customProperties must have at most 10 keys');
    }
    entries.forEach(([key, value]) => {
        if (!key) {
            throw new Error('key of customProperty is required');
        }
        if (customPropertyKeyRegex.test(key) === false) {
            throw new Error(`key of customProperty must match ${customPropertyKeyPattern}`);
        }
        if (value.length > 256) {
            throw new Error('value of customProperty must be at most 256 characters');
        }
    })
}