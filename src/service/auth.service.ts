import { BehaviorSubject } from "rxjs";
import * as md5 from 'md5';
import * as cookie from 'js-cookie';
import { User } from "src/models/user.model";
import { signIn, signInWithToken } from "src/api/user.api";

class AuthService {
  public get user() { return this.user$; }

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private static instance: AuthService | null = null;

  private user$ = new BehaviorSubject<User | null>(null);
  constructor() {
    this.signInWithTokenMethod();
  }

  public signInMethod(userName: string, password: string) {
    const cipheredPassword = md5(password);
    return signIn(userName, cipheredPassword).then((data) => {
      switch (data.status) {
        case 200:
          this.user$.next(data.data);
          cookie.set('token', data.data.token, {
            expires: 3,
          });
          return true;
        case 401:
        default:
          return false;
      }
    });
  }

  public signInWithTokenMethod() {
    return signInWithToken().then((data) => {
      switch (data.status) {
        case 200:
          this.user$.next(data.data);
          return true;
      }
      return false;
    });
  }
}

export default AuthService.getInstance;