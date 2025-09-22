# 🚀 Backend Setup Instructions

## ⚠️ **IMPORTANT: Environment Variables Required**

Your backend is failing to start because the Supabase environment variables are not configured. Follow these steps to fix this:

## 1. Create Environment Variables File

Create a `.env` file in your project root directory with the following content:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
APP_BASE_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

## 2. Get Your Supabase Credentials

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `your-project-name`
   - **Database Password**: `create-a-strong-password`
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

### Step 2: Get Your Project Credentials

1. Once your project is created, go to the project dashboard
2. Click on **"Settings"** in the left sidebar
3. Click on **"API"** in the settings menu
4. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### Step 3: Update Your .env File

Replace the placeholder values in your `.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
APP_BASE_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-anon-key
```

## 3. Install Dependencies and Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## 4. Test Your Setup

Once your server is running, you can test the authentication endpoints:

### Signup

```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "phoneNumber": "+1234567890"
  }'
```

### Signin

```bash
curl -X POST http://localhost:5000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

## 5. Configure Supabase Authentication Settings

In your Supabase dashboard:

1. Go to **Authentication** → **Settings**
2. Set **Site URL** to: `http://localhost:3000` (or your frontend URL)
3. Add **Redirect URLs**: `http://localhost:3000`
4. Configure email templates if needed

## 🔧 **Troubleshooting**

### Error: "SUPABASE_URL environment variable is required"

- Make sure you have created a `.env` file in your project root
- Check that the `.env` file contains the correct Supabase URL and key
- Restart your development server after adding environment variables

### Error: "Invalid API key"

- Double-check your Supabase key in the `.env` file
- Make sure you're using the "anon public" key, not the service role key

### CORS Issues

- Add your frontend URL to Supabase redirect URLs
- Make sure your frontend URL matches the APP_BASE_URL in your `.env` file

## 📚 **API Endpoints Available**

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| POST   | `/api/v1/auth/signup`          | User registration         |
| POST   | `/api/v1/auth/signin`          | User login                |
| POST   | `/api/v1/auth/forgot-password` | Send password reset email |
| POST   | `/api/v1/auth/reset-password`  | Reset password with token |
| POST   | `/api/v1/auth/signout`         | User logout               |

## 🎯 **Next Steps**

1. Set up your Supabase project
2. Configure your `.env` file with the correct credentials
3. Start your development server
4. Test the authentication endpoints
5. Integrate with your frontend application

Your authentication system is ready to use! 🎉
