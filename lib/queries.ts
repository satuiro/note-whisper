import { User } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

export const createUser = async ({ user }: { user: User }) => {
  const findUser = await prismadb.user.findUnique({
    where: { id: 'bff' },
  });

  if (findUser) {
    return findUser;
  }

  const newUser = await prismadb.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      username: user.firstName || "defaultUsername",
    },
  });

  return newUser;
};
