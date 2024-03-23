import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

const UploadTextDoc = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileText, setFileText] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files[0]){
                const fileReader = new FileReader();
                fileReader.onload = () => {
                const fileContent = fileReader.result as string;
                console.log(fileContent);
                setFileText(fileContent);
                };
                fileReader.readAsText(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(selectedFile){
            //start upload the image
            uploadMissionData();
            
        }
        setSelectedFile(null);
    };

    const uploadMissionData = async() => {
        const fileLines = fileText.split("\n");
            console.log(fileLines.length);
            for(let x=0; x<fileLines.length;x++)
            {
                const items = fileLines[x].split("\t");
                const itemData = {
                    date: items[0],
                    zone: items[1],
                    district: items[2],
                    area: items[3],
                    churchunit: items[4],
                    parentunit: items[5],
                    newpeople: items[6],
                    attendchurch: items[7],
                    ondate: items[8],
                    baptized: items[9],
                    missionaryone: items[10],
                    missionarytwo: items[11],
                    missionarythree: items[12],
                    missionaryfour: items[13]
                };
                await addDoc(collection(db,"missiondata"), itemData);
                console.log(itemData);
            }
            console.log("DONE!");
    };
    
    return( <div className="text-center mt-10">
        <form onSubmit={handleSubmit} className="flex items-center flex-col gap-8">
        <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" /> 
        <button type="submit" className="btn gap-3"  disabled={!selectedFile}>Upload</button>
        </form>
    </div>
    );
};

export default UploadTextDoc;