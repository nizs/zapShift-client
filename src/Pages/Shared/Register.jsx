import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaUserCircle, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    const formData = async (data) => {
        try {
            console.log("Register Data:", data);
            // 🔥 later: firebase createUser
        } catch (error) {
            console.error(error);
        }
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
                <form onSubmit={handleSubmit(formData)}>

                    {/* 🔥 Clickable User Image Upload */}
                    <div className="flex justify-center mb-4">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...register("image", {
                                    required: "Profile image is required",
                                })}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImagePreview(URL.createObjectURL(file));
                                    }
                                }}
                            />

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-18 h-18 rounded-full object-cover border-2 border-primary"
                                />
                            ) : (
                                <div className="text-primary text-6xl">
                                    <FaCloudUploadAlt  />
                                </div>
                            )}
                        </label>
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
                </form>

                {/* Redirect */}
                <p className="text-center text-sm mb-4">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-accent underline">
                        Signin
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

export default Register;