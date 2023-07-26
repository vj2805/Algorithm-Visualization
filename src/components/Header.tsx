import {
  Group,
  Header as MantineHeader,
  SegmentedControl,
  Title,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Header = () => {
  const [visualiserPath, setVisualiserPath] = useState("/")
  const navigate = useNavigate()
  useEffect(() => {
    navigate(visualiserPath)
  }, [visualiserPath])
  return (
    <MantineHeader
      height={75}
      p="xs"
    >
      <Group>
        <Title order={1}>Algorithm Visualization 🤠</Title>
        <Group
          position="right"
          sx={{ flex: 1 }}
          grow
        >
          <SegmentedControl
            value={visualiserPath}
            onChange={setVisualiserPath}
            data={[
              { label: "Sorting", value: "/" },
              { label: "Path Finding", value: "/path-finding-visualizer" },
            ]}
          />
        </Group>
      </Group>
    </MantineHeader>
  )
}
