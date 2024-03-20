import {EventProperties_CustomPropertyValue} from "./buf/event_pb";
import {CustomProperties} from "./events";

export function serializeCustomProperties(props: CustomProperties) {
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
            acc[key] = EventProperties_CustomPropertyValue.fromJson({stringValue: value});
        }

        return acc;
    }, {} as Record<string, EventProperties_CustomPropertyValue>);
}
