import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbCalendarTime } from "react-icons/tb";
import { MdOutlineManageHistory, MdOutlineEventNote } from "react-icons/md";
import { PiNote, PiNotePencilFill } from "react-icons/pi";

export const menuData = [
    {
        "id": 1,
        "icon": <AiOutlineHome />,
        "title": "Dashboard",
        "link": "/"
    },
    {
        "id": 2,
        "icon": <AiOutlineTeam />,
        "title": "Staff",
        "link": "/staff"
    },
    {
        "id": 4,
        "icon": <TbCalendarTime />,
        "title": "Attandance",
        "link": "/attandance",
    },
    {
        "id": 5,
        "icon": <PiNote />,
        "title": "Manage Leave",
        "link": "/manage-leave",
    },
    {
        "id": 6,
        "icon": <PiNotePencilFill />,
        "title": "Request",
        "link": "/request",
    },
    {
        "id": 7,
        "icon": <MdOutlineManageHistory />,
        "title": "Lead Management",
        "link": "/lead-management",
    },
    {
        "id": 8,
        "icon": <MdOutlineEventNote />,
        "title": "Payroll Management",
        "link": "/pay-slip",
    }
]
