import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import FacilityConstants from "../../utilities/constants/FacilityConstants";
import UserProfileImage from "./UserProfileImage";
import { useUser } from "../user/UserProvider";
import { updateUser } from "../user/userService";
import { BIRTH_DATE } from "../../utilities/constants/Regex";
import {
  isDateInThePast,
  isDateStringValid,
} from "../../utilities/functions/Helpers";
import { ToastContainer } from "react-toastify";

const schema = object().shape({
  id: string().notRequired(),
  userId: string().required(),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email("Invalid email format.").required("Email is required"),
  phone: string().required("Phone is required"),
  username: string().required("Username is required"),
  gender: string().notRequired(),
  dateOfBirth: string()
    .test(
      "has-right-format",
      "Date must be formatted as 'mm-dd-yyyy'",
      (value) => BIRTH_DATE.test(value)
    )
    .test("is-date-in-the-past", "Date must be in the past", (value) =>
      isDateInThePast(value)
    )
    .test("is-a-valid-date", "Date must be a valid date", (value) =>
      isDateStringValid(value)
    )
    .required("Date of birth is required"),
  street: string().required("Street is required"),
  city: string().required("City is required"),
  state: string().required("State is required"),
  zipCode: string().required("Zip is required"),
});

const UserProfile = () => {
  const { userProfile, setUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setApiError] = useState(false);
  const usStates = Object.keys(FacilityConstants.STATES);
  const genders = Object.values(FacilityConstants.GENDERS);

  const {
    control,
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: userProfile.id,
      userId: userProfile.userId,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      username: userProfile.username,
      gender: userProfile.gender,
      dateOfBirth: userProfile.dateOfBirth,
      street: userProfile.street,
      city: userProfile.city,
      state: userProfile.state,
      zipCode: userProfile.zipCode,
    },
  });

  const onSubmit = async (data) => {
    await updateUser(data, setUserProfile, setApiError);
    if (apiError) {
      return;
    } else {
      setIsEditing(false);
    }
  };

  const toggleEditing = () => {
    isEditing && reset();
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (userProfile) {
      setValue("id", userProfile.id);
      setValue("userId", userProfile.userId);
      setValue("firstName", userProfile.firstName);
      setValue("lastName", userProfile.lastName);
      setValue("email", userProfile.email);
      setValue("phone", userProfile.phone);
      setValue("username", userProfile.username);
      setValue("gender", userProfile?.gender ?? "");
      setValue("dateOfBirth", userProfile.dateOfBirth);
      setValue("street", userProfile.street);
      setValue("city", userProfile.city);
      setValue("state", userProfile?.state ?? "");
      setValue("zipCode", userProfile.zipCode);
    }
  }, [userProfile, setValue]);

  return (
    <div className="container my-2">
      <div className="flex flex-col items-center justify-center">
        <UserProfileImage
          imageUri={userProfile?.userMedia?.mediaUrl}
          userFullName={`${userProfile.firstName} ${userProfile.lastName}`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 my-8 w-full mx-auto"
        >
          <div className="flex flex-col justify-around space-y-8 my-8 md:space-y-0 md:my-0 md:flex-row">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                {...register("firstName")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.firstName ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                {...register("lastName")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.lastName ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-around space-y-8 my-8 md:space-y-0 md:my-0  md:flex-row">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.email ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                placeholder={isEditing ? "123-456-7890" : ""}
                {...register("phone")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.phone ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-around space-y-8 my-8 md:space-y-0 md:my-0  md:flex-row">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of birth
              </label>
              <input
                placeholder={isEditing ? "mm-dd-yyyy" : ""}
                {...register("dateOfBirth")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.dateOfBirth ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              {isEditing ? (
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <select
                      className={`w-full md:w-[13.2rem] h-[2.6rem] mt-1 py-2 px-3 border border-gray-300 rounded-md ${
                        errors.gender ? "border-red-500" : ""
                      }`}
                      id="gender"
                      {...field}
                      disabled={!isEditing}
                    >
                      <option value="">Select your Gender</option>
                      {genders.map((selectedGender, index) => (
                        <option
                          key={`gender-${index}`}
                          value={selectedGender}
                        >{`${selectedGender}`}</option>
                      ))}
                    </select>
                  )}
                />
              ) : (
                <input
                  {...register("gender")}
                  className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                    errors.gender ? " border-red-500" : ""
                  }`}
                  disabled={!isEditing}
                />
              )}
              {errors.gender && <p className="">{errors.gender.message}</p>}
            </div>
          </div>

          <div className="flex flex-col justify-around space-y-8 my-8 md:space-y-0 md:my-0  md:flex-row">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                placeholder={isEditing ? "123 Main St" : ""}
                {...register("street")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.street ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.street && (
                <p className="text-red-500 text-xs">{errors.street.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                {...register("city")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.city ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-around space-y-8 my-8 md:space-y-0 md:my-0 md:flex-row">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              {isEditing ? (
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <select
                      className={`w-full md:w-[13.2rem] h-[2.6rem] mt-1 py-2 px-3 border border-gray-300 rounded-md ${
                        errors.state ? "border-red-500" : ""
                      }`}
                      id="eventType"
                      {...field}
                      disabled={!isEditing}
                    >
                      <option value="">Select your State</option>
                      {usStates.map((stateSelected, index) => (
                        <option
                          key={`state-${index}`}
                          value={stateSelected}
                        >{`${stateSelected}`}</option>
                      ))}
                    </select>
                  )}
                />
              ) : (
                <input
                  {...register("state")}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {errors.state && (
                <p className="text-red-500 text-xs">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                placeholder={isEditing ? "12345" : ""}
                {...register("zipCode")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md ${
                  errors.city ? " border-red-500" : ""
                }`}
                disabled={!isEditing}
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full">
            <div className="flex flex-col w-full justify-center space-y-4 md:flex-row md:space-x-12 md:space-y-0 ">
              <button
                type="button"
                onClick={toggleEditing}
                className={`px-4 py-2 ${
                  isEditing
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white rounded w-full md:w-1/3 font-bold`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full md:w-1/3 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded md:ml-4"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
