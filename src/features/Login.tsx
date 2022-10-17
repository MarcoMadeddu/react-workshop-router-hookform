
export function Login(){

    interface LoginForm{
        email: string;
        password: string;
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email,password)
    }
    return (
        <form noValidate onSubmit= {onSubmit}>
            <div className="form-floating m-2">
                <input 
                    type="text" 
                    id = "email-ctrl"
                    name  = "email"
                    className = "form-control"
                />
                 <label htmlFor="email-ctrl">Email address</label>
            </div>

           

            <div className="form-floating m-2">
                <input 
                    type="password" 
                    id = "password-ctrl"
                    name="password"
                    className="form-control"
                />
                <label htmlFor="password-ctrl">Password</label>
            </div>
            <button className="btn btn-primary">Login</button>
        </form>
    )
}