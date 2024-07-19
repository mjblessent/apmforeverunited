import { useNavigate } from "react-router-dom";
const MissionHistoryLink = () => {
    const navigate = useNavigate();
    const handleMissionHistoryPage = async () => {
        
        navigate('/missionhistory');
    };
    

    return(
        <li><a onClick={handleMissionHistoryPage}>Mission History</a></li>
    );

};
export default MissionHistoryLink;