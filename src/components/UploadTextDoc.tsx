import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";

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
        //future fixes, first add doc error because sometimes it generates the same id
        //second error, empty lines 
        const fileLines = fileText.split("\n");
            console.log(fileLines.length);
            for(let x=0; x<fileLines.length;x++)
            {
                const items = fileLines[x].split("\t");

                var mOneName:string[];
                if(items[10]  == "0" || items[10].length == 2){
                    mOneName = ["0,","0","0"];
                    
                } else {
                    mOneName = items[10].split(" ");
                    if(mOneName[2] == null)
                    {
                        console.log("no middle name");
                        mOneName[0] = mOneName[0].toLowerCase();
                        mOneName[1] = mOneName[1].toLowerCase();
                        mOneName[2] = "0";
                    }else {
                        mOneName[0] = mOneName[0].toLowerCase();
                        mOneName[1] = mOneName[1].toLowerCase();
                        mOneName[2] = mOneName[2].toLowerCase();
                    }
                }

                var mTwoName:string[];
                if(items[11]  == "0" || items[11].length == 2){
                    mTwoName = ["0,","0","0"];
                    
                } else {
                    mTwoName = items[11].split(" ");
                    if(mTwoName[2] == null)
                    {
                        console.log("no middle name");
                        mTwoName[0] = mTwoName[0].toLowerCase();
                        mTwoName[1] = mTwoName[1].toLowerCase();
                        mTwoName[2] = "0";
                    }else {
                        mTwoName[0] = mTwoName[0].toLowerCase();
                        mTwoName[1] = mTwoName[1].toLowerCase();
                        mTwoName[2] = mTwoName[2].toLowerCase();
                    }
                }

                var mThreeName:string[];
                if(items[12]  == "0" || items[12].length == 2){
                    mThreeName = ["0,","0","0"];
                    
                } else {
                    mThreeName = items[12].split(" ");
                    if(mThreeName[2] == null)
                    {
                        console.log("no middle name");
                        mThreeName[0] = mThreeName[0].toLowerCase();
                        mThreeName[1] = mThreeName[1].toLowerCase();
                        mThreeName[2] = "0";
                    }else {
                        mThreeName[0] = mThreeName[0].toLowerCase();
                        mThreeName[1] = mThreeName[1].toLowerCase();
                        mThreeName[2] = mThreeName[2].toLowerCase();
                    }
                }

                var mFourName:string[];
                if(items[13]  == "0" || items[13].length == 2){
                    mFourName = ["0,","0","0"];
                    
                } else {
                    mFourName = items[13].split(" ");
                    if(mFourName[2] == null)
                    {
                        console.log("no middle name");
                        mFourName[0] = mFourName[0].toLowerCase();
                        mFourName[1] = mFourName[1].toLowerCase();
                        mFourName[2] = "0";
                    }else {
                        mFourName[0] = mFourName[0].toLowerCase();
                        mFourName[1] = mFourName[1].toLowerCase();
                        mFourName[2] = mFourName[2].toLowerCase();
                    }
                }
                
                for(let y =0;y<10;y++)
                {
                    if(items[y] == null){
                        console.log("Null found");
                        console.log(items);
                    }
                }

                if(mOneName[0] == null || mOneName[1] == null || mOneName[2] == null){
                    console.log("Null found");
                    console.log(items);
                }
                if(mTwoName[0] == null || mTwoName[1] == null || mTwoName[2] == null){
                    console.log("Null found");
                    console.log(items);
                }
                if(mThreeName[0] == null || mThreeName[1] == null || mThreeName[2] == null){
                    console.log("Null found");
                    console.log(items);
                }
                if(mFourName[0] == null || mFourName[1] == null || mFourName[2] == null){
                    console.log("Null found");
                    console.log(items);
                }
                
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
                    missionaryonelast: mOneName[0].slice(0,-1),
                    missionaryonefirst: mOneName[1],
                    missionaryonemiddle: mOneName[2],
                    missionarytwolast: mTwoName[0].slice(0,-1),
                    missionarytwofirst: mTwoName[1],
                    missionarytwomiddle: mTwoName[2],
                    missionarythreelast: mThreeName[0].slice(0,-1),
                    missionarythreefirst: mThreeName[1],
                    missionarythreemiddle: mThreeName[2],
                    missionaryfourlast: mFourName[0].slice(0,-1),
                    missionaryfourfirst: mFourName[1],
                    missionaryfourmiddle: mFourName[2],
                };
                console.log(itemData);
                
                try{
                    await addDoc(collection(db,"missiondatanames"), itemData);
                }catch(error){
                    const fileId = uuidv4();
                    await setDoc(doc(db, 'missiondatanames/' + fileId), itemData);
                }
                
                
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