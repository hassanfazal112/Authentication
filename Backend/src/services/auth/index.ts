import { supabase } from '@/clients/supabase';
import HTTPException from '@/utils/helpers/http-exception';
import type {
  ISignupResponse,
  ISigninResponse,
  IForgotPasswordResponse,
  IResetPasswordResponse,
} from '@/types/interfaces/auth';

export const signup = async (
  name: string,
  email: string,
  password: string,
  phoneNumber?: string,
): Promise<ISignupResponse> => {
  try {
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone_number: phoneNumber,
        },
      },
    });

    if (error) {
      console.error('Supabase signup error:', error);
      throw HTTPException.badRequest(error.message);
    }

    if (!data.user) {
      throw HTTPException.badRequest('Failed to create user account');
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return {
        success: true,
        message:
          'User registered successfully. Please check your email for verification.',
        data: {
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || name,
            phoneNumber: data.user.user_metadata?.phone_number || phoneNumber,
          },
          session: {
            access_token: '',
            refresh_token: '',
          },
        },
      };
    }

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || name,
          phoneNumber: data.user.user_metadata?.phone_number || phoneNumber,
        },
        session: {
          access_token: data.session?.access_token || '',
          refresh_token: data.session?.refresh_token || '',
        },
      },
    };
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw HTTPException.internalServerError('Error during user registration');
  }
};

export const signin = async (
  email: string,
  password: string,
): Promise<ISigninResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw HTTPException.unauthorized('Invalid email or password');
      }
      throw HTTPException.badRequest(error.message);
    }

    if (!data.user || !data.session) {
      throw HTTPException.badRequest('Failed to sign in');
    }

    return {
      success: true,
      message: 'User signed in successfully',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || '',
          phoneNumber: data.user.user_metadata?.phone_number || '',
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        },
      },
    };
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw HTTPException.internalServerError('Error during sign in');
  }
};

export const forgotPassword = async (
  email: string,
): Promise<IForgotPasswordResponse> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.APP_BASE_URL}/reset-password`,
    });

    if (error) {
      // Supabase rate limits password reset requests to one every few seconds.
      // When hit, it returns a 400 with a message like:
      // "For security purposes, you can only request this after 3 seconds."
      // To avoid leaking rate-limit details and to provide a smoother UX,
      // we treat this as a successful request (idempotent behavior).
      if (
        error.message.includes(
          'For security purposes, you can only request this after',
        )
      ) {
        return {
          success: true,
          message: 'Password reset email sent successfully',
        };
      }
      throw HTTPException.badRequest(error.message);
    }

    return {
      success: true,
      message: 'Password reset email sent successfully',
    };
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw HTTPException.internalServerError(
      'Error sending password reset email',
    );
  }
};

export const resetPassword = async (
  _token: string,
  password: string,
): Promise<IResetPasswordResponse> => {
  try {
    // Update password
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      throw HTTPException.badRequest(error.message);
    }

    return {
      success: true,
      message: 'Password reset successfully',
    };
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw HTTPException.internalServerError('Error resetting password');
  }
};

export const signout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw HTTPException.badRequest(error.message);
    }

    return {
      success: true,
      message: 'User signed out successfully',
    };
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw HTTPException.internalServerError('Error during sign out');
  }
};
