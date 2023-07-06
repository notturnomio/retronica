import Heading from 'components/ui/Heading';
import Loader from 'components/ui/Loader';
import Meta from 'components/ui/Meta';
import Button from 'components/ui/button/Button';
import Field from 'components/ui/input/Field';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import { useAuthRedirect } from 'hooks/useAuthRedirect';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IEmailPassword } from 'store/user/user.interface';
import { validEmail } from './auth-validation';

const Auth: FC = () => {
  const { isLoading } = useAuth();
  const { login, register } = useActions();
  const [type, setType] = useState<'login' | 'register'>('login');

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IEmailPassword>({
    mode: 'onChange'
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit: SubmitHandler<IEmailPassword> = data => {
    type === 'login' ? login(data) : register(data);

    reset();
  };

  useAuthRedirect();

  return (
    <Meta title="Authentication">
      <section className="flex h-screen items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto w-[400px] rounded-lg bg-white p-8 shadow-md"
        >
          <Heading className="mb-4 text-center capitalize">{type}</Heading>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Field
                label="E-mail"
                placeholder="Your e-mail"
                error={errors.email?.message}
                {...formRegister('email', {
                  required: 'Email is required',
                  pattern: {
                    value: validEmail,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              <div className="d-flex relative">
                <Field
                  label="Password"
                  placeholder="Your password"
                  error={errors.password?.message}
                  type={passwordShown ? 'text' : 'password'}
                  {...formRegister('password', {
                    required: 'Password is required',
                    min: {
                      value: 6,
                      message: 'Minimum length should be more than 8 symbols'
                    }
                    // pattern: {
                    //   value: validPassword,
                    //   message:
                    //     'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character'
                    // }
                  })}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className="absolute right-[20px] top-[45px]"
                >
                  {'*'}
                </i>{' '}
              </div>
              <div className="mt-3 flex justify-end gap-6">
                <Button
                  type="button"
                  onClick={() => {
                    setType(type === 'login' ? 'register' : 'login');
                  }}
                  className="mt-3 px-0 py-0  shadow-none"
                  theme="white"
                >
                  {type === 'login' ? 'Register' : 'Sign In'}
                </Button>
                <Button type="submit" className="mt-3" theme="yellow">
                  {type === 'login' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </>
          )}
        </form>
      </section>
    </Meta>
  );
};

export default Auth;
