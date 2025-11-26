import NavItem from "../NavItem/NavItem";
import nav from "../../data/nav.json";
import { NavItemType } from "../../types/index";
import style from "./nav.module.scss";

type NavPropsType = {
  activeTab: NavItemType;
  setActiveTab: React.Dispatch<React.SetStateAction<NavItemType>>;
};
export default function Nav({ activeTab, setActiveTab }: NavPropsType) {
  return (
    <nav className={style.nav}>
      <div className={style["nav-container"]}>
        <div className={style["nav-items"]}>
          {nav.map((item, index) => {
            return (
              <NavItem
                key={index}
                item={item}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
