// src/services/authServices.js
import { supabase } from "../backend/supabaseClient";

// Registers user with email and password, and stores additional user info in 'profiles' table
export const registerUser = async ({ email, password, username, role, organization }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, role, organization }
    }
  });

  if (error) throw error;

  // Optionally insert into a custom table
  const profileInsert = await supabase.from("profiles").insert([
    {
      id: data.user.id,
      email,
      username,
      role,
      organization: organization || null
    }
  ]);

  if (profileInsert.error) throw profileInsert.error;

  return data;
};
