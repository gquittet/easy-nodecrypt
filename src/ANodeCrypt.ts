import crypto from 'crypto';

export default abstract class ANodeCrypt<E> {

  protected ALGO: string;
  protected encryptionKey: Buffer;
  protected encrypted: string;
  protected encoding: undefined
    | 'utf8'
    | 'ascii'
    | 'binary'
    | 'base64'
    | 'hex'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'latin1';

  constructor(secret?: string) {
    this.ALGO = '';
    this.encrypted = '';
    this.encoding = undefined;

    let secretToDigest = secret;
    if (!secret) {
      if (!process.env.NODECRYPT_SECRET) {
        throw Error('No secret provided.');
      }
      secretToDigest = process.env.NODECRYPT_SECRET;
    } else {
      secretToDigest = secret;
    }

    this.encryptionKey = crypto.createHash('sha256').update(secretToDigest).digest();
  }

  abstract encrypt(text: string): E;

  abstract decrypt(text: string): string;

  toBase64(): string {
    this.encoding = 'base64';
    const base64 = Buffer
      .from(this.encrypted, 'hex')
      .toString(this.encoding);
    const urlCompatibleBase64 = base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return urlCompatibleBase64;
  }

  toHex(): string {
    this.encoding = 'hex';
    return Buffer
      .from(this.encrypted, 'hex')
      .toString(this.encoding);
  }
}
