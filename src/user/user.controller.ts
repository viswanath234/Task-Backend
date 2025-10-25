import { inject, injectable } from "inversify";

@injectable()
export class UserController {
  constructor() {}

  public getUser() {
    return {
      firstName: "Viswa",
      lastname: "kannan",
      email: "viswa@kannan.com",
    };
  }
}
