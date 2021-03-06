import { Request, Response } from "express";
import config from "config";
import { signJwt } from "../helpers/auth.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);  

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  
  // create an access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get("accessTokenTl"),
    }
  );
  
  // create a refresh token
  const refreshToken = signJwt(
    {
      ...user, 
      session: session._id,
    },
    {
      expiresIn: config.get("refreshTokenTl"),
    }
  );
  // return access and refresh token
  return res.send({ accessToken, refreshToken})
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id    

    const sessions = await findSessions({ user: userId, valid: true})    
    
    return res.send(sessions);
}

// Delete user session and logout

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session

    // update the session

    await updateSession({ _id: sessionId}, { valid: false})

    //return null for accessToken and refreshed Token
    return res.send({
        accessToken: null,
        refreshedToken: null
    })

}