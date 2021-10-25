import { Request, Response, NextFunction } from "express";

// Middleware that validate a user exist for a given request
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }
  return next();
};

export default requireUser;
