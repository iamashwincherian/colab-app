import {
  HomeIcon as HomeIconOutlined,
  Cog6ToothIcon as SettingsIconOutlined,
  ClipboardDocumentListIcon as NotesIconOutlined,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  Cog6ToothIcon as SettingsIconSolid,
  ClipboardDocumentListIcon as NotesIconSolid,
} from "@heroicons/react/24/solid";

const menuItems =  [
  {
    id: 0,
    name: "Dashboard",
    icon: HomeIconOutlined,
    iconSolid: HomeIconSolid,
    url: "/",
  },
  {
    id: 1,
    name: "Tickets",
    icon: NotesIconOutlined,
    iconSolid: NotesIconSolid,
    url: "/tickets",
  },
  {
    id: 2,
    name: "Settings",
    icon: SettingsIconOutlined,
    iconSolid: SettingsIconSolid,
    url: "/settings",
  },
];

export default menuItems