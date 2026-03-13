import { model } from "@medusajs/framework/utils"
import { VendorAdmin } from "./vendor-admin"

export const Vendor = model.define("vendor", {
  id: model.id().primaryKey(),
  name: model.text(),
  admin_email: model.text().unique(),
  status: model.enum(["pending", "active", "rejected"]).default("pending"),
  admins: model.hasMany(() => VendorAdmin),
})
