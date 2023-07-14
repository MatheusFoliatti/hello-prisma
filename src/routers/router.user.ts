import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { EnsureAuthenticateUser } from "../middlewares/EnsureAuthenticateUser";

const prisma = new PrismaClient();
const userRoute = Router();

interface IRequestBody {
  name: string;
  email: string;
  senha?: string;
}

//Busca por todos os usuários
userRoute.get("/getall", EnsureAuthenticateUser, async (req, res) => {
  const getAll = await prisma.user.findMany();

  res.json(getAll);
});

//Busca por ID
userRoute.get("/:id", EnsureAuthenticateUser, async (req, res) => {
  const { id } = req.params;
  const getById = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  res.json(getById);
});

// Buscar por nome ou email
userRoute.get("/", EnsureAuthenticateUser, async (req, res) => {
  const { name, email } = req.query;

  const getSearch = await prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: String(email),
          },
          name: {
            contains: String(name),
          },
        },
      ],
    },
  });

  res.json(getSearch);
});

userRoute.post("/", async (req, res) => {
  const { name, email }: IRequestBody = req.body;

  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExist)
    return res.status(404).json({ error: true, message: "Usuário já existe" });

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.json(createUser);
});

userRoute.put("/:id", async (req, res) => {
  const { name, email }: IRequestBody = req.body;
  const { id } = req.params;

  const userExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userExist)
    return res.status(400).json({ error: true, message: "Usuário não existe" });

  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
    select: {
      name: true,
      email: true,
      post: true,
    },
  });

  res.json(updateUser);
});

userRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const userExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userExist)
    return res.status(400).json({ error: true, message: "Usuário não existe" });

  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  res.json(deleteUser);
});
