import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import useDarkMode from "./components/hooks/useDarkMode";

function App() {
  const { toggleDarkMode } = useDarkMode();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
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
