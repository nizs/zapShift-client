import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SocialLogin from "../../Components/SocialLogin";
import toast from "react-hot-toast";


const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();
    const [fireaseError, setFirebaseError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleRegistration = (data) => {
        setFirebaseError("");

        console.log("FORM STARTED");
        const profileImage = data.photo[0]; // having our photo 

        // 1️⃣ Create user
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)

                //Preparing form data for imgBB
                const formData = new FormData();
                formData.append('image', profileImage);
                //Upload to imgBB using Axios
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        console.log('after image upload', res.data.data.display_url)

                        // 3️⃣ Update user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.display_url
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated');
                                toast.success('Successfully LoggedIn!')
                                // redirecting user where they tried to went 
                                setTimeout(() => {
                                    navigate(location?.state || '/');
                                }, 1000);
                            })
                            .catch(error => console.log(error))
                    })

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
                    Create an Account
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Register with ZapShift
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(handleRegistration)}>

                    {/* 🔥 Clickable User Image Upload */}
                    <div className="mb-4">
                        <input
                            type="file"
                            placeholder="Upload Your user photo"
                            className="file-input input-bordered w-full"
                            {...register("photo", {
                                required: "User Photo is required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.photo.message}
                            </p>
                        )}
                    </div>

                    {/* Error Message */}
                    {errors.image && (
                        <p className="text-red-500 text-sm text-center mb-2">
                            {errors.image.message}
                        </p>
                    )}
                    {/* Name */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered w-full"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Maximum 20 characters allowed",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z]).*$/,
                                    message: "Must include at least one capital letter",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button className="btn bg-primary text-black w-full mb-4">
                        Register
                    </button>
                    <p className='text-red-500 mb-2 text-center'>{fireaseError}</p>
                </form>

                {/* Redirect */}
                <p className="text-center text-sm mb-4">
                    Already have an account?{" "}
                    <Link
                        state={location?.state}
                        to="/signin"
                        className="text-accent underline">
                        Signin
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

export default Register;