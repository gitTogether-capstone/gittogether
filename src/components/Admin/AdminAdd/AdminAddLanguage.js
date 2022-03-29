import React, { useEffect, useState } from "react";
import supabase from "../../../client";

const AdminAddLanguages = (props) => {
  const [newLanguage, setNewLanguage] = useState({
    name: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [languages, setlanguages] = useState([]);

  useEffect(() => {
    async function fetchAllLanguages() {
      let { data } = await supabase.from("languages").select("*");
      console.log("language data", data);
      setlanguages(data);
    }
    fetchAllLanguages();
    setNewLanguage();
  }, []);

  const fetchAllLanguages = async () => {
    let { data } = await supabase.from("languages").select("*");
    console.log("language data", data);
    setlanguages(data);
  };
  const handleChange = (e) => {
    setNewLanguage((newLanguage) => ({
      ...newLanguage,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    await supabase
      .from("languages")
      .insert([{ languageId: languages.id, name: "name" }]);
    //setNewLanguage({ name: "" });
    setSubmitted(true);
  };

  console.log("submitted", submitted);
  console.log("languages", newLanguage);
  
  return (
    <div>
      <form autoComplete='off' className='new-language-form'>
        {submitted ? (
          <div className='success-message'>Language Has Been Added</div>
        ) : null}
        <div className='form-element'>
          <label>Language</label>
          <input
            placeholder='New Language'
            onChange={handleChange}
            className='form-field'
            name='name'
            type='text'
            required
          />
          <button type='submit' onSubmit={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AdminAddLanguages;
