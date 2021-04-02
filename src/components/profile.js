import {Link} from "react-router-dom";

const Profile = () => {
    return(
        <div className="Profile">
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
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-6">
                            <Link to="/">
                                <a class="btn btn-danger btn-block"
                                   href="#">
                                    Logout - REPLACE WITH GOOGLE LOGOUT BUTTON
                                </a>
                            </Link>
                        </div>
                    </div>

                </form>
        </div>
    )
}

export default Profile;