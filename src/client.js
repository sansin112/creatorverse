import { createClient } from '@supabase/supabase-js'

const URL = 'https://biqbpwudnxpakoeqrgnk.supabase.co'
const API_KEY = 'sb_publishable_Y0WMM99QAHpqJ1K6mCW8Pg_Axjcu7Wk'

export const supabase = createClient(URL, API_KEY)