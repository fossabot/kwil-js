import jssha from 'jssha';
import {ethers, JsonRpcSigner} from 'ethers';
import { Signature, SignatureType } from '../interfaces/signature';
import {  HexToUint8Array,  StringToUint8LittleEndian,  Uint8ArrayToHex } from '../../utils/bytes';
import { base64ToBytes, bytesToBase64 } from '../../utils/base64';
import { convertPayloadType, PayloadType } from '../interfaces/tx';

export function sha384StringToString(message: string): string {
    const shaObj = new jssha('SHA-384', 'TEXT');
    shaObj.update(message);
    return shaObj.getHash('HEX');
}


export function sha384BytesToString(message: Uint8Array): string {
    const shaObj = new jssha('SHA-384', 'UINT8ARRAY');
    shaObj.update(message);
    return shaObj.getHash('HEX');
}

export function sha384BytesToBytes(message: Uint8Array): Uint8Array {
    const shaObj = new jssha('SHA-384', 'UINT8ARRAY');
    shaObj.update(message);
    return shaObj.getHash('UINT8ARRAY');
}

export function sha384StringToBytes(message: string): Uint8Array {
    const shaObj = new jssha('SHA-384', 'TEXT');
    shaObj.update(message);
    return shaObj.getHash('UINT8ARRAY');
}

export function sha224StringToString(message: string): string {
    const shaObj = new jssha('SHA-224', 'TEXT');
    shaObj.update(message);
    return shaObj.getHash('HEX');
}

export async function sign(message: string, txType: PayloadType, fee: string, nonce: number, signer: JsonRpcSigner | ethers.Wallet): Promise<Signature> {
    const domain = {
        name: 'Kwil',
        version: '1',
        chainId: 5
    }

    const types = {
        Message: [
            { name: 'txIntro', type: 'string' },
            { name: 'txDetails', type: 'Transaction' },
            { name: 'txOutro', type: 'string'}
        ],
        Transaction: [
            { name: 'hash', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'fee', type: 'string' },
            { name: 'nonce', type: 'uint64' },
        ]
    }

    const transaction = {
        txIntro: 'You are signing a transaction for the Kwil network.',
        txDetails: {
            hash: message,
            type: convertPayloadType(txType),
            fee: fee,
            nonce: nonce,
        },
        txOutro: 'Click "Sign" to continue.'
    }

    const sig =  await signer.signTypedData(domain, types, transaction);
    const encodedSignature = bytesToBase64(HexToUint8Array(sig))

    return {
        signature_bytes: encodedSignature,
        signature_type: SignatureType.ACCOUNT_SECP256K1_UNCOMPRESSED,
    }
}