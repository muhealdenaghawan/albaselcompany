import { useSidebar } from "@/components/ui/sidebar";

function Header() {
  const { open } = useSidebar();
  return (
    <div className="flex flex-row gap-3 items-center ">
<<<<<<< HEAD
      <img src={"/logo.png"} className="w-30" />
=======
      <img src={"/logo.png"} className="w-10" />
>>>>>>> 91bf35ca6f238bf65fa245b61edd288edd64202a
      {open && "Al-Basil"}
    </div>
  );
}

export default Header;
