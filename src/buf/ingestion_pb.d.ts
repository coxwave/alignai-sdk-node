// @generated by protoc-gen-es v1.10.0
// @generated from file ingestion/v1alpha/ingestion.proto (package ingestion.v1alpha, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { Event } from "./event_pb.js";

/**
 * @generated from message ingestion.v1alpha.CollectEventsRequest
 */
export declare class CollectEventsRequest extends Message<CollectEventsRequest> {
  /**
   * A unique identifier for this request. Restricted to 36 ASCII characters.
   * A random UUID is recommended.
   * This request is only idempotent if a `request_id` is provided.
   *
   * @generated from field: string request_id = 1;
   */
  requestId: string;

  /**
   * Events to be collected
   *
   * @generated from field: repeated ingestion.v1alpha.Event events = 2;
   */
  events: Event[];

  constructor(data?: PartialMessage<CollectEventsRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ingestion.v1alpha.CollectEventsRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CollectEventsRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CollectEventsRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CollectEventsRequest;

  static equals(a: CollectEventsRequest | PlainMessage<CollectEventsRequest> | undefined, b: CollectEventsRequest | PlainMessage<CollectEventsRequest> | undefined): boolean;
}

