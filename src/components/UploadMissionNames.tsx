import { addDoc, and, collection, getCountFromServer, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
//import { v4 as uuidv4 } from "uuid";
import React from "react";

const UploadMissionNames = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileText, setFileText] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
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
        if (selectedFile) {
            //start upload the image
            uploadMissionData();

        }
        setSelectedFile(null);
    };

    const uploadMissionData = async () => {
        //future fixes, first add doc error because sometimes it generates the same id
        //second error, empty lines 
        const fileLines = fileText.split("\n");
        console.log(fileLines.length);
        for (let x = 0; x < fileLines.length; x++) {
            const items = fileLines[x].split("\t");

            let mOneName: string[];
            if (items[10] == "0" || items[10].length == 2) {
                mOneName = ["0,", "0", "0"];

            } else {
                mOneName = items[10].split(" ");
                if (mOneName[2] == null) {
                    //console.log("no middle name");
                    mOneName[0] = mOneName[0].toLowerCase().slice(0, -1);
                    mOneName[1] = mOneName[1].toLowerCase();
                    mOneName[2] = "0";

                    await checkAndUpload(mOneName);
                } else {
                    mOneName[0] = mOneName[0].toLowerCase().slice(0, -1);
                    mOneName[1] = mOneName[1].toLowerCase();
                    mOneName[2] = mOneName[2].toLowerCase();
                    await checkAndUpload(mOneName);
                }
            }

            let mTwoName: string[];
            if (items[11] == "0" || items[11].length == 2) {
                mTwoName = ["0,", "0", "0"];

            } else {
                mTwoName = items[11].split(" ");
                if (mTwoName[2] == null) {
                    //console.log("no middle name");
                    mTwoName[0] = mTwoName[0].toLowerCase().slice(0, -1);
                    mTwoName[1] = mTwoName[1].toLowerCase();
                    mTwoName[2] = "0";

                    await checkAndUpload(mTwoName);
                } else {
                    mTwoName[0] = mTwoName[0].toLowerCase().slice(0, -1);
                    mTwoName[1] = mTwoName[1].toLowerCase();
                    mTwoName[2] = mTwoName[2].toLowerCase();

                    await checkAndUpload(mTwoName);
                }
            }

            let mThreeName: string[];
            if (items[12] == "0" || items[12].length == 2) {
                mThreeName = ["0,", "0", "0"];

            } else {
                mThreeName = items[12].split(" ");
                if (mThreeName[2] == null) {
                    //console.log("no middle name");
                    mThreeName[0] = mThreeName[0].toLowerCase().slice(0, -1);
                    mThreeName[1] = mThreeName[1].toLowerCase();
                    mThreeName[2] = "0";

                    await checkAndUpload(mThreeName);
                } else {
                    mThreeName[0] = mThreeName[0].toLowerCase().slice(0, -1);
                    mThreeName[1] = mThreeName[1].toLowerCase();
                    mThreeName[2] = mThreeName[2].toLowerCase();

                    await checkAndUpload(mThreeName);
                }
            }

            let mFourName: string[];
            if (items[13] == "0" || items[13].length == 2) {
                mFourName = ["0,", "0", "0"];

            } else {
                mFourName = items[13].split(" ");
                if (mFourName[2] == null) {
                    //console.log("no middle name");
                    mFourName[0] = mFourName[0].toLowerCase().slice(0, -1);
                    mFourName[1] = mFourName[1].toLowerCase();
                    mFourName[2] = "0";

                    await checkAndUpload(mFourName);
                } else {
                    mFourName[0] = mFourName[0].toLowerCase().slice(0, -1);
                    mFourName[1] = mFourName[1].toLowerCase();
                    mFourName[2] = mFourName[2].toLowerCase();

                    await checkAndUpload(mFourName);
                }
            }
        }
        console.log("DONE!");
    };

    const checkAndUpload = async (name: string[]) => {
        //console.log(name[0]);//last
        //console.log(name[1]);//first
        //console.log(name[2]);//middle

        const q = query(collection(db, "missionaryname"), and(where("first", "==", name[1]), where("middle", "==", name[2]), where("last", "==", name[0])));
        //const qMiddle = query(collection(db,"missionaryname"), where("middle", "==", name[2]));
        //const qLast = query(collection(db,"missionaryname"), where("last", "==", name[0]));

        const qSnapshot = await getCountFromServer(q);
        //const qSnapshotMiddle = await getCountFromServer(qMiddle);
        //const qSnapshotLast = await getCountFromServer(qLast);

        //console.log("Name counts");
        //console.log(qSnapshotLast.data().count);
        //console.log(qSnapshotLast.data().count < 1);
        //console.log(qSnapshot.data().count < 1);
        //console.log(qSnapshotMiddle.data().count);

        if (qSnapshot.data().count < 1) {
            const nameData = {
                first: name[1],
                middle: name[2],
                last: name[0]
            };
            await addDoc(collection(db, "missionaryname"), nameData);
        }

    };

    return (<div className="text-center mt-10">
        <form onSubmit={handleSubmit} className="flex items-center flex-col gap-8">
            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
            <button type="submit" className="btn gap-3" disabled={!selectedFile}>Upload Names</button>
        </form>
    </div>
    );
};

export default UploadMissionNames;