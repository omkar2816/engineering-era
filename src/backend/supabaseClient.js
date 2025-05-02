// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sbkeyhdfbzxdadjywjgy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNia2V5aGRmYnp4ZGFkanl3amd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NzcwMzYsImV4cCI6MjA2MTM1MzAzNn0.4HGtCdUJ7HfkZOjYqmqjnzCdD3KgoA41VjqKmHR-R5U";

export const supabase = createClient(supabaseUrl, supabaseKey);
