import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handle(req, res) {
  console.log("Processing todo request..");
  const id = req.query.id;
  if (req.method == "GET") {
    res.send("hello");
  } else if (req.method == "POST") {
    const newTodo = await prisma.todo.create({
      data: JSON.parse(req.body),
    });
    res.json(newTodo);
  }
}
