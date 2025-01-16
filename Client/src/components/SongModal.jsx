import {X} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FetchSingleUserProject } from "../services/api.js";

const SongModal = ({ project, user_id, onClose }) => {
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const data = await FetchSingleUserProject(user_id, project.id);
                setProjectData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching project details:", error);
                setLoading(false);
            }
        };

        if (project && user_id) {
            fetchProjectDetails();
        }
    }, [project, user_id]);

    console.log(project);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-9 rounded-lg w-full max-w-2xl">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-9 rounded-lg w-full max-w-2xl">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
                <div>Song</div>
            </div>
        </div>
    );
};

export default SongModal;