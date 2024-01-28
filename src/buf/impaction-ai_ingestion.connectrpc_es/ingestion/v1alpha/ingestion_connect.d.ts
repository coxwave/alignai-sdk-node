// @generated by protoc-gen-connect-es v1.3.0
// @generated from file ingestion/v1alpha/ingestion.proto (package ingestion.v1alpha, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CollectEventsRequest } from "../../../impaction-ai_ingestion.bufbuild_es/ingestion/v1alpha/ingestion_pb.js";
import { Empty, MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service ingestion.v1alpha.IngestionService
 */
export declare const IngestionService: {
  readonly typeName: "ingestion.v1alpha.IngestionService",
  readonly methods: {
    /**
     * @generated from rpc ingestion.v1alpha.IngestionService.CollectEvents
     */
    readonly collectEvents: {
      readonly name: "CollectEvents",
      readonly I: typeof CollectEventsRequest,
      readonly O: typeof Empty,
      readonly kind: MethodKind.Unary,
    },
  }
};

