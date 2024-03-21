import { useNavigate } from "react-router-dom";
const EventResultLink = () => {
    const navigate = useNavigate();
    const handleEventResultPage = async () => {
        
        navigate('/eventresults');
    };
    

    return(
        <li><a onClick={handleEventResultPage}>Event Registration Results</a></li>
    );
};

export default EventResultLink;