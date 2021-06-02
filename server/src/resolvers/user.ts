import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { UserResponse } from "../object-types/UserResponse";
import { UsernamePasswordInput } from "../input-types/UsernamePasswordInput";
import createErrorArr from "../utils/createErrorArr";
import { COOKIE_NAME } from "../constants";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) return null;
    return em.findOne(User, { id: req.session.userId });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") { password, username }: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (username.length < 3) {
      return {
        errors: createErrorArr(
          "username",
          "username must have at least 3 letters"
        ),
      };
    }

    if (password.length < 3) {
      return {
        errors: createErrorArr(
          "password",
          "password must have at least 3 letters"
        ),
      };
    }

    const hashedPassword = await argon2.hash(password);

    const user = em.create(User, { username, password: hashedPassword });

    try {
      await em.persistAndFlush(user);
      req.session.userId = user.id;
      return { user };
    } catch (e) {
      if (e.code === "23505") {
        return {
          errors: createErrorArr(
            "username",
            "there is already an user with this username"
          ),
        };
      }

      return {
        errors: createErrorArr("unknown", "some unknown error ocurred"),
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") { password, username }: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username });

    if (!user) {
      return {
        errors: createErrorArr("username", "that username doesn't exists"),
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return { errors: createErrorArr("password", "invalid password") };
    }
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    // clear cookie

    // for client
    res.clearCookie(COOKIE_NAME);

    // for server
    let deleted = true;
    req.session.destroy(err => (deleted = !err));
    return deleted;
  }
}
