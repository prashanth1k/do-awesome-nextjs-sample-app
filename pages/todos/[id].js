import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Todo({ todo }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="text-center">
      <h3>
        <strong>{!!todo && todo.description}</strong>
      </h3>
      <p>{!todo && "This todo has migrated to the next universe."}</p>
      <br />
      <p></p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  //   const todos = await prisma.todo.find((rec) => rec.id == params.id);
  const todo = await prisma.todo.findFirst({
    where: { id: Number(params.id) },
  });
  console.log("todo: ", todo);

  return {
    props: { todo },
  };
}
