import { navTags } from "@/utils";
import { NavbarTag, ShowMenuBtn, ShowGameMenuBtn, Logo } from "@/components";

const Navbar = () => {
  return (
    <nav className="nav center-items">
      <div className="nav-center">
        <div className="nav-header" onDragStart={(e) => e.preventDefault()}>
          <Logo />
          <ShowMenuBtn />
          <ShowGameMenuBtn />
        </div>
        <ul className="nav-tags">
          {navTags.map((item) => {
            return <NavbarTag key={item.tag} {...item} />;
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
