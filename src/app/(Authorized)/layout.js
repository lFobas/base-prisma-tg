import Telegram from "@/lib/tg-provider";
import "react-toastify/dist/ReactToastify.css";

export default function AuthorizedLayout({ children }) {
  return (
    <>
      <>{children}</>
    </>
  );
}
