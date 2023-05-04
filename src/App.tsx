import { ThemeProvider } from './ThemeProvider';
import Auth from "./pages/Authentication/Auth";

export default function App() {
  return (
    <ThemeProvider>
        <Auth></Auth>
    </ThemeProvider>
  );
}
