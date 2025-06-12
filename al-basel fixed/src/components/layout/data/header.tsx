import { useSidebar } from "@/components/ui/sidebar";

function Header() {
  const { open } = useSidebar();
  return (
    <div className="flex flex-row gap-3 items-center ">
      <img src={"/logo.png"} className="w-10" />
      {open && "Al-Basil"}
    </div>
  );
}

export default Header;
