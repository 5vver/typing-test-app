export type JwtPayload = { sub: string; username: string };
export type JwtValidate = { userId: string; username: string };

export interface AuthenticatedRequest extends Request {
  user: JwtValidate;
}
