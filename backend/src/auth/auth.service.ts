import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';
// import { User } from '../user/interfaces/user.interface'; // Define your User interface
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  public async generateTotpSecret(email: string) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(email, 'APPLE', secret);    
    return {
      secret,
      otpauthUrl,
    };
  }

  public async generateQrCodeDataURL(otpauthUrl: string): Promise<string> {
    return QRCode.toDataURL(otpauthUrl);
  }

  // Verify a user-provided TOTP token
  public isTotpValid(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }

  public verifyTotpToken(token: string, secret: string): boolean {
    authenticator.options = { window: 1 }; 
    return authenticator.check(token, secret);
  }
}
