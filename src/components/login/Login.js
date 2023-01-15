import { useState } from 'react';
import { supabase } from '../app/App';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login = () => {
    async function signInWithProvider(provider) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
		  options: {
			redirectTo: 'https://guru3k1.github.io/2WOT-web/',
		  }
        })
      }

    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            const {data, errorResponse} = await supabase.auth.signInWithOtp({
                email: email,
				options: {
					emailRedirectTo: 'https://guru3k1.github.io/2WOT-web/',
				  },
            })
        } catch (error) {
            console.error(error)
        }
    }
    const [email,setEmail] = useState('')

    return(
    <>
    <div className="limiter">
		<div className="container-login100 loginBackground">
			<div className="wrap-login100">
				<form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit} id="loginForm">
					<span className="login100-form-title p-b-53">
						TOWOT
					</span>
					<span className="login50-form-title p-b-53">
						Sign In With
					</span>
					
					<button onClick={() => signInWithProvider('github')} className="btn-face m-b-20">
						<i className="fa-brands fa-github" aria-hidden="true"></i>
						GitHub
					</button>
					<button onClick={() => signInWithProvider('google')} className="btn-google m-b-20">
						<img src={process.env.PUBLIC_URL + '/icon-google.png'} alt="GOOGLE"/>
						Google
					</button>
					<div className="p-t-31 p-b-9">
						<span className="txt1">
							Magic Link
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Email is required">
						<input className="input100" type="email"
							name="email" placeholder='Enter your email' onChange={ e => setEmail(e.target.value)}
						/>
						<span className="focus-input100"></span>
					</div>					
					<div className="container-login100-form-btn m-t-17">
						<button type="submit" form="loginForm" className="login100-form-btn">
							Send Magic Link
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
    </>
    )
};

export default Login;