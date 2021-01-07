// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);
async function handler(req, res) {
  await cors(req, res);

  res.statusCode = 200;
  res.json({ name: "John Doe" });
}

export default handler;
