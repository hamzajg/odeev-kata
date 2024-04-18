import {Badge, FooterIcon, Progress} from "flowbite-react";
import React from "react";

const RequiredStepsProgress = () => <>
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Ready to be generated
    </h5>
    <div className="flex items-center gap-2 mb-4">
        <FooterIcon icon="check-circle" className="text-green-500"/>
        <span className="text-gray-700">Require: At least One Bottom Up Design & One Specification by Example design for Acceptance Tests</span>
    </div>
    <div className="flex items-center gap-2 mb-4">
        <FooterIcon icon="check-circle" className="text-green-500"/>
        <span className="text-gray-700">Require: One Top Down Design</span>
    </div>
    <div className="flex items-center gap-2 mb-4">
        <FooterIcon icon="x-circle" className="text-red-500"/>
        <span className="text-gray-700">Require: Specific Target Platform Settings</span>
    </div>
    <Progress progress={50} className="mb-4"/>
    <div className="">
        <Badge color="danger">Not Ready</Badge>
    </div>
</>

export default RequiredStepsProgress;