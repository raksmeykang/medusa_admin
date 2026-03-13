import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Badge, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"
// @ts-ignore
import packageJson from "../../../package.json"

const UpdateCheckWidget = () => {
  const [latestVersion, setLatestVersion] = useState<string | null>(null)
  const [currentVersion, setCurrentVersion] = useState<string>("")
  const [hasUpdate, setHasUpdate] = useState(false)

  useEffect(() => {
    // Get current version from package.json
    const current = packageJson.dependencies?.["@medusajs/medusa"] || 
                    packageJson.devDependencies?.["@medusajs/medusa"] || 
                    "2.0.0"
    
    setCurrentVersion(current.replace(/[\^~]/g, ""))

    // Fetch latest version
    fetch("https://registry.npmjs.org/@medusajs/medusa/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.version) {
          setLatestVersion(data.version)
          // Simple string comparison for versions
          if (data.version !== current.replace(/[\^~]/g, "")) {
            setHasUpdate(true)
          }
        }
      })
      .catch((err) => console.error("Failed to fetch Medusa version", err))
  }, [])

  return (
    <Container className="p-4 mb-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">System Status</Heading>
        {hasUpdate ? (
          <Badge color="blue">New Version Available</Badge>
        ) : (
          <Badge color="green">Up to Date</Badge>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <Text size="small" className="text-ui-fg-subtle">
          Current Version: {currentVersion}
        </Text>
        {latestVersion && (
          <Text size="small" className="text-ui-fg-subtle">
            Latest Version: {latestVersion}
          </Text>
        )}
      </div>

      {hasUpdate && (
        <div className="flex gap-2 mt-2">
          <a 
            href={`https://github.com/medusajs/medusa/releases/tag/v${latestVersion}`} 
            target="_blank" 
            rel="noreferrer"
          >
            <Button variant="secondary" size="small">
              View Changelog
            </Button>
          </a>
        </div>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "store.details.before",
})

export default UpdateCheckWidget
