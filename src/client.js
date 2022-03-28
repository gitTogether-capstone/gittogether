import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "./secret.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

export default supabase;
