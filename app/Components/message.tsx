import { MessageSquareText } from "lucide-react";
import React from "react";
import Image from "next/image";

function Message(props: any) {
  const { title } = props;
  return (
    <div className="min-w-48">
      <div className="bg-[#B2F0E3] flex justify-between items-center p-[3px] rounded-t-sm">
        <div className="flex items-center">
          <MessageSquareText size={10} className="mr-1" />
          <p className="text-[10px] font-bold">Send Message</p>
        </div>
        <Image src="/whatsapp.png" alt="whatsapp" height="15" width="15" />
      </div>
      <div className="p-3 bg-white rounded-b-md shadow-2xl text-center min-h-14 text-wrap whitespace-normal break-words">
        {title}
      </div>
    </div>
  );
}

export default Message;
