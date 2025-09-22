# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `your-project-name`
   - Database Password: `create-a-strong-password`
   - Region: Choose the closest region to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Once your project is created, go to the project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" in the settings menu
4. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## 3. Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
APP_BASE_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

Replace the placeholder values with your actual Supabase credentials.

## 4. Configure Authentication Settings

1. In your Supabase dashboard, go to "Authentication" > "Settings"
2. Configure the following settings:

### Site URL

- Set to your frontend URL (e.g., `http://localhost:3000` for development)

### Redirect URLs

- Add your frontend URL for redirects after authentication
- For development: `http://localhost:3000`
- For production: `https://yourdomain.com`

### Email Templates (Optional)

- Customize email templates for password reset, email confirmation, etc.

## 5. Database Setup

The authentication system will automatically create the necessary tables in Supabase. No additional database setup is required for basic authentication.

## 6. Test Your Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Test the authentication endpoints:
   - POST `/api/v1/auth/signup`
   - POST `/api/v1/auth/signin`
   - POST `/api/v1/auth/forgot-password`
   - POST `/api/v1/auth/reset-password`
   - POST `/api/v1/auth/signout`

## API Endpoints

### Signup

```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phoneNumber": "+1234567890"
}
```

### Signin

```bash
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Forgot Password

```bash
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Reset Password

```bash
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "password": "NewSecurePass123!"
}
```

### Signout

```bash
POST /api/v1/auth/signout
```

## Security Notes

1. **Environment Variables**: Never commit your `.env` file to version control
2. **API Keys**: Keep your Supabase keys secure and rotate them regularly
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: The API includes rate limiting to prevent abuse
5. **Password Requirements**: Passwords must be at least 8 characters with uppercase, lowercase, numbers, and special characters

## Troubleshooting

### Common Issues

1. **Invalid Supabase URL/Key**: Double-check your environment variables
2. **CORS Issues**: Ensure your frontend URL is added to Supabase redirect URLs
3. **Email Not Sending**: Check Supabase email settings and SMTP configuration
4. **Token Issues**: Ensure tokens are properly handled in your frontend

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
