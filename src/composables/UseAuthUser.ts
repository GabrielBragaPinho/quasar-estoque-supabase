import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'
import { User, Provider } from '@supabase/supabase-js'


const user = ref<User | null>(null)
export default function useAuthUser () {
    const { supabase } = useSupabase()

    const login = async ({ email, password }: { email: string; password: string }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data.user
    }

    const loginWithSocialProvider = async (provider: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider })
        if (error) throw error
        return data
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    const isLoggedIn = () => {
        return !!user.value
    }

    type RegisterPayload = {
        email: string
        password: string
        name: string
        [key: string]: any // para aceitar `...meta`
    }
    const register = async ({ email, password, name, ...meta }: RegisterPayload) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password ,
            options: {
                data: { name, ...meta },
                emailRedirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
            }
        })
        if (error) throw error
        return data.user
    }
    const update = async (userData) => {
        const { data, error } = await supabase.auth.updateUser(userData)
        if (error) throw error
        return data.user
    }

    const sendPasswordRestEmail = async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
        return data
    }

    const resetPassword = async (accessToken: string, newPassword: string) => {
        const { user, error } = await supabase.auth.updateUser(
            { password: newPassword }
        )
        if (error) { throw error }

        return user
    }

    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordRestEmail,
        resetPassword
    }
}