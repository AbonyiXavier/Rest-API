
import { Request, Response, NextFunction} from "express"
import { get } from "lodash"       // accessing a property we don't know it exist
import { verifyJwt } from "../helpers/auth.service";


// Middleware that adds user to the request object and enable us get userId
const deserializedUser = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );      

      const { decoded, expired } = verifyJwt(accessToken)
      
      if(decoded) {
          res.locals.user = decoded;
          return next(); 
      }

      return next();
}

export default deserializedUser;