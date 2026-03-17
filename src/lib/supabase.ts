import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vrxhwgwntujvjessumzx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyeGh3Z3dudHVqdmplc3N1bXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTQ5NDksImV4cCI6MjA4OTMzMDk0OX0.YbqyZBooZBWXlsD1yk71cbENOG2fwMl6N2_8znd88YE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
