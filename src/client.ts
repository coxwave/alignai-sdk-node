import {createPromiseClient, PromiseClient} from "@connectrpc/connect";
import {createConnectTransport} from "@connectrpc/connect-node";
import {v4 as uuidv4} from 'uuid';
import {defaultApiHost} from "./consts";
import {Event} from "./events";
import {IngestionService} from "@buf/impaction-ai_ingestion.connectrpc_es/ingestion/v1alpha/ingestion_connect";

export class AlignAI {
    private readonly projectId: string;
    private readonly apiKey: string;
    private client: PromiseClient<typeof IngestionService>;

    constructor(projectId?: string, apiKey?: string, apiHost?: string) {
        const transport = createConnectTransport({
            httpVersion: "1.1",
            baseUrl: apiHost ?? defaultApiHost,
        });
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