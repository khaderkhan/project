import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../style/login-register.style.css';
const Login = () => {
    return(
        <div className="Login">
            <form>
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
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">

                </label>
                <div className="col-sm-10">
                    <a className="btn btn-primary btn-block"
                       href="/">
                        Sign In
                    </a>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">
                </label>
                <div className="col-sm-10 float-left"
                     >
                    <a href="/">
                        Forgot Password?
                    </a>

                    <div className="float-right">
                        <a href="/">
                            Sign Up
                        </a>
                    </div>
                </div>
                <div/>
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
            </form>
        </div>


    )
    // return (
    //     <div className="Login">
    //         <Form >
    //             <Form.Group size="lg" controlId="email">
    //                 <Form.Label>Email</Form.Label>
    //                 <Form.Control
    //                     autoFocus
    //                     type="email"
    //
    //                 />
    //             </Form.Group>
    //             <Form.Group size="lg" controlId="password">
    //                 <Form.Label>Password</Form.Label>
    //                 <Form.Control
    //                     type="password"
    //
    //
    //                 />
    //             </Form.Group>
    //             <Button block size="lg" type="submit" >
    //                 Login
    //             </Button>
    //         </Form>
    //     </div>
    // );
}
export default Login;