// messages-test.tsx
import Messages from "./messages"
import { render, screen } from "@testing-library/react"

describe("Messages", () => {
  it("renders a list of messages", () => {
    const messages = [
      { id: 1, text: "Message 1" },
      { id: 2, text: "Message 2" },
    ]

    render(<Messages messages={messages} />)

    expect(screen.getByText("Message 1")).toBeInTheDocument()
    expect(screen.getByText("Message 2")).toBeInTheDocument()
  })

  it("renders an empty message list", () => {
    const messages: { id: number; text: string }[] = []
    render(<Messages messages={messages} />)
    expect(screen.getByText("No messages to display.")).toBeInTheDocument()
  })
})
