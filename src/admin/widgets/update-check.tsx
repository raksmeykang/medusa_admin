import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
  Badge,
  Button,
  Container,
  Heading,
  Text,
  StatusBadge,
} from "@medusajs/ui"
import { 
  ArrowPath, 
  CheckCircleSolid, 
  ExclamationCircleSolid,
  ArrowUpRightOnBox
} from "@medusajs/icons"
import { useEffect, useState, useCallback } from "react"
// @ts-ignore
import packageJson from "../../../package.json"

interface UpdateCheckState {
  currentVersion: string
  latestVersion: string | null
  isLoading: boolean
  hasUpdate: boolean
  lastChecked: Date | null
  error: string | null
}

const UpdateCheckWidget = () => {
  const [state, setState] = useState<UpdateCheckState>({
    currentVersion: "",
    latestVersion: null,
    isLoading: false,
    hasUpdate: false,
    lastChecked: null,
    error: null,
  })

  const checkForUpdates = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    // Get current version from package.json
    const current = (packageJson.dependencies?.["@medusajs/medusa"] || 
                    packageJson.devDependencies?.["@medusajs/medusa"] || 
                    "2.0.0").replace(/[\^~]/g, "")

    try {
      const response = await fetch("https://registry.npmjs.org/@medusajs/medusa/latest")
      if (!response.ok) throw new Error("Failed to fetch version")
      
      const data = await response.json()
      const latest = data.version

      setState({
        currentVersion: current,
        latestVersion: latest,
        hasUpdate: latest !== current,
        isLoading: false,
        lastChecked: new Date(),
        error: null
      })
    } catch (err) {
      console.error("Failed to fetch Medusa version", err)
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Connection failed. Please try again later." 
      }))
    }
  }, [])

  useEffect(() => {
    checkForUpdates()
  }, [checkForUpdates])

  return (
    <Container className="p-4 mb-4 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1">
          <Heading level="h2" className="text-ui-fg-base">System Update</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Medusa Core Framework Registry Check
          </Text>
        </div>
        
        {!state.isLoading && !state.error && (
          state.hasUpdate ? (
            <StatusBadge color="orange">Update Available</StatusBadge>
          ) : (
            <StatusBadge color="green">System Up to Date</StatusBadge>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-ui-border-base py-6 bg-ui-bg-subtle/50 -mx-4 px-4">
        <div className="flex flex-col gap-1">
          <Text size="xsmall" weight="plus" className="text-ui-fg-muted uppercase tracking-wider">
            Current Version
          </Text>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ui-fg-muted" />
            <code className="text-sm font-mono text-ui-fg-base">
              v{state.currentVersion || "..."}
            </code>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Text size="xsmall" weight="plus" className="text-ui-fg-muted uppercase tracking-wider">
            Latest Registry
          </Text>
          <div className="flex items-center gap-2">
            {state.isLoading ? (
              <ArrowPath className="animate-spin text-ui-fg-muted" size={16} />
            ) : (
              <span className={`h-2 w-2 rounded-full ${state.hasUpdate ? "bg-orange-500" : "bg-green-500"}`} />
            )}
            <code className={`text-sm font-mono ${state.hasUpdate ? "text-orange-500 font-bold" : "text-ui-fg-base"}`}>
              v{state.latestVersion || (state.isLoading ? "Checking..." : "Unknown")}
            </code>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="secondary" 
            size="small" 
            onClick={checkForUpdates}
            disabled={state.isLoading}
            className="flex gap-2 items-center"
          >
            <ArrowPath size={16} className={state.isLoading ? "animate-spin" : ""} />
            {state.isLoading ? "Checking..." : "Check Now"}
          </Button>
          
          {state.lastChecked && (
             <Text size="xsmall" className="text-ui-fg-muted italic">
              Checked at {state.lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </div>

        {state.hasUpdate && (
          <Button 
            variant="primary" 
            size="small"
            asChild
          >
            <a 
              href={`https://github.com/medusajs/medusa/releases/tag/v${state.latestVersion}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <ArrowUpRightOnBox size={16} />
              View Changelog
            </a>
          </Button>
        )}
      </div>

      {state.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-red-600">
          <ExclamationCircleSolid size={16} />
          <Text size="small">{state.error}</Text>
        </div>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "store.details.before",
})

export default UpdateCheckWidget
