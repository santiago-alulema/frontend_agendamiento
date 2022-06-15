import './LoginPages.css';
import {useEffect, useState} from 'react';
import {useForm, UserAuthStore} from '../../hooks'
import Swal from 'sweetalert2';
const loginFromFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFromFields = {
    registerUserName: '',
    registerFirstName: '',
    registerLastName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2:''
}
export const LoginPages = () => {
    const [status,setStatus] = useState(false)
    const { startLogin, errorMessage, startRegister } = UserAuthStore();
    const {loginEmail,loginPassword, onInputChange:onLoginInputChange } = useForm(loginFromFields);

    useEffect(() =>{
        if  (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    },[errorMessage])

    const {registerUserName,
            registerFirstName,
            registerLastName,
            registerEmail,
            registerPassword,
            registerPassword2, onInputChange:onRegisterInputChange } = useForm(registerFromFields);


    const loginSumit =  (e) => {
        e.preventDefault()
        if (status){
            if (registerPassword !==  registerPassword2){
                Swal.fire('Error de registro', "las contraseñas no coinciden", 'error');
                return;
            }
            startRegister({
                username:registerUserName,
                firstname:registerFirstName,
                lastname:registerLastName,
                email:registerEmail,
                password:registerPassword
            })
        }else{
            startLogin({email: loginEmail, password: loginPassword})
        }
    }
    const loginTemplate = () =>{
        return (
            <>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
                    <input type="text" 
                            className="form-control" 
                            placeholder="Email"
                            name="loginEmail"
                            value={loginEmail}
                            onChange={onLoginInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            name="loginPassword"
                            value={loginPassword}
                            onChange={onLoginInputChange}/>
                </div>
                <div className="form-group"  style={{textAlign:'center', display:'display'}}>
                    <button type="submit"  className="btn btn-login float-center form-control">INGRESAR</button>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-link" onClick={() => setStatus(true)}>REGISTRARSE</button>
                </div>
            </>
        )
    }

    const registerTemplate = () =>{
        return (
            <>
                
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                        <input type="text" 
                                className="form-control" 
                                placeholder="First Name"
                                name="registerFirstName"
                                value={registerFirstName}
                                onChange={onRegisterInputChange}/>
                        </div>
                        <div className="col">
                        <input type="text" 
                                className="form-control" 
                                placeholder="LastName"
                                name="registerLastName"
                                value={registerLastName}
                                onChange={onRegisterInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <input type="email" 
                                className="form-control" 
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <input type="text" 
                                className="form-control" 
                                placeholder="UserName"
                                name="registerUserName"
                                value={registerUserName}
                                onChange={onRegisterInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="password" 
                            className="form-control" 
                            placeholder="Password"
                            name="registerPassword"
                            value={registerPassword}
                            onChange={onRegisterInputChange}/>
                </div>
                <div className="form-group">
                    <input type="password" 
                            className="form-control" 
                            placeholder="Confirm Password"
                            name="registerPassword2"
                            value={registerPassword2}
                            onChange={onRegisterInputChange}/>
                </div>
                <div className="form-group"  style={{textAlign:'center', display:'display'}}>
                    <button type="submit"  className="btn btn-login float-center form-control">REGISTRAR</button>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-link" onClick={() => setStatus(false)}>LOGIN</button>
                </div>
            </>
        )
    }

    return (
        <section className="login-block">
            <div className="container">
            <div className="row">
                <div className="col-md-4 login-sec">
                    <h2 className="text-center">BIENVENIDO</h2>
                    <form className="login-form" onSubmit={loginSumit}>
                        { status ?
                        registerTemplate():
                        loginTemplate()}
                    </form>
                    <div className="copy-text">CREADO POR: <i className="fa fa-heart"></i> SANTIAGO ALULEMA</div>
                </div>
                <div className="col-md-8 banner-sec">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img className="d-block img-fluid banner-sec" style={{minHeight:'530px'}} src="https://i1.wp.com/informateypunto.com/wp-content/uploads/2020/06/glenn-carstens-peters-npxXWgQ33ZQ-unsplash-scaled.jpg?resize=1280%2C640&ssl=1" alt="First slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <div className="banner-text">
                                    <h2 className="text-shadow">AGENDAMIENTO</h2>
                                    <p className="text-shadow">Te facilitara la vida a la hora de organizar tus citas</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}