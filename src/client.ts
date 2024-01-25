import {createPromiseClient, PromiseClient, Transport} from "@connectrpc/connect";
import {createConnectTransport as createNodeConnectTransport} from "@connectrpc/connect-node";
import {createConnectTransport as createWebConnectTransport} from "@connectrpc/connect-web";
import {v4 as uuidv4} from 'uuid';
import {defaultApiHost} from "./consts";
import {Event} from "./events";
import {IngestionService} from "@buf/impaction-ai_ingestion.connectrpc_es/ingestion/v1alpha/ingestion_connect";

export enum TransportType {
    NodeHTTP11,
    Web,
}

export class AlignAI {
    private readonly projectId: string;
    private readonly apiKey: string;
    private client: PromiseClient<typeof IngestionService>;

    constructor(projectId?: string, apiKey?: string, apiHost?: string, transportType: TransportType = TransportType.NodeHTTP11) {
        let transport: Transport;
        switch (transportType) {
            case TransportType.NodeHTTP11:
                transport = createNodeConnectTransport({
                    httpVersion: "1.1",
                    baseUrl: apiHost ?? defaultApiHost,
                });
                break;
            case TransportType.Web:
                transport = createWebConnectTransport({
                    baseUrl: apiHost ?? defaultApiHost,
                });
                break;
        }
        this.projectId = projectId ?? process.env.ALIGNAI_PROJECT_ID ?? '';
        this.apiKey = apiKey ?? process.env.ALIGNAI_API_KEY ?? '';
        this.client = createPromiseClient(IngestionService, transport);
    }

    public async collectEvents(...events: Event[]): Promise<void> {
        await this.client.collectEvents({
            requestId: uuidv4(),
            events: events.map((event) => {
                const pb = event.toPB();
                pb.projectId = this.projectId;
                return pb;
            }),
        }, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            }
        })
    }
}