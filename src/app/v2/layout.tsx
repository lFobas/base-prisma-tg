import SideBar2 from "../../components/v2/SideBar2";

export default function NewStyleLayout({ children }) {
  return (
    <div className="flex w-full h-screen relative">
      <div className="flex overflow-auto w-full bg-[#202022] text-white">
        {children}
      </div>
      <SideBar2 />
    </div>
  );
}
