"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./sidebar.css";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import NavbarComponent from "../reusableComponent/appbar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Divider } from "@mui/material";
import { TextStyles } from "../reusableComponent/styles";
import ToggleSwitch from "../reusableComponent/toggleSwitch";
import logo from "@/public/assets/img/employeez.png";
import logo2 from "@/public/assets/img/Ez.svg";
import DraggableComponent from "../reusableComponent/draggable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Messages } from "../reusableComponent/messages";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useRouter } from "next/navigation";
import { Timeloader } from "../reusableComponent/loader/timeloader";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import dashboardWhite from "@/public/assets/img/dashboard-white.svg";
import dashboardGrey from "@/public/assets/img/dashboard-grey.svg";
import timesheetGrey from "@/public/assets/img/timesheet_grey.svg";
import timesheetWhite from "@/public/assets/img/timesheet_white.svg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Colors } from "../reusableComponent/styles";
import {
  menuForSuperAdmin,
  menuItemForEmployee,
} from "../reusableComponent/sidebarJson";

interface SidebarProps {
  children: ReactNode;
}


const getMenuItems = (role: string) => {
  return role === "SA"
    ? menuForSuperAdmin
    : role === "E"
    ? menuItemForEmployee
    : [];
};

const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideToggle, sethideToggle] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const [visibleMenus, setVisibleMenus] = useState(false);
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [auth, setAuth] = useState<String | null>(null);

  const selectedColor = useSelector((state: RootState) => state.color.color);
  const selectedMeedingModeBorder = useSelector(
    (state: RootState) => state.meetingmode.background
  );

  const role = useSelector((state: RootState) => state.role.role);

  const menuItems = getMenuItems(role);
  const [menuLists, setMenuLists] = useState(menuItems);
  const router = useRouter();

  console.log("Roles", role);

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

  useEffect(() => {
    const savedExpanded = sessionStorage.getItem("expandedAccordion");
    if (savedExpanded) {
      setExpanded(savedExpanded);
    }
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      const target = event.target as HTMLElement; // Cast to HTMLElement

      if (target.tagName === "A" || target.closest("a")) return; // Prevent toggle if clicking a link

      sessionStorage.setItem("expandedAccordion", isExpanded ? panel : "");
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
    const newMenuItems = [...menuItems];
    const roleItem = newMenuItems[roleIndex]?.roleItems[itemIndex];

    if (roleItem) {
      roleItem.checked = !checkeddata;
      setMenuLists(newMenuItems);
    }
  };

  const ApprovedToggle = () => {
    const newList = menuLists?.map((list:any) => ({
      ...list,
      roleItems: list.roleItems.filter((item:any) => item.checked),
    }));

    setMenuLists(newList);
    sethideToggle(false);
    toast.success(Messages.success.approved);
  };

  const RejectedToggle = () => {
    const newList = menuLists?.map((list:any) => ({
      ...list,
      roleItems: list.roleItems?.map((item:any) => ({
        ...item,
        checked: true,
      })),
    }));

    setMenuLists(newList);
    sethideToggle(false);
    toast.success(Messages.success.rejected);
  };

  const RefreshToggle = () => {
    const newList = menuItems?.map((list:any) => ({
      ...list,
      roleItems: list.roleItems?.map((item:any) => ({
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
        <Link href="/login" className="text-blue-500">
          <Timeloader />
        </Link>
      ) : (
        <div className="sidebarContainer" style={{ position: "relative" }}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: isOpen ? "250px" : "60px",
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
            <div className="top_section mt-3">
              <div className="bars d-flex align-items-center justify-content-between">
                {isOpen ? (
                  <Image className="p-2" src={logo} alt="Logo" />
                ) : (
                  <div style={{ margin: "0 auto" }}>
                    <Image className="w-100 p-2" src={logo2} alt="Logo" />
                  </div>
                )}
                {hideToggle ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "35%",
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon
                      sx={{ color: "#22dd1a" }}
                      onClick={ApprovedToggle}
                    />
                    <CancelOutlinedIcon
                      sx={{ color: "#fd5454" }}
                      onClick={RejectedToggle}
                    />
                    <RotateLeftOutlinedIcon onClick={RefreshToggle} />
                  </div>
                ) : (
                  <>
                    <div style={{ display: isOpen ? "block" : "none" }}>
                      <WidgetsOutlinedIcon
                        onClick={() => sethideToggle((prev) => !prev)}
                      />
                    </div>
                    <div
                      className="pinIcon web mt-0"
                      style={{ display: isOpen ? "block" : "none" }}
                    >
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
                  </>
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
            <Link
              href="/dashboard"
              className={`link ${
                pathname === "/dashboard" ? "dashboardActive" : ""
              } mb-0 w-100`}
              style={{
                display: "flex",
                justifyContent:
                  isOpen || visibleMenus ? "flex-start" : "center",
                alignItems: "center",
                background:
                  pathname === "/dashboard"
                    ? useColors.themeRed
                    : "transparent",
                color: pathname === "/dashboard" ? "white" : "",
              }}
            >
              <DashboardOutlinedIcon
                className="heading2 menuicons ps-1"
                sx={{ color: pathname === "/dashboard" ? "white" : "#7E7E7E" }}
              />
              <div
                className="para"
                style={{
                  display: isOpen || visibleMenus ? "block" : "none",
                  fontFamily: "Inter, sans-serif",
                  textTransform: TextStyles.textTransform,
                }}
              >
                Dashboard
              </div>
            </Link>
            {/* end */}
            {menuLists?.map((roleGroup:any, index:any) => (
              <div key={index}>
                <Accordion
                  sx={{
                    boxShadow: "none !important", // Removes the box shadow
                    background: "none !important",
                    justifyContent:
                      isOpen || visibleMenus ? "flex-start" : "center",
                    borderBottom:
                      "0.1px solid var(--Timesheet-holiday, #ede4ff73) !important", // Custom border color
                  }}
                  expanded={expanded === roleGroup.id}
                  onChange={handleChange(roleGroup.id)}
                >
                  <AccordionSummary
                    className="accordionmenu"
                    sx={{
                      borderBottom:
                        "0.1px solid var(--Timesheet-holiday, #ede4ff73) !important", // Custom border color
                      boxShadow: "none !important", // Removes the box shadow
                      background: "none !important",
                      alignItems: "center",
                      justifyContent: "start",
                    }}
                    expandIcon={null} // Removes the arrow icon
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {/* accordian icons */}
                    {roleGroup.role === "Basic" && (
                      <ExtensionOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Delegation" && (
                      <FactCheckOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Manager" && (
                      <AnalyticsOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Human Resources" && (
                      <GroupsOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Immigration" && (
                      <FlightTakeoffOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Sales" && (
                      <AddchartOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Sub-Contract onboarding" && (
                      <EngineeringOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Accounting" && (
                      <AccountBalanceWalletOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Payroll" && (
                      <PaidOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Admin" && (
                      <AdminPanelSettingsOutlinedIcon className="menuicons" />
                    )}
                    {roleGroup.role === "Subscription" && (
                      <BubbleChartOutlinedIcon className="menuicons" />
                    )}
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
                    </div>
                  </AccordionSummary>

                  <AccordionDetails>
                    {roleGroup.roleItems?.map((item:any, itemIndex:any) => (
                      <div key={itemIndex}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Link
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents accordion from closing
                              toggleChildMenu(item.name); // Call your function
                            }}
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
                                  ? "space-between"
                                  : "center",
                              alignItems: "center",
                              background:
                                pathname === item.path && !hideToggle
                                  ? useColors.themeRed
                                  : "transparent",
                            }}
                          >
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
                            {item.childItems && isOpen && (
                              <KeyboardArrowRightIcon
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
                          </Link>
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
                                  {item.childItems?.map((child:any, childIndex:any) => (
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
                                        <DnsOutlinedIcon className="menuicons" />
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
                                  {item.childItems?.map((child:any, childIndex:any) => (
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
                                        <DnsOutlinedIcon className="menuicons" />
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
            <div
              className={`mb-0 w-100 link`}
              style={{
                display: "flex",
                justifyContent:
                  isOpen || visibleMenus ? "flex-start" : "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LogoutOutlinedIcon className="heading2 menuicons ps-1" />
              <div
                className="para "
                style={{
                  display: isOpen || visibleMenus ? "block" : "none",
                  fontFamily: "Inter, sans-serif",
                  textTransform: TextStyles.textTransform,
                }}
              >
                Logout
              </div>
            </div>
          </div>

          <main
            style={{
              paddingLeft: visibleMenus
                ? "0px"
                : isChecked && isOpen
                ? "250px"
                : "60px",
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

            <div
              style={{
                padding: "0 10px 0 10px",
                background: selectedMeedingModeBorder,
                marginTop: "1px",
              }}
            >
              {children}
            </div>
          </main>
          <ToastContainer />
        </div>
      )}
      <DraggableComponent />
    </>
  );
};

export default Sidebar;
