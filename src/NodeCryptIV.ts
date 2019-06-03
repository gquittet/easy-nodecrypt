import crypto from 'crypto';
import ANodeCrypt from './ANodeCrypt';

export class NodeCryptIV extends ANodeCrypt<NodeCryptIV> {

  private readonly IV_LENGTH: number = 16; // AES = 16
  private iv: Buffer;

  constructor(options: { secret?: string, iv?: string } = {}) {
    super(options.secret);

    this.ALGO = 'aes-256-cbc';

    // iv not exist => randomMode
    if (!options || !options.iv) {
      if (process.env.NODECRYPT_IV) {
        this.iv = Buffer.from(process.env.NODECRYPT_IV);
      } else {
        this.iv = crypto.randomBytes(this.IV_LENGTH);
      }
    } else {
      this.iv = Buffer.from(options.iv);
    }

    if (this.iv.length !== this.IV_LENGTH) {
      throw new Error(
        `Invalid IV. The length of the IV must be ${this.IV_LENGTH}.`,
      );
    }
  }

  encrypt(text: string): NodeCryptIV {
    const cipher = crypto.createCipheriv(
      this.ALGO,
      this.encryptionKey,
      this.iv,
    );

    this.encrypted = cipher.update(text, 'utf8', 'hex');
    this.encrypted += cipher.final('hex');
    this.encrypted = Buffer
      .from(this.iv.toString('hex') + this.encrypted, 'hex')
      .toString('hex');

    return this;
  }

  decrypt(text: string): string {
    const stringValue = String(text);
    const textToDecryt = Buffer
      .from(stringValue, this.encoding)
      .toString('hex');
    const encryptedText = textToDecryt.slice(32);
    const decipher = crypto.createDecipheriv(
      this.ALGO,
      Buffer.from(this.encryptionKey),
      this.iv,
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted.toString();
  }
}
