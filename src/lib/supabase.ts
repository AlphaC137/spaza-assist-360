import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://znvbqaywbqhoetshlzrs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudmJxYXl3YnFob2V0c2hsenJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MjM0MTgsImV4cCI6MjAyMzM5OTQxOH0.hqHE8cqdZWJzL5Gg6FNpZHqkJqYZXWaRYKYDRyr_0Eo';

export const supabase = createClient(supabaseUrl, supabaseKey);