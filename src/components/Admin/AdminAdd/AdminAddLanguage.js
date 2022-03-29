import React, { useEffect, useState } from "react";
import supabase from "../../../client";

const AdminAddLanguages = (props) => {
  const [newCategory, setNewCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategories] = useState([]);

  useEffect(() => {
    async function fetchAllCategories() {
      let { data } = await supabase.from("categories").select("*");
      console.log("language data", data);
      setCategories(data);
    }
    fetchAllCategories();
  }, []);

  async function createCategory() {
    console.log("wtf");
    const { data, error } = await supabase.from("categories").insert([
      {
        name: newCategory.name,
      },
    ]);
    console.log("caategory data", data);
    console.log("ERROR", error);
    setNewCategory("");
    setSubmitted(true);
  }

  const handleChange = (e) => {
    setNewCategory(e.target.value);
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

  console.log("submitted", submitted);
  console.log("Category", newCategory);
  return (
    <div>
      <form autoComplete='off' className='new-language-form'>
        {submitted ? (
          <div className='success-message'>Category Has Been Added</div>
        ) : null}
        <div className='form-element'>
          <label>Category</label>
          <input
            placeholder='New Category'
            value={newCategory.name}
            // onChange={{(e) => setNewCategory({...newCategory, name: e.target.value})}
            onChange={handleChange}
            name='newCategory'
            type='text'
            required
          />
          <button onClick={createCategory}>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AdminAddLanguages;
