import { model } from "@medusajs/framework/utils"
import { Vendor } from "./vendor"

export const VendorAdmin = model.define("vendor_admin", {
  id: model.id().primaryKey(),
  vendor: model.belongsTo(() => Vendor, {
    mappedBy: "admins",
  }),
  user_id: model.text(), // References the core User ID
})
