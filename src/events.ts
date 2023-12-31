import {Timestamp} from '@bufbuild/protobuf'
import {v4 as uuidv4} from 'uuid';
import {Event as PBEvent, EventProperties_MessageProperties_Role} from './buf/event_pb';
import {defaultAssistantId} from "./consts";

export interface Event {
    toPB(): PBEvent;
}

interface OpenSessionEventProps {
    sessionId: string;
    userId: string;
    assistantId?: string;
    sessionTitle?: string;
}

export class OpenSessionEvent implements Event {
    private readonly event: PBEvent;
    constructor(props: OpenSessionEventProps) {
        this.event = new PBEvent({
            id: uuidv4(),
            type: 'session_open',
            createTime: Timestamp.now(),
            properties: {
                reservedProperties: {
                    case: 'sessionProperties',
                    value: {
                        sessionId: props.sessionId,
                        sessionTitle: props.sessionTitle ?? '',
                        sessionStartTime: Timestamp.now(),
                        userId: props.userId,
                        assistantId: props.assistantId ?? defaultAssistantId,
                    },
                }
            }
        });
    }

    toPB(): PBEvent {
        return this.event;
    }
}

interface CreateMessageEventProps {
    sessionId: string;
    messageIndex: number;
    messageRole: 'user' | 'assistant';
    messageContent: string;
}

export class CreateMessageEvent implements Event {
    private readonly event: PBEvent;
    constructor(props: CreateMessageEventProps) {
        this.event = new PBEvent({
            id: uuidv4(),
            type: 'message_create',
            createTime: Timestamp.now(),
            properties: {
                reservedProperties: {
                    case: 'messageProperties',
                    value: {
                        sessionId: props.sessionId,
                        messageIndexHint: props.messageIndex,
                        messageRole: props.messageRole === 'user' ? EventProperties_MessageProperties_Role.USER : EventProperties_MessageProperties_Role.ASSISTANT,
                        messageContent: props.messageContent,
                    },
                }
            }
        });
    }

    toPB(): PBEvent {
        return this.event;
    }
}

interface CloseSessionEventProps {
    sessionId: string;
}

export class CloseSessionEvent implements Event {
    private readonly event: PBEvent;
    constructor(props: CloseSessionEventProps) {
        this.event = new PBEvent({
            id: uuidv4(),
            type: 'session_close',
            createTime: Timestamp.now(),
            properties: {
                reservedProperties: {
                    case: 'sessionProperties',
                    value: {
                        sessionId: props.sessionId,
                    },
                }
            }
        });
    }

    toPB(): PBEvent {
        return this.event;
    }
}

interface IdentifyUserEventProps {
    userId: string;
    userDisplayName?: string;
    userEmail?: string;
    userIp?: string;
    userCountryCode?: string;
    userCreateTime?: Date;
}

export class IdentifyUserEvent implements Event {
    private readonly event: PBEvent;
    constructor(props: IdentifyUserEventProps) {
        this.event = new PBEvent({
            id: uuidv4(),
            type: 'user_recognize',
            createTime: Timestamp.now(),
            properties: {
                reservedProperties: {
                    case: 'userProperties',
                    value: {
                        userId: props.userId,
                        userDisplayName: props.userDisplayName ?? '',
                        userEmail: props.userEmail ?? '',
                        userIp: !props.userCountryCode && props.userIp ? props.userIp : '',
                        userLocation: props.userCountryCode ? {
                            countryCode: props.userCountryCode,
                        } : undefined,
                        userCreateTime: props.userCreateTime ? Timestamp.fromDate(props.userCreateTime) : Timestamp.now(),
                    },
                }
            }
        });
    }

    toPB(): PBEvent {
        return this.event;
    }
}