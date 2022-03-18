import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY } from "./secret";

const supabase = createClient(
  "https://jijcgqxfmrfwzheifelg.supabase.co",
  SUPABASE_PUBLIC_KEY
);

export default supabase;
