import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const UploadAnnouncement = () => {

    const [error, setError] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [day, setDay] = useState<string>('');
    //const [imgurl, setImgurl] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [storageDirect, setStorageDirect] = useState<string>('');



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files[0]){
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var downloadURL;
        var announcementData;
        if(selectedFile){
        const fileId = uuidv4();
        const formatFile = selectedFile.type.split('/')[1];

        setStorageDirect(`announcements/${fileId}.${formatFile}`);
        const storageRef = ref(storage, storageDirect);
        await uploadBytesResumable(storageRef, selectedFile);
         downloadURL = await getDownloadURL(storageRef);
        //console.log(downloadURL);
        
        
        }
        setSelectedFile(null);
        if(downloadURL){
            announcementData = {
                title: title,
                message: message,
                status: "show",
                date: day,
                imgurl: downloadURL,
                storageDirect: storageDirect
            };
        } else{
             announcementData = {
                title: title,
                message: message,
                status: "show",
                date: day,
                imgurl: "",
                storageDirect: storageDirect
            };
        }
        
        try{
            await addDoc(collection(db, "announcements"), announcementData);
        } catch(error) {
            setError("error");
        }

        setDay("");
        setTitle("");
        setMessage("");
        setSelectedFile(null);
        
        
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
            {error && error}
            <div className="text-center px-64">
                <h1 className="text-5xl font-bold">Add Announcement</h1>
                <p className="py-6">Here is where you can add announcements to the home page that can have any combination of title, message, date and image</p>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input input-bordered"  required/>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Message</span>
                </label>
                <textarea className="textarea textarea-bordered w-96" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message"></textarea>
            </div>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input type="date" value={day} onChange={(e) => setDay(e.target.value)} className="input input-bordered" />
              </div>
            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" /> 
            <div className="form-control mt-6">
                <button className="btn btn-primary">Add Announcement</button>
            </div>
            </form>
        </div>
    );
};

export default UploadAnnouncement;