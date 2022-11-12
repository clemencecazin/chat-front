import "./App.css";
import { ChatProvider } from "./context/ChatContext";
import WindowChat from "./pages/visitorChat/WindowChat";

function App() {
    return <ChatProvider></ChatProvider>;
}

export default App;
