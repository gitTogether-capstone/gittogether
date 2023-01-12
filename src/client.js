import { createClient } from "@supabase/supabase-js";
const { REACT_APP_SUPABASE_PUBLIC_KEY, REACT_APP_SUPABASE_URL } = process.env;

console.log(process.env);

const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_PUBLIC_KEY
);

export default supabase;
