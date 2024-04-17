import {Card} from "flowbite-react";
import FrameworkBuildingBlocks from "./components/FrameworkBuildingBlocks";
import SolutionsTemplateBoilerplate from "./components/SolutionsTemplateBoilerplate";

const FrameworkHubPage = () => {
    return (
        <div className="p-6">
            <Card className="mb-2">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '48%'}}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Framework Hub
                        </h5>
                        <p>Here a detailed presentation of the framework Building Blocks, Code boilerplate, usage and
                            samples</p>
                    </div>
                    <div style={{width: '48%'}}>
                    </div>
                </div>
            </Card>

            <FrameworkBuildingBlocks />

            <SolutionsTemplateBoilerplate />
        </div>
    )
}

export default FrameworkHubPage;