import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

// Styles
import "./search-form.scss";

interface Props {
  onSubmit: (data: any) => void;
}

const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("Error::", errors);
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="search-form"
    >
      <input
        type="text"
        placeholder="Search"
        {...register("searchTerm", { required: true, maxLength: 100 })}
      />
    </form>
  );
};

export default SearchForm;
