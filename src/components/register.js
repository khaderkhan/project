const Register = () => {
    return(
        <div>
            <h1>Sign Up</h1>
            <div className="mb-3 row">
                <label htmlFor="username"
                       className="col-sm-2 col-form-label">
                    Username
                </label>
                <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           id="username"
                           title="Please enter your user name"
                           placeholder="Alice"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">
                    Password
                </label>
                <div className="col-sm-10">
                    <input type="inputPassword"
                           className="form-control"
                           title="Please enter your password"
                           placeholder="1234qwer!@#$"
                           id="password"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="verifyPassword"
                       className="col-sm-2 col-form-label">
                    Verify Password
                </label>
                <div className="col-sm-10">
                    <input type="inputPassword"
                           className="form-control"
                           title="Please enter your password"
                           placeholder="1234qwer!@#$"
                           id="verifyPassword"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">

                </label>
                <div className="col-sm-10">
                    <a className="btn btn-primary btn-block"
                       href="/">
                        Sign Up
                    </a>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">

                </label>
                <div className="col-sm-10">
                    <a
                        href="/">
                        Login
                    </a>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">
                </label>
                <div className="col-sm-10">
                    <a href="/">
                        Cancel
                    </a>
                </div>
            </div>


        </div>
    )
}
export default Register;