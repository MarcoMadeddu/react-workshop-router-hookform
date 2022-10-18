import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface RegisterForm {
  email: string;
  password: string;
  passwordRepeat: string;
}

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function Register() {

  const { register, handleSubmit, formState: { errors, isSubmitted, isValid, isValidating }, getValues, trigger, watch } = useForm<RegisterForm>({
    mode: 'onChange'
  });

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'password') trigger('passwordRepeat')
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  }

  const validateEmail = (email: string) => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((users: Array<{ email: string }>) => {
        const emails = users.map(u => u.email);
        return !emails.includes(email);
      })
  }

  return <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div className="form-floating m-2">
      <input
        id="email-ctrl"
        type="email"
        className="form-control"
        {...register('email', {
          required: true,
          pattern: EMAIL_REGEXP,
          validate: validateEmail
        })}
      />
      <label htmlFor="email-ctrl">Email address</label>
      {isSubmitted && errors.email && errors.email.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {isSubmitted && errors.email && errors.email.type === "pattern" && (
        <span role="alert">This is not an email</span>
      )}
      {isSubmitted && errors.email && errors.email.type === "validate" && (
        <span role="alert">This email already exists</span>
      )}
    </div>
    <div className="form-floating m-2">
      <input
        id="password-ctrl"
        type="password"
        className="form-control"
        {...register('password', { required: true })}
      />
      <label htmlFor="password-ctrl">Password</label>
      {isSubmitted && errors.password && (
        <span role="alert">This is required</span>
      )}
    </div>
    <div className="form-floating m-2">
      <input
        id="password-repeat-ctrl"
        type="password"
        className="form-control"
        {...register('passwordRepeat', {
          required: true,
          validate: () => getValues('password') === getValues('passwordRepeat')
        })}
      />
      <label htmlFor="password-repeat-ctrl">Repeat password</label>
      {isSubmitted && errors.passwordRepeat?.type === 'required' && (
        <span role="alert">This is required</span>
      )}
      {isSubmitted && errors.passwordRepeat?.type === 'validate' && (
        <span role="alert">Passwords don't match</span>
      )}
    </div>
    <button className="btn btn-primary" disabled={isSubmitted && (!isValid || isValidating)}>Register</button>
  </form>
}