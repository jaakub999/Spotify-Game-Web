export enum RouteUrl {
  HOME = 'home',
  AUTH = 'login',
  REGISTER = 'register',
  PASSWORD = 'password',
  PASSWORD_TOKEN = 'password/:token'
}

export namespace RouteUrl {
  export function convertFor(name: string): RouteUrl {
    switch (name) {
      case 'home':
        return RouteUrl.HOME;
      case 'login':
        return RouteUrl.AUTH;
      case 'register':
        return RouteUrl.REGISTER;
      case 'password':
        return RouteUrl.PASSWORD;
      case 'password/:email':
        return RouteUrl.PASSWORD_TOKEN;
    }

    return RouteUrl.HOME;
  }
}
