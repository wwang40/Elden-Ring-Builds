import { createClient } from "@supabase/supabase-js";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heHRjYWRzdnpoZ2Zxbm9tdGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNzkyODgsImV4cCI6MjA2MDk1NTI4OH0.UKdSl4VM_NrAJ5uauROmE1cNlNyH2VRmOAQqe6_dbmw"
const URL = "https://naxtcadsvzhgfqnomtfy.supabase.co"

const supabase = createClient(URL, API_KEY);
export default supabase;