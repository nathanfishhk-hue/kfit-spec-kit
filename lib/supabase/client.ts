import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'member' | 'admin' | 'trainer'
          membership_type: 'month_to_month' | '3_month' | '6_month' | '12_month' | null
          membership_start: string | null
          membership_end: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'member' | 'admin' | 'trainer'
          membership_type?: 'month_to_month' | '3_month' | '6_month' | '12_month' | null
          membership_start?: string | null
          membership_end?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'member' | 'admin' | 'trainer'
          membership_type?: 'month_to_month' | '3_month' | '6_month' | '12_month' | null
          membership_start?: string | null
          membership_end?: string | null
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          name: string
          description: string | null
          trainer_id: string
          trainer_name: string
          day_of_week: string
          start_time: string
          duration: number
          capacity: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          trainer_id: string
          trainer_name: string
          day_of_week: string
          start_time: string
          duration: number
          capacity: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          trainer_id?: string
          trainer_name?: string
          day_of_week?: string
          start_time?: string
          duration?: number
          capacity?: number
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          class_id: string
          booking_date: string
          status: 'booked' | 'cancelled' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          class_id: string
          booking_date: string
          status?: 'booked' | 'cancelled' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          class_id?: string
          booking_date?: string
          status?: 'booked' | 'cancelled' | 'completed'
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          amount: number
          payment_method: string
          status: 'pending' | 'completed' | 'failed'
          payfast_payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          payment_method: string
          status?: 'pending' | 'completed' | 'failed'
          payfast_payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          payment_method?: string
          status?: 'pending' | 'completed' | 'failed'
          payfast_payment_id?: string | null
          created_at?: string
        }
      }
    }
  }
}