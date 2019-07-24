// 放弃cookie, 使用 auth字段
import * as jwt from "jsonwebtoken";
import * as koa from "koa";
import { Omit } from "lodash";
import { JWT_SECRET as secret } from "shared/etc";
import { UserRole } from "shared/models";
declare module "koa" {
  // tslint:disable-next-line:interface-name
  interface Context {
    session: {
      id: string,
      iat: number,
      exp: number, // what fuck?
      roles: UserRole[],
    };
  }
}

const assertSession = (ctx: koa.ParameterizedContext) => {
  if (!ctx.session) {
    const token = ctx.get("token");
    if (!token) {
      ctx.throw(401, "token is required");
    } else {
      ctx.session = jwt.verify(token, secret) as any;
    }
  }
};

const assertRoles = (ctx: koa.ParameterizedContext, roles: UserRole[]) => {
  const { role } = ctx.session;
  for (const r of roles) {
    if (r === role) { return; }
  }
  ctx.throw(403, "permission deny");
};
export const assertRole = (ctx: koa.ParameterizedContext, role: UserRole) => {
  if (ctx.session.role !== role) {
    ctx.throw(403, "permission deny");
  }
};
// 只要登录就行
export const anyone: koa.Middleware = async (ctx, next) => {
  assertSession(ctx);
  await next();
};
// 必须是某一个角色
export const one = (role: UserRole): koa.Middleware => {
  return async (ctx, next) => {
    assertSession(ctx);
    assertRole(ctx, role);
    await next();
  };
};
// 必须是某个职业之一
export const oneOf = (...roles: UserRole[]): koa.Middleware => {
  switch (roles.length) {
    case 0: return anyone;
    case 1: return one(roles[0]);
    default: return async (ctx, next) => {
      assertSession(ctx);
      assertRoles(ctx, roles);
      await next();
    };
  }
};
/**
 * 生成jwt签名
 * @param session
 */
export const sign = (session: Omit<koa.Context["session"], "exp" | "iat">): string => {
  return jwt.sign(session, secret, { expiresIn: "30d" });
};

export const root = one(UserRole.ROOT);
export const master = one(UserRole.MASTER);
export const coach = one(UserRole.COACH);
export const student = one(UserRole.STUDENT);
