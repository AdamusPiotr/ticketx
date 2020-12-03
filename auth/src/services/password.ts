import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, givenPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buffer = (await asyncScrypt(givenPassword, salt, 64)) as Buffer;

    return hashedPassword && buffer.toString("hex");
  }
}
