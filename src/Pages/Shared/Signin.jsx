import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../../Components/SocialLogin";
import toast from "react-hot-toast";

const Signin = () => {
    const { signInUser } = useAuth();
    const [fireaseError, setFirebaseError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        setFirebaseError(""); // reset error
        signInUser(data.email, data.password)
            .then((result) => {
                console.log(result.user)
                toast.success('Successfully LoggedIn!')
                // redirecting user where they tried to went 
                setTimeout(() => {
                    navigate(location?.state || '/');
                }, 1000);
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mx-4">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Signin with ZapShift
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(handleLogin)}>

                    {/* Email */}
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Signin Button */}
                    <button className="btn bg-primary text-black w-full mb-4">
                        Signin
                    </button>
                    <p className='text-red-500 mb-2 text-center'>{fireaseError}</p>
                </form>

                {/* Redirect */}
                <p className="text-center text-sm mb-4">
                    Don’t have any account?{" "}
                    <Link
                        state={location?.state}
                        to="/register"
                        className="text-accent underline">
                        Register
                    </Link>
                </p>

                {/* OR */}
                <div className="divider">OR</div>

                {/* Google Button */}
                <SocialLogin />
            </div>
        </div>
    );
};

export default Signin;