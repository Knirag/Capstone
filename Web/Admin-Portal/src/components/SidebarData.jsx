import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { MdSettingsSuggest, MdAnalytics } from "react-icons/md";
import { HiOutlineBell, HiOutlineLogout } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard-admin",
    icon: <RiIcons.RiDashboardFill />,
  },
  {
    title: "Notification Center",
    path: "/notification-center",
    icon: <HiOutlineBell />,
  },
  {
    title: "Constituent Management",
    path: "/constituent-management",
    icon: <IoIcons.IoIosPeople />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <MdAnalytics />,
  },
  {
    title: "Support & Feedback",
    path: "/contact-support",
    icon: <MdSettingsSuggest />,
  },
];




