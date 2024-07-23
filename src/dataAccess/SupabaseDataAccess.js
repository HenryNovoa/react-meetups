import { createClient } from '@supabase/supabase-js'
import { DataAccessInterface } from './DataAccess'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

class SupabaseDataAccess extends DataAccessInterface {
    constructor(url, key) {
        super()
        this.client = createClient(url, key)
    }

    async getAll(table) {
        let { data, error } = await this.client.from(table).select().order('id')
        if (error) throw error
        return data
    }

    async update(table, id, updates) {
        let { data, error } = await this.client.from(table).update(updates).eq('id', id).select()
        if (error) throw error
        return data[0]
    }

}

export const dataAccess = new SupabaseDataAccess(supabaseUrl, supabaseAnonKey)