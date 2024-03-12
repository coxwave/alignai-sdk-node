import {EventProperties_CustomPropertyValue} from "./buf/event_pb";

export type CustomProperties = Record<string, string>;

export function serializeCustomProperties(props: CustomProperties) {
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = EventProperties_CustomPropertyValue.fromJson({stringValue: value});
        }

        return acc;
    }, {} as Record<string, EventProperties_CustomPropertyValue>);
}