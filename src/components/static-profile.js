import {Link} from "react-router-dom";

const StaticProfile = () => {
    return(
        <div class="container">
            <h1>Profile</h1>
                <form>
                    <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">
                            Username </label>
                        <div class="col-sm-6">
                            <input class="form-control wbdv-field wbdv-username"
                                   id="username"
                                   readonly
                                   value="Alice"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="phone" class="col-sm-2 col-form-label">
                            Phone </label>
                        <div class="col-sm-6">
                            <input class="form-control wbdv-field wbdv-phone"
                                   type="tel"
                                   id="phone"
                                   value="(555) 123-4324"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-2 col-form-label">
                            Email </label>
                        <div class="col-sm-6">
                            <input class="form-control wbdv-field email"
                                   type="email"
                                   id="email"
                                   value="alice@wonderland.com"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-6">
                            <a class="btn btn-success btn-block"
                               href="#">
                                Update
                            </a>
                        </div>
                    </div>
                </form>
                <br/>
                <div class="row">
                        <div class="col-4">
                            <h2>Following</h2>
                        </div>
                        <div class="col-4">
                            <h2>Followers</h2>
                        </div>
                        <div class="col-4">
                            <h2>Your Last Reviews</h2>
                        </div>
                    </div>
        </div>
    )
}

export default StaticProfile;