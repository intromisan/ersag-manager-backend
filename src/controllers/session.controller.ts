import { Request, Response } from 'express';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import config from 'config';
import { signJwt } from '../utils/jwt';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // Create a session
  const session = await createSession(user._id);

  // Create an access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id
    },
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );

  // Create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id
    },
    { expiresIn: config.get('refreshTokenTtl') } // 1 year
  );

  // Return access and refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.status(200).send({
    accessToken: null,
    refreshToken: null
  });
}
