import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createVendorsWorkflow } from "../../../workflows/create-vendor"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { result } = await createVendorsWorkflow(req.scope).run({
    input: req.body as any,
  })

  res.status(200).json({ vendor: result })
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")
  const { data: vendors, metadata } = await query.graph({
    entity: "vendor",
    fields: ["id", "name", "admin_email", "status", "created_at", "updated_at"],
    pagination: {
      skip: 0,
      take: 20,
    },
  })

  res.status(200).json({ 
    vendors, 
    count: metadata?.count, 
    limit: metadata?.take, 
    offset: metadata?.skip 
  })
}
