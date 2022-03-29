import React, { useEffect, useState } from "react";
import supabase from "../../../client";
import { toast } from "react-toastify";

const AdminAddLanguages = (props) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [submitted, setSubmitted] = useState(false);
  // const [category, setCategories] = useState([]);
  const { category } = newCategory;

  // useEffect(() => {
  //   async function fetchAllCategories() {
  //     let { data } = await supabase.from("categories").select("*");
  //     console.log("language data", data);
  //     setCategories(data);
  //   }
  //   fetchAllCategories();
  // }, []);

  async function createCategory() {
    console.log("create category?", category);
    await supabase.from("categories").insert([newCategory]);

    // console.log("caategory data", data);
    // console.log("ERROR", error);
    //setNewCategory({ newCategory });
    //setCategories({ name: "" });
    setSubmitted(true);
    toast("New Category has been made");
  }

  const handleChange = (e) => {
    //if (e.target.name === "newCategory") {
    setNewCategory({
      ...newCategory,
      name: e.target.value,
    });
    // } else {

    //     setNewCategory((newCategory) => ({
    //       ...newCateogry,
    //       [e.target.name]: e.target.value,
    //     }));
    //   }

    console.log("handle change event", e);
    console.log("new category!!!!", newCategory);
    // if (e.target.name === "newCategory") {
    // setNewCategory({
    //   ...newCategory,
    //   name: e.target.value,
    // });

    console.log(newCategory);
    console.log("target name", e.target.name);
    //[e.target.name] = e.target.value;
  };

  // const handleSubmit = async (e) => {
  //   const { data, error } = await supabase.from("categories").insert([
  //     {
  //       //categoryId: category.id,
  //       name: category,
  //     },
  //   ]);
  //   setNewCategory(data);
  //   setSubmitted(true);
  //   console.log("ERROR", error);
  // };

  return (
    <div>
      <form autoComplete='off' className='new-language-form'>
        {submitted ? (
          <div className='success-message'>Category Has Been Added</div>
        ) : null}
        <div className='form-element'>
          <input
            is
            placeholder='New Category'
            value={category}
            // onChange={{(e) => setNewCategory({...newCategory, name: e.target.value})}
            onChange={handleChange}
            className='form-field'
            name='name'
            type='text'
            required
          />
          {/* <input
            placeholder='new category'
            value={category}
            onChange={(e) =>
              setNewCategory({ ...category, name: e.target.value })
            }
          /> */}
          <button className='post-button' onClick={createCategory}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AdminAddLanguages;
