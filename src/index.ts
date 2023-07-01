import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//  const user = await prisma.user.create({
//    data: {
//        name: "Arisu",
//        email: "arisu@fema.com.br",
//    },
//  })
//  console.log(user)
// 
// ***************************
// const getAll = await prisma.user.findMany()
// console.log(getAll)
// ***************************
  const createUserPost = await prisma.user.create({
    data: {
      name: "Matheus",
      email: "foliatti@fema.com.br",
      post :{
        create:{
          title: 'Lonelly',
          content: 'Akon Mr.Lonely'
        }
      }
    }
  })
  console.log(createUserPost)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
