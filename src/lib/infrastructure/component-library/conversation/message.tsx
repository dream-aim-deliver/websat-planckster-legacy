
import { Avatar} from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { MessageViewModel } from "../../view-model/message";

export const Message = ({
    name = "Vania Santos",
    timestamp = new Date(),
    content = "Hello World",
} : MessageViewModel) => {
    const firstLetterOfName = name.charAt(0).toUpperCase();
    const timestampString = timestamp.toUTCString();
    return (
        <div className="flex space-x-4">
            {/* Avatar Block */}
            <div className="float-left self-end">
                <Avatar sx={{ bgcolor: deepOrange[500]}}>{firstLetterOfName}</Avatar>
            </div>
            {/* Message Block */}
            <div className="">
                <div className="flex space-x-4 align-text-top">
                    <div className="text-sm ">{name}</div>
                    <div className="text-sm font-thin">{timestampString}</div>
                </div>
                <div className="object-center rounded-xl bg-gray-300 p-4 max-w-4">{content}</div>
            </div>
        </div>
    );
}
