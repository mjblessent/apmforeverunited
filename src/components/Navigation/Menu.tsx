import { useAuth } from "../../hooks/useAuth";
import EventRegLink from "./EventRegLink";
import EventResultLink from "./EventResultLink";
import HomeLink from "./HomeLink";
import ImgCollectLink from "./ImgCollectLink";
import ManageAccLink from "./ManageAccLink";
import ManageHomeLink from "./ManageHomeLink";
import ProfileLink from "./ProfileLink";

const Menu = () => {
    const { user } = useAuth();
    const { admin } = useAuth();

    if(user){//rm
        if(admin){//admin
            return(
                <div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <HomeLink />
                    <EventRegLink />
                    <EventResultLink />
                    <ImgCollectLink />
                    <ManageAccLink />
                    <ManageHomeLink />
                    <ProfileLink />
                    </ul>
                </div>
            );
        }else{
            return(
                <div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <HomeLink />
                    <EventRegLink />
                    <ProfileLink />
                    </ul>
                </div>
            );
        };
    }else {//unauthenticated user
        return(
            <div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <HomeLink />
                    <EventRegLink />
                    </ul>
                </div>
        );
    };
};

export default Menu;