import {useForm} from 'react-hook-form';

export function Login(){

    interface LoginForm{
        email: string;
        password: string;
    }

    const {register, handleSubmit, formState: { errors, isSubmitted }} = useForm<LoginForm>({
        mode: 'onChange'
    })

    const onSubmit = (data: LoginForm) => {
        console.log(data)
    }

    const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
        <form noValidate onSubmit= {handleSubmit(onSubmit)}>
            <div className="form-floating m-2">
                <input 
                    type="text" 
                    id = "email-ctrl"
                    className = { (isSubmitted && errors.email && errors.email.type) ? "border border-danger form-control" : 'form-control'}
                    {...register('email',{required: true,pattern: EMAIL_REGEXP})}
                />
                 <label htmlFor="email-ctrl"
                 >Email address</label>
                 {isSubmitted && errors.email && errors.email.type === "required" && (
                    <span role="alert">This is required</span>
                )}
                {isSubmitted && errors.email && errors.email.type === "pattern" && (
                <span role="alert">This is not an email</span>
                )}
            </div>

           

            <div className="form-floating m-2">
                <input 
                    type="password" 
                    id = "password-ctrl"
                    className = { (isSubmitted && errors.password) ? "border border-danger form-control" : 'form-control'}
                    {...register('password',{required: true})}
                />
                <label htmlFor="password-ctrl">Password</label>
                {isSubmitted && errors.password && (
                    <span role="alert">This is required</span>
                )}
            </div>
            <button className="btn btn-primary">Login</button>
        </form>
    )
}