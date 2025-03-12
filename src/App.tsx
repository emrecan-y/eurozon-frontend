import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import useDarkMode from "./components/hooks/useDarkMode";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MotionButton from "./components/ui/MotionButton";

function App() {
  const { toggleDarkMode } = useDarkMode();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <MotionButton className="bg-primary-bg" onClick={toggleDarkMode}>
        DarkModeToggle
      </MotionButton>
    </>
  );
}

export default App;
