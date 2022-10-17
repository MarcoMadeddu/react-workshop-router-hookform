export function Login(){
    const onSubmit = () => {'null'}
    return (
        <form noValidate onSubmit= {() =>{onSubmit()}}>
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