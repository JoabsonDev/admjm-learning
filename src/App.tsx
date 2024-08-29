import AlertWrapper from "@organisms/AlertWrapper"
import Prompt from "@organisms/Prompt"
import { usePrompt } from "@store/prompt"
import { QueryClient, QueryClientProvider } from "react-query"
import Router from "./routes"

const queryClient = new QueryClient()

export default function App() {
  const {
    config: { show, title, message, callback },
    setConfig
  } = usePrompt()

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Prompt
        show={show}
        title={title}
        message={message}
        onCancel={() => setConfig({ show: false })}
        onConfirm={() => {
          setConfig({ show: false })
          callback!()
        }}
      />
      <AlertWrapper />
    </QueryClientProvider>
  )
}
