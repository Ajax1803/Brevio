import React from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "../../../components/ui/progress";
import UploadPDFDialog from "./UploadPDFDialog";

function SideBar() {
  return (
    <div className="shadow-md h-screen p-7">
      <Image
        src={"/logo.svg"}
        alt="Logo"
        width={75}
        height={50}
        className="pl-4"
      />
      <div className="mt-10 ">
        <UploadPDFDialog>
          <Button className="w-full">+ Upload PDF</Button>
        </UploadPDFDialog>
        <div className="flex gap-2 items-center p-3 mt-3 hover:bg-gray-100 rounded-md cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-gray-100 rounded-md cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33}></Progress>
        <p className="text-sm mt-1">2 out of 5 Pdf Uploaded</p>
        <p className="text-sm mt-2 text-gray-400">Upgrade to upload more Pdf</p>
      </div>
    </div>
  );
}

export default SideBar;
