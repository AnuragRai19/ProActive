import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yibhepghapfxjjbddpoe.supabase.co";

const supabaseKey = "sb_publishable_JvuOfTdlWJ3T7tOc8TVw6Q_PHaI2ZwS";

export const supabase = createClient(supabaseUrl, supabaseKey);
