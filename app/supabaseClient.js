import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqsinsnmenqhxjmwvish.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxc2luc25tZW5xaHhqbXd2aXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1ODc5MjAsImV4cCI6MjA1NTE2MzkyMH0.Wtz6PXC6z4tQoA67GNV3BIkdA58KPwIHOt37vky6uOA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
