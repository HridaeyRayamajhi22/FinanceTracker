import React, { useState } from "react";
import AuthLayout from "../../components/layouts/authLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layouts/inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/layouts/inputs/ProfilePhotoSelector.jsx";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null)

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");
    // TODO: API call
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        {/* Header */}
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5">


          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Password */}
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
          />

          {/* Error */}
          {error && <p className="text-red-500 text-xs">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary cursor-pointer w-full py-2 font-medium"
          >
            SIGN UP
          </button>

          {/* Footer */}
          <p className="text-[13px] text-slate-800 text-center">
            Already have an account?{" "}
            <Link className="font-medium text-primary" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
