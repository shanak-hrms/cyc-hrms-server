import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { PiNote } from 'react-icons/pi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';
import { GrDocumentTime } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { PiNoteBold } from "react-icons/pi";
import { MdOutlineManageHistory } from "react-icons/md";
import { CgNotes } from "react-icons/cg";





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
        "link": "/user"
    },
    {
        "id": 3,
        "icon": <AiOutlineUser />,
        "title": "Employee",
        "link": "/employee",
    },
    {
        "id": 4,
        "icon": <TbCalendarTime />,
        "title": "Attandance",
        "link": "/attandance",
    },
    {
        "id": 5,
        "icon": <GrDocumentTime />,
        "title": "Manage Leave",
        "link": "/manage-leave",
    },
    {
        "id": 6,
        "icon": <GrDocumentTime />,
        "title": "Claim Request",
        "link": "/claims-request",
    },
    {
        "id": 7,
        "icon": <MdOutlineManageHistory />,
        "title": "Lead Management",
        "link": "/lead-management",
    },
    {
        "id": 8,
        "icon": <MdOutlineManageHistory />,
        "title": "Payrol Management",
        "link": "#",
        "subMenu": [
            {
                "id": 1,
                "icon": <MdOutlineManageHistory />,
                "title": "Salary Calculation",
                "link": "/salary-calculation",
            }, {
                "id": 2,
                "icon": <MdOutlineManageHistory />,
                "title": "Pay Slip",
                "link": "/pay-slip-form",
            }
        ]
    }
]

// export const menuData = [
//     {
//         "id": 1,
//         "icon": <AiOutlineHome />,
//         "title": "Dashboard",
//         "link": "/"
//     },
//     {
//         "id": 2,
//         "icon": <AiOutlineTeam />,
//         "title": "Staff",
//         "link": "/user"
//     },
//     {
//         "id": 3,
//         "icon": <AiOutlineUser />,
//         "title": "Employee",
//         "link": "/employee",
//     },
//     {
//         "id": 5,
//         "icon": <GrDocumentTime />,
//         "title": "Manage Leave",
//         "link": "/manage-leave",
//     },
//     {
//         "id": 6,
//         "icon": <MdOutlineManageHistory />,
//         "title": "Lead Management",
//         "link": "/lead-management",
//     },
//     {
//         "id": 7,
//         "icon": <MdOutlineManageHistory />,
//         "title": "Leave Policy",
//         "link": "/leave-policy",

//     },
//     {
//         "id": 8,
//         "icon": <CgNotes />,
//         "title": "Company Policy",
//         "link": "/company-policy",
//     }
// ]