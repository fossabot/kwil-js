import jssha from 'jssha';
import {ethers, JsonRpcSigner} from 'ethers';
import { Signature, SignatureType } from '../interfaces/signature';
import {  HexToUint8Array,  StringToUint8LittleEndian,  Uint8ArrayToHex } from '../../utils/bytes';
import { base64ToBytes, bytesToBase64 } from '../../utils/base64';

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

export async function sign(message: string, signer: JsonRpcSigner | ethers.Wallet): Promise<Signature> {
    const sig =  await signer.signMessage(base64ToBytes(message));
    const encodedSignature = bytesToBase64(HexToUint8Array(sig))

    return {
        signature_bytes: encodedSignature,
        signature_type: SignatureType.ACCOUNT_SECP256K1_UNCOMPRESSED,
    }
}