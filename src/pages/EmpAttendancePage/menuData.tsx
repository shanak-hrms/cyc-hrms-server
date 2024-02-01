import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { PiNote } from 'react-icons/pi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgNotes } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import { MdOutlineEventNote } from "react-icons/md";
import { GiStabbedNote } from "react-icons/gi";
import { GiNotebook } from "react-icons/gi";
import { PiNoteFill } from "react-icons/pi";


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
        "id": 3,
        "icon": <GiNotebook />,
        "title": "Claims Request",
        "link": "/claims-request",
    }
]