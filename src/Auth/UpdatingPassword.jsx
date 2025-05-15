import { useParams } from "react-router-dom";
import { BASE_URL } from "../utilis/constant";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const UpdatingPassword = () => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const [matchedPassword, setMatchedPassword] = useState({
    error: false,
    message: null,
  });

  const { token } = useParams();

  const password = watch("password");
  const secondPassword = watch("secondPassword");

  useEffect(() => {
    if (matchedPassword.error && password === secondPassword) {
      setMatchedPassword({ error: false, message: null });
    }
  }, [password, secondPassword]);

  const handleUpdatePassword = async (data) => {
    if (data.password !== data.secondPassword) {
      return setMatchedPassword({
        error: true,
        message: "Both passwords have to match",
      });
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: data.password }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      alert("Password updated successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')]">
      <div className="card bg-[rgba(0,0,0,0.7)] w-96 shadow-xl text-white">
        <div className="card-body">
          <form
            noValidate
            onSubmit={handleSubmit(handleUpdatePassword)}
            className="flex flex-col"
          >
            <h2 className="font-bold text-[2rem] mb-4">
              Enter your new password
            </h2>

            <input
              type="password"
              placeholder="Password"
              className="bg-transparent border p-1.5 rounded-md"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include a letter, a digit, and a special character.",
                },
              })}
            />
            {errors?.password && (
              <p className="text-red-500">{errors?.password?.message}</p>
            )}

            <input
              type="password"
              placeholder="Re-enter Password"
              className="bg-transparent border p-1.5 rounded-md my-3"
              {...register("secondPassword", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include a letter, a digit, and a special character.",
                },
              })}
            />
            {errors?.secondPassword && (
              <p className="text-red-500">
                {errors?.secondPassword?.message}
              </p>
            )}

           

            <button
              type="submit"
              className="bg-[#E50914] p-2 rounded-md mt-8 cursor-pointer w-full"
            >
              Update Password
            </button>
            {matchedPassword.error && (
              <p className="text-red-500 my-1">{matchedPassword.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatingPassword;
