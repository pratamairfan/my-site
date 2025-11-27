# 🔐 Better-Auth Demo

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)

A modern, comprehensive demonstration of authentication patterns using **Better-Auth** with Next.js 15. This project showcases a robust authentication flow including social providers, email/password login, and protected routes, all wrapped in a beautiful, responsive UI.

## ✨ Features

- **Social Authentication**: Seamless integration with Google and GitHub.
- **Email & Password**: Secure traditional login with hashing and verification.
- **Protected Routes**: Middleware-protected dashboard access.
- **Interactive Dashboard**: User dashboard featuring dynamic maps using React Leaflet.
- **Modern UI/UX**: Built with Radix UI and Tailwind CSS for a premium feel.
- **Type-Safe**: Full TypeScript support across the entire stack.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) & [Prisma ORM](https://www.prisma.io/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/my-site.git
    cd my-site
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and add your credentials:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    BETTER_AUTH_SECRET="your-secret-key"
    GITHUB_CLIENT_ID="your-github-client-id"
    GITHUB_CLIENT_SECRET="your-github-client-secret"
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Setup Database**
    Generate Prisma client and push the schema to your database:

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── app/                  # Next.js App Router directories
│   ├── (root)/           # Protected routes (Dashboard)
│   ├── auth/             # Authentication pages
│   ├── components/       # Shared UI components
│   └── api/              # API routes
├── components/           # Global UI components (shadcn/ui)
├── lib/                  # Utilities and configurations (Prisma, Auth)
├── prisma/               # Database schema
└── public/               # Static assets
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
