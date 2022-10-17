export function LosPassword(){
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        console.log(email);
    }
    return (
        <form noValidate onSubmit={onSubmit}>
            <div className="form-floating m-2">
                <input 
                type="email"
                id="email-ctrl"
                name="email"
                className="form-control"
                />
                <label htmlFor="email-ctrl">Email Address</label>
            </div>
            <button className="btn btn-primary">Reset Password</button>
        </form>
    )
}