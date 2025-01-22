"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./sidebar.css";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { menuItem } from "../reusableComponent/JsonData";
import NavbarComponent from "../reusableComponent/appbar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Divider } from "@mui/material";
import { TextStyles } from "../reusableComponent/styles";
import ToggleSwitch from "../reusableComponent/toggleSwitch";
import logo from "@/public/assets/img/employeez.png";
import DraggableComponent from "../reusableComponent/draggable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Messages } from "../reusableComponent/messages";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from "../reusableComponent/styles";
import ImageComponent from "../reusableComponent/image";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Login from "../login/page";
import { useRouter } from "next/navigation";
import { Timeloader } from "../reusableComponent/loader/timeloader";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideToggle, sethideToggle] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [menuLists, setMenuLists] = useState(menuItem);
  const [visibleMenus, setVisibleMenus] = useState(false);
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [auth, setAuth] = useState<String | null>(null);

  const selectedColor = useSelector((state: RootState) => state.color.color);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token);

    // Redirect to login if token is not available
    if (!token) {
      router.push("/login"); // Programmatically navigate to /login
    }
  }, [router]);

  useEffect(() => {
    const pinned = localStorage.getItem("pinned");
    if (pinned !== null) {
      setIsOpen(pinned === "true");
      setIsChecked(pinned === "true");
    }
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    localStorage.setItem("pinned", checked.toString());
    setIsOpen(checked);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const toggleChildMenu = (itemName: string) => {
    setExpandedItem((prev) => (prev === itemName ? null : itemName));
  };

  const handleMouseEnter = () => {
    if (!isChecked) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isChecked) setIsOpen(false);
  };

  const handleMenuToggle = () => {
    setVisibleMenus(true); // Toggle state
    handleCheckboxChange({
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>); // Call the second function
  };
  const closehandleMenuToggle = () => {
    setVisibleMenus(false); // Toggle state
    handleCheckboxChange({
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>); // Call the second function
  };

  const handleToggleChange = (
    roleIndex: number,
    itemIndex: number,
    checkeddata: boolean
  ) => {
    const newMenuItems = [...menuItem];
    const roleItem = newMenuItems[roleIndex]?.roleItems[itemIndex];

    if (roleItem) {
      roleItem.checked = !checkeddata;
      setMenuLists(newMenuItems);
    }
  };

  const ApprovedToggle = () => {
    const newList = menuLists?.map((list) => ({
      ...list,
      roleItems: list.roleItems.filter((item) => item.checked),
    }));

    setMenuLists(newList);
    sethideToggle(false);
    toast.success(Messages.success.approved);
  };

  const RejectedToggle = () => {
    const newList = menuLists?.map((list) => ({
      ...list,
      roleItems: list.roleItems?.map((item) => ({
        ...item,
        checked: true,
      })),
    }));

    setMenuLists(newList);
    sethideToggle(false);

    toast.success(Messages.success.rejected);
  };

  const RefreshToggle = () => {
    const newList = menuItem?.map((list) => ({
      ...list,
      roleItems: list.roleItems?.map((item) => ({
        ...item,
        checked: true,
      })),
    }));

    setMenuLists(newList);
    sethideToggle(false);
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    toast.success(Messages.success.restored);
  };
  const useColors = Colors();

  return (
    <>
      {!auth ? (
        <Link
          href="/login"
          className="text-blue-500"
        //   suppressHydrationWarning={true}
        >
          <Timeloader />
        </Link>
      ) : (
        <div
          className="sidebarContainer"
          style={{ position: "relative" }}
        //   suppressHydrationWarning={true}
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: isOpen ? "250px" : "80px",
              transition: "none",
              position: "fixed",
              height: "100vh",
              zIndex: !isChecked && isOpen ? 1 : isOpen ? 1 : undefined,
              overflowY: "auto",
            }}
            className={`${
              visibleMenus ? "mobileSidebar" : "sidebar"
            } sidebarlist`}
          >
            <div className="top_section">
              <div className="bars d-flex align-items-center justify-content-between">
                {isOpen ? (
                  <Image className="p-2" src={logo} alt="Logo" />
                ) : (
                  // <Image src={EZlogo} alt="Logo" style={{ margin: "0 auto" }} />
                  <div style={{ margin: "0 auto" }}>
                    <ImageComponent
                      width={0}
                      height={0}
                      user={"/assets/img/Ez.svg"}
                    />
                  </div>
                )}

                {isOpen && (
                  <div className="pinIcon web mt-0">
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      icon={
                        <RadioButtonUncheckedIcon
                          sx={{ color: selectedColor }}
                        />
                      }
                      checkedIcon={
                        <RadioButtonCheckedIcon
                          className=""
                          sx={{ color: selectedColor }}
                        />
                      }
                    />
                  </div>
                )}
                {isOpen && (
                  <div className="xmark mobile">
                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      className="my-2 textheader p-3"
                      icon={faXmark}
                      onClick={closehandleMenuToggle}
                    />
                  </div>
                )}
              </div>
            </div>

            {menuLists?.map((roleGroup, index) => (
              <div key={index}>
                <Accordion
                  sx={{ background: "none !important" }}
                  expanded={expanded === roleGroup.id}
                  onChange={handleChange(roleGroup.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div
                      className="para2 py-2"
                      style={{
                        display: "flex",
                        margin: "0px 9px",
                        fontStyle: "normal",
                        fontWeight: "100",
                      }}
                    >
                      <Divider
                        textAlign="left"
                        sx={{
                          "&::before": { content: '""' },
                          flexGrow: 1,
                          margin: "0 0 0px 0",
                        }}
                      >
                        {" "}
                        {isOpen && roleGroup.role}{" "}
                      </Divider>
                      {roleGroup.role === "Basic" && (
                        <div
                          style={{
                            cursor: "pointer",
                            display: isOpen ? "block" : "none",
                          }}
                        >
                          {hideToggle ? (
                            <div style={{ display: "flex", gap: "1em" }}>
                              <Image
                                src={"/assets/img/approved.svg"}
                                alt=""
                                width={20}
                                height={20}
                                onClick={ApprovedToggle}
                              />
                              <Image
                                src={"/assets/img/rejected.svg"}
                                alt=""
                                width={20}
                                height={20}
                                onClick={RejectedToggle}
                              />
                              <Image
                                src={"/assets/img/refresh.svg"}
                                alt=""
                                width={20}
                                height={20}
                                onClick={RefreshToggle}
                              />
                            </div>
                          ) : (
                            <div style={{ display: isOpen ? "block" : "none" }}>
                              <Image
                                src={"/assets/img/basicmenu.svg"}
                                alt=""
                                width={20}
                                height={20}
                                onClick={() => sethideToggle((prev) => !prev)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {roleGroup.roleItems?.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                          className="menuTextStyle"
                        >
                          <Link
                            href={item.path}
                            className={`link ${
                              pathname === item.path && !hideToggle
                                ? "active"
                                : pathname === item.path && hideToggle
                                ? "activewithNoBackground"
                                : ""
                            } mb-0 w-100`}
                            style={{
                              display: "flex",
                              justifyContent:
                                isOpen || visibleMenus
                                  ? "flex-start"
                                  : "center",
                              alignItems: "center",
                              background:
                                pathname === item.path && !hideToggle
                                  ? useColors.themeRed
                                  : "transparent",
                            }}
                          >
                            <Image
                              src={
                                pathname === item.path && !hideToggle
                                  ? item?.icon ?? "/assets/img/basicmenu.svg"
                                  : item?.inactive ??
                                    "/assets/img/basicmenu.svg"
                              }
                              alt={`${item.name} Icon`}
                              aria-label={`Navigate to ${item.name}`}
                              width={20}
                              height={20}
                            />
                            <div
                              className="para"
                              style={{
                                display:
                                  isOpen || visibleMenus ? "block" : "none",
                                fontFamily: "Inter, sans-serif !important",
                                textTransform: TextStyles.textTransform,
                              }}
                            >
                              {item.name}
                            </div>
                          </Link>

                          {item.childItems && isOpen && (
                            <KeyboardArrowRightIcon
                              onClick={() => toggleChildMenu(item.name)}
                              style={{
                                cursor: "pointer",
                                transform:
                                  expandedItem === item.name
                                    ? "rotate(90deg)"
                                    : "rotate(0)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          )}
                          {!item.childItems && isOpen && hideToggle && (
                            <ToggleSwitch
                              isChecked={item?.checked}
                              onToggle={() =>
                                handleToggleChange(
                                  index,
                                  itemIndex,
                                  item?.checked
                                )
                              }
                            />
                          )}
                        </div>

                        {hideToggle ? (
                          <>
                            {item.childItems && isOpen && expandedItem && (
                              <>
                                <div
                                  className="para"
                                  style={{
                                    display: "block",
                                    paddingLeft: "30px",
                                    background: "#f4f4f4",
                                    borderLeft: "2px solid #ddd",
                                    color: "#6C6A6A",
                                    fontFamily: "Inter, sans-serif !important",
                                    textTransform: TextStyles.textTransform,
                                  }}
                                >
                                  {item.childItems?.map((child, childIndex) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      key={childIndex}
                                    >
                                      <Link
                                        key={childIndex}
                                        href={child.path}
                                        className={`link ${
                                          pathname === child.path
                                            ? "active"
                                            : ""
                                        }`}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "10px 20px",
                                          textDecoration: "none",
                                        }}
                                      >
                                        <Image
                                          src={
                                            pathname === child.path
                                              ? item?.icon ??
                                                "/assets/img/basicmenu.svg"
                                              : child.inactive ??
                                                "/assets/img/basicmenu.svg"
                                          }
                                          alt={`${child.name} Icon`}
                                          width={20}
                                          height={20}
                                        />
                                        <div>{child.name}</div>
                                      </Link>
                                      {hideToggle && (
                                        <ToggleSwitch
                                          isChecked={child?.checked}
                                          onToggle={() =>
                                            handleToggleChange(
                                              index,
                                              childIndex,
                                              child?.checked
                                            )
                                          }
                                        />
                                      )}{" "}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {item.childItems && (
                              <>
                                <div
                                  className="menudropdown"
                                  style={{
                                    display:
                                      expandedItem === item.name
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  {item.childItems?.map((child, childIndex) => (
                                    <div
                                      className="menuTextStyle "
                                      key={childIndex}
                                    >
                                      <Link
                                        key={childIndex}
                                        href={child.path}
                                        className={`link ${
                                          pathname === child.path
                                            ? "active"
                                            : ""
                                        } mb-0 w-100`}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          color:
                                            pathname === child.path
                                              ? useColors.themeRed
                                              : "", // Apply themeRed to the active link
                                        }}
                                      >
                                        <Image
                                          src={"/assets/img/basicmenu.svg"}
                                          alt={`${child.name} Icon`}
                                          width={20}
                                          height={20}
                                        />
                                        <div>{child.name}</div>
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>

          <main
            style={{
              paddingLeft: visibleMenus
                ? "0px"
                : isChecked && isOpen
                ? "250px"
                : "80px",
            }}
            className="contentSection"
          >
            <div className="mainContentMenuBarWithNavbar py-2 ps-2">
              {
                <div onClick={() => handleMenuToggle()}>
                  <MenuOutlinedIcon
                    className="textheader "
                    sx={{ fontSize: "30px  " }}
                  />
                </div>
              }
            </div>
            <div className="mainContentNavbar">
              <NavbarComponent />
            </div>
            <div style={{ padding: "0 10px 0 10px" }}>{children}</div>
          </main>
          <ToastContainer />
        </div>
      )}

      <DraggableComponent />
    </>
  );
};

export default Sidebar;
