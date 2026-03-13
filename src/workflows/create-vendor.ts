import {
  createWorkflow,
  WorkflowResponse,
  StepResponse,
  createStep,
} from "@medusajs/framework/workflows-sdk"
import { MARKETPLACE_MODULE } from "../modules/marketplace"
import MarketplaceModuleService from "../modules/marketplace/service"

type CreateVendorStepInput = {
  name: string
  admin_email: string
}

export const createVendorStep = createStep(
  "create-vendor-step",
  async (input: CreateVendorStepInput, { container }) => {
    const marketplaceModuleService: MarketplaceModuleService = container.resolve(
      MARKETPLACE_MODULE
    )

    const vendor = await marketplaceModuleService.createVendors(input)

    return new StepResponse(vendor, vendor.id)
  },
  async (vendorId: string, { container }) => {
    const marketplaceModuleService: MarketplaceModuleService = container.resolve(
      MARKETPLACE_MODULE
    )

    await marketplaceModuleService.deleteVendors([vendorId])
  }
)

type CreateVendorWorkflowInput = {
  name: string
  admin_email: string
}

export const createVendorsWorkflow = createWorkflow(
  "create-vendor",
  (input: CreateVendorWorkflowInput) => {
    const vendor = createVendorStep(input)

    return new WorkflowResponse(vendor)
  }
)
