import { defineLink } from "@medusajs/framework/utils"
import MarketplaceModule from "../modules/marketplace"
import AuthModule from "@medusajs/auth"

export default defineLink(
  MarketplaceModule.linkable.vendorAdmin,
  AuthModule.linkable.authUser
)
