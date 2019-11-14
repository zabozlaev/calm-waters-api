import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { TokenPayload } from './dtos/tokenPayload';
import { UserEntity } from './../user/user.entity';
import { Profile } from './interfaces/profile';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({ id, displayName, photos }: Profile) {
    const avatar = photos.pop().value;

    let user = await this.userService.findByLinkedInId(id);

    if (!user) {
      user = await this.userService.create({
        linkedInId: id,
        displayName,
        avatar,
      });
    }

    return this.signToken(user);
  }

  verifyToken(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (err, decoded: TokenPayload) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }

  async random() {
    let [user] = await this.userService.find({
      take: 1,
    });

    if (!user) {
      user = await this.userService.create({
        linkedInId: 'some-id',
        displayName: 'Random User',
        avatar: 'None',
      });
    }

    return this.signToken(user);
  }

  private signToken({
    id,
    linkedInId,
    displayName,
  }: UserEntity): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload: TokenPayload = {
        id,
        linkedInId,
        displayName,
      };

      sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7h' },
        (err, encoded) => {
          if (err) {
            reject(err);
          }
          resolve(encoded);
        },
      );
    });
  }
}
