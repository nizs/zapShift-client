import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Logo from "../../Components/Logo";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Signin = () => {
    const {signIn} = useAuth();
    const [fireaseError, setFirebaseError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formData = async (data) => {
        try {
            setFirebaseError(""); // reset error

            const result = await signIn(data.email, data.password);
            const user = result.user;

            console.log(user);

            // ✅ only navigate if success
            navigate('/');

        } catch (error) {
            console.error(error.message);

            if (error.code === "auth/invalid-credential") {
                setFirebaseError("invalid-credential. Email/password didn't match.");
            } else {
                setFirebaseError("Something went wrong. Try again.");
            }
        }
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
                <form onSubmit={handleSubmit(formData)}>

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
                    <Link to="/register" className="text-accent underline">
                        Register
                    </Link>
                </p>

                {/* OR */}
                <div className="divider">OR</div>

                {/* Google Button */}
                <button className="btn w-full flex items-center gap-2">
                    <FaGoogle /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Signin;