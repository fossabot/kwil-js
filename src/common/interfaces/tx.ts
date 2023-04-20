import { Signature } from "./signature";


export interface ITx {
    hash: string;
    payload_type: PayloadType;
    payload: string;
    fee: string;
    nonce: number;
    signature: Signature;
    sender: string;
}

export enum PayloadType {
    INVALID_PAYLOAD_TYPE = 100,
    DEPLOY_DATABASE,
	MODIFY_DATABASE,
	DROP_DATABASE,
	EXECUTE_ACTION
}

export interface SelectQuery {
    dbid: string;
    query: string;
}

export interface TxReceipt {
    txHash: string;
    fee: string;
    body?: string;
}

export function convertPayloadType(type: PayloadType): string {
    switch (type) {
        case PayloadType.DEPLOY_DATABASE:
            return "Deploy Database";
        case PayloadType.MODIFY_DATABASE:
            return "Modify Database";
        case PayloadType.DROP_DATABASE:
            return "Drop Database";
        case PayloadType.EXECUTE_ACTION:
            return "Execute Action";
        default:
            return "Invalid Payload Type";
    }
}