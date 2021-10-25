import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(
  payload: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded =  jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    }
    
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
};

export const hashPassword = async (password: string) => {
  const hashPass = await bcrypt.hash(
    password,
    bcrypt.genSaltSync(config.get<number>("saltWorkFactor"))
  );
  return hashPass;
};

export const passwordCompare = async (
  hashPassword: string,
  password: string
) => {
  const compareHash = bcrypt.compareSync(password, hashPassword);
  return compareHash;
};
