import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import { BUSINESS_STATUS_CODE, DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { title, content } = body;
  if (!title || !content) {
    return Response.json(
      error("Title and content are required", BUSINESS_STATUS_CODE.WARNING),
      { status: 400 },
    );
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("posts");
  const result = await collection.insertOne({
    title,
    content,
    createdAt: new Date().getTime(),
    id: uuidv4(),
  });
  return Response.json(success({ id: result.insertedId }), {
    status: 200,
  });
});
