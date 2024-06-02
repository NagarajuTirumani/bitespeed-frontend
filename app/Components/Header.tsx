import React from "react";

function Header(props: any) {
  return (
    <div className="w-[100%] py-4 bg-[#F3F3F3] flex justify-end items-center">
      <button onClick={() => props.setSaveNodes(true)} className="border-blue-800 border-2 px-3 h-10 rounded text-blue-800 me-8 font-medium">
        Save Changes
      </button>
    </div>
  );
}

export default Header;
