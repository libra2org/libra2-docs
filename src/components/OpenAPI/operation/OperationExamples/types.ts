import type { OperationHttpMethod } from "starlight-openapi/libs/operation";

export interface ExampleData {
  baseUrl: string;
  prefix: string;
  method: OperationHttpMethod;
  operationPath: string;
}

export type ScalarModalOpenEvent = CustomEvent<ExampleData>;

declare global {
  interface DocumentEventMap {
    "scalarModal:open": ScalarModalOpenEvent;
  }
}
