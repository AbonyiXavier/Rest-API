import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createuser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createuser(req.body);
    return res.send(omit(user, "password"));
  } catch (error: any) {
    logger.error(error);

    return res.status(409).send(error.message);
  }
}
