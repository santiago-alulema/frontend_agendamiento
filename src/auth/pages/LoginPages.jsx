import './LoginPages.css';
import {useState} from 'react';

export const LoginPages = () => {
    const [status,setStatus] = useState(false)

    const loginTemplate = () =>{
        return (
            <>
                <div className="form-group">
                    <label for="exampleInputEmail1" className="text-uppercase">Username</label>
                    <input type="text" className="form-control" placeholder=""/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input type="password" className="form-control" placeholder=""/>
                </div>
                <div className="form-group"  style={{textAlign:'center', display:'display'}}>
                    <button type="submit"  className="btn btn-login float-center form-control">INGRESAR</button>
                </div>
                <div className="form-group">
                    <button type="button" class="btn btn-link" onClick={() => setStatus(true)}>REGISTRARSE</button>
                </div>
            </>
        )
    }

    const registerTemplate = () =>{
        return (
            <>
                
                <div className="form-group">
                    <div class="row">
                        <div class="col">
                        <input type="text" 
                                className="form-control" 
                                placeholder="First Name"/>
                        </div>
                        <div class="col">
                        <input type="text" 
                                className="form-control" 
                                placeholder="LastName"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div class="row">
                        <div class="col">
                            <input type="email" 
                                className="form-control" 
                                placeholder="Email"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div class="row">
                        <div class="col">
                            <input type="text" 
                                className="form-control" 
                                placeholder="UserName"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="password" 
                            className="form-control" 
                            placeholder="Password"/>
                </div>
                <div className="form-group">
                    <input type="password" 
                            className="form-control" 
                            placeholder="Confirm Password"/>
                </div>
                <div className="form-group"  style={{textAlign:'center', display:'display'}}>
                    <button type="submit"  className="btn btn-login float-center form-control">REGISTRAR</button>
                </div>
                <div className="form-group">
                    <button type="button" class="btn btn-link" onClick={() => setStatus(false)}>LOGIN</button>
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
                    <form className="login-form">
                        { status ?
                        registerTemplate():
                        loginTemplate()}
                    </form>
                    <div class="copy-text">CREADO POR: <i class="fa fa-heart"></i> SANTIAGO ALULEMA</div>
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