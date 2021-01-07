import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const id = req.query.id;
  if (req.method == "DELETE") {
    console.log("Processing todo delete..");
    const todo = await prisma.todo.delete({ where: { id: Number(id) } });
    res.json(todo);
  } else if (req.method == "PATCH") {
    console.log("Processing todo update..");
    const newTodo = await prisma.todo.update({
      data: JSON.parse(req.body),
    });
    res.json(newTodo);
  }
}
