import {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import {FolderPlus,X} from "@phosphor-icons/react";
import Input from "../components/Input";
import Button from "./Button.jsx";
import {CreateNewProject} from "../services/api.js";

const Projects = () => {
    const [userData, setUserDate] = useState(null);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [tempo, setTempo] = useState(0);
    const [visibility, setVisibility] = useState(false);

    // fetching the user information from token
    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const decodeToken = jwtDecode(storedToken);
            setUserDate(decodeToken);
        } else {
            setUserDate(null);
            console.log("no user logged in")
        }
    }, []);

    if (!userData) {
        return <div>Something went wrong!</div>
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CreateNewProject({
                user_id: userData.user_id,
                name: name,
                genre: genre,
                description: description,
                tempo: tempo,
                visibility: visibility,
            })
        } catch (error) {
            console.error(error);
        }
    }

    return(
    <div className="flex flex-col items-start p-6">
        <div className="flex flex-row items-center gap-5">
            <h1 className="font-light">Your Projects, {userData.username}</h1>
            <FolderPlus onClick={toggleModal} className="cursor-pointer" size={20} />
        </div>

        {/* Creating a New Project */}
        {modal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-9 gap-10 flex flex-col rounded-lg">
                    <div className="flex flex-row items-center justify-between w-full ">
                        <h1 className="font-light text-sm">Create a New Project</h1>
                        <X size={15} onClick={toggleModal} className="cursor-pointer" />
                    </div>
                    <form className="gap-5 flex flex-col items-center">
                        <Input
                            label="Project Name"
                            placeholder="Enter Project Name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Project Genre"
                            placeholder="The Genre of your song"
                            type="text"
                            required
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                        <Input
                            label="Project Description"
                            placeholder="Description"
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            label="Tempo"
                            placeholder="The Genre of your song"
                            type="number"
                            required
                            value={tempo}
                            onChange={(e) => setTempo(e.target.value)}
                        />
                        <Input
                            label="Make Project Public?"
                            type="checkbox"
                            required
                            checked={visibility}
                            onChange={(e) => setVisibility(e.target.checked)}
                        />
                        <Button type="submit" onClick={handleSubmit}>Create Project</Button>
                    </form>
                </div>
            </div>
        )}

        {/* Project Cards */}
        <div className="mt-10 grid grid-cols-6 gap-5">
            <div className="p-6 text-sm cursor-pointer font-light border-[0.5px] w-[400px] rounded-xl">
                <h1>Project Name</h1>
                <p className="mt-5">Project Description</p>
                <div className="flex mt-4 flex-row items-center w-full justify-between">
                    <p>Tempo: 122 BPM</p>
                    <p className="p-2 border-[1px] rounded-xl">Public</p>
                </div>
            </div>
        </div>

    </div>
    );
}

export default Projects;