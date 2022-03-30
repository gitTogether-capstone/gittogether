import React, { useEffect, useState } from "react";
import supabase from "../../../client";
import { toast } from "react-toastify";
import "./AdminAddCategory.css";

const AdminAddLanguages = (props) => {
  const [newCategory, setNewCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createCategory = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("categories").insert([
      {
        name: newCategory,
      },
    ]);

    setNewCategory("");
    setSubmitted(true);
    toast("New Category has been added.");
  };

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={createCategory}
        autoComplete='off'
        className='new-language-form'
      >
        {submitted ? (
          <div className='success-message'>Category Has Been Added</div>
        ) : null}
        <div className='form-element'>
          <input
            placeholder='New Category'
            value={newCategory}
            onChange={handleChange}
            name='newCategory'
            type='text'
            required
          />
          <button
            type='submit'
            id='submit-button'
            className='create-category-button'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AdminAddLanguages;
