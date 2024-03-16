import { useNavigate } from "react-router-dom";
const EventRegLink = () => {
    const navigate = useNavigate();
    const handleEventRegPage = async () => {
        
        navigate('/eventregister');
    };
    

    return(
        <li><a onClick={handleEventRegPage}>Event Registration</a></li>
    );
};

export default EventRegLink;