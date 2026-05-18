import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ChatExample1 from "./pages/ChatExample1";
import ChatExample2 from "./pages/ChatExample2";
import ChatExample3 from "./pages/ChatExample3";
import ChatExample4 from "./pages/ChatExample4";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/chat-example1" element={<ChatExample1 />} />
            <Route path="/chat-example2" element={<ChatExample2 />} />
            <Route path="/chat-example3" element={<ChatExample3 />} />
            <Route path="/chat-example4" element={<ChatExample4 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
