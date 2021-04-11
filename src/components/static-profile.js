import {Link} from "react-router-dom";

const StaticProfile = () => {
    return(
        <div class="container">
            <h1>Profile</h1>
            <br/>
                    <div class="row">
                        <div class="col-4">
                            <h2> "Insert username here" </h2>
                        </div>
                    </div>
                <br/>
                <br/>
                <br/>
                <div class="row">
                        <div class="col-4">
                            <h2>Last Review</h2>
                            <p><i>Last review here</i></p>
                        </div>
                </div>
        </div>
    )
}

export default StaticProfile;