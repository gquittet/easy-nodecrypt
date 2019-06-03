import crypto from 'crypto';
import ANodeCrypt from './ANodeCrypt';

export class NodeCrypt extends ANodeCrypt<NodeCrypt> {

  constructor(secret?: string) {
    super(secret);
    this.ALGO = 'aes-256-ecb';
  }

  encrypt(text: string): NodeCrypt {
    const cipher = crypto.createCipheriv(
      this.ALGO,
      Buffer.from(this.encryptionKey),
      '',
    );

    this.encrypted = cipher.update(text, 'utf8', 'hex');
    this.encrypted += cipher.final('hex');
    return this;
  }

  decrypt(text: string): string {
    const stringValue = String(text);
    const encryptedText = Buffer
      .from(stringValue, this.encoding)
      .toString('hex');

    const decipher = crypto.createDecipheriv(
      this.ALGO,
      Buffer.from(this.encryptionKey),
      '',
    );

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted.toString();
  }
}
