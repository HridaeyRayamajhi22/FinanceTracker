import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authLayout.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/layouts/inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // TODO: Add validation + API logic
  };

  return (
    <div>
      <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join us today by entering your details below.
          </p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Alex Khan"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Alex@gmail.com"
              type="text"
            />

            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>
        </form>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
