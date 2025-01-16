import {X} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {FetchSingleUserProject, UpdateUserProject} from "../services/api.js";
import Input from "../components/Input";
import UploadAudio from "./UploadAudio.jsx";
import Button from "../components/Button.jsx"

const SongModal = ({ project, user_id, onClose }) => {
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [tempo, setTempo] = useState(0);
    const [visibility, setVisibility] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await FetchSingleUserProject(user_id, project.id);
                setProjectData(response.projects[0]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UpdateUserProject({
                user_id: user_id,
                project_id: project.id,
                name: name,
                genre: genre,
                description: description,
                tempo: tempo,
                visibility: visibility,
            });
            console.log("Successfully updated project details");
        } catch (error) {
            console.error("Failed to update project", error);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-9 rounded-lg w-full max-w-2xl">
                    Loading...
                </div>
            </div>
        );
    }

    console.log(projectData);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white text-sm font-light p-9 rounded-lg w-full max-w-2xl">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1>{projectData.name}</h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={15} />
                    </button>
                </div>
                <form className="flex flex-col gap-5 items-start mt-10">
                    <Input label="Update Project Name" placeholder={projectData.name} onChange={(e) => setName(e.target.value)} value={projectData.name} required />
                    <Input label="Update Project Description" placeholder={projectData.description} onChange={(e) => setDescription(e.target.value)} value={projectData.description} required />
                    <Input label="Update Project Genre" placeholder={projectData.genre} onChange={(e) => setGenre(e.target.value)} value={projectData.genre} required />
                    <Input label="Update Project Visibility" type="checkbox" onChange={(e) => setVisibility(e.target.value)} checked={projectData.visibility} required />
                    <Input label="Update Project BPM" type="number" onChange={(e) => setTempo(e.target.value)} value={projectData.tempo} required />
                    {projectData.file_link === null && (
                        <>
                            <p className="text-sm font-light">Upload Audio File</p>
                            <UploadAudio userId={user_id} projectId={project.id} />
                        </>
                    )}
                    <Button onClick={handleSubmit} type="submit">Update Project</Button>
                </form>
            </div>
        </div>
    );
};

export default SongModal;