import { AiOutlineHome } from 'react-icons/ai';
import { PiNote } from 'react-icons/pi';
import { MdOutlineEventNote } from "react-icons/md";
import { MdOutlineManageHistory } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { PiNotePencilFill } from "react-icons/pi";

export const menuData = [
    {
        "id": 1,
        "icon": <AiOutlineHome />,
        "title": "Dashboard",
        "link": "/"
    },
    {
        "id": 2,
        "icon": <MdOutlineEventNote />,
        "title": "Attendance",
        "link": "/attendance"
    },
    {
        "id": 3,
        "icon": <PiNote />,
        "title": "Leaves",
        "link": "/leaves",
    },
    {
        "id": 4,
        "icon": <PiNotePencilFill />,
        "title": "Requests",
        "link": "/request",
    },
    {
        "id": 5,
        "icon": <MdOutlineManageHistory />,
        "title": "Pay Slip",
        "link": "/pay-slip",
    },
    {
        "id": 5,
        "icon": <MdOutlineManageHistory />,
        "title": "Lead Management",
        "link": "/lead-management",
    }
]