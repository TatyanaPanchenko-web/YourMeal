import style from "./nav.module.scss";
import NavItem from "../NavItem/NavItem";

export default function Nav(props) {
  const { activeTab, setActiveTab, nav } = props;
  return (
    <nav className={style.nav}>
      <div className={style["nav-container"]}>
        <div className={style["nav-items"]}>
          {nav.map((item, index) => {
            return (
              <NavItem
                item={item}
                key={index}
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
