# AI Job Tracker Frontend

A modern job application tracking frontend built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **React Query**.

This application allows users to manage job applications on a Kanban board, use AI to parse job descriptions, and generate tailored resume suggestions.

---

## Features

- User authentication with login and register flow
- Protected dashboard routes
- Kanban board for tracking applications
- Create, edit, view, and delete job applications
- AI-powered job description parsing
- AI-generated resume bullet point suggestions
- Persistent auth state using Zustand
- Server state management using React Query
- Clean and reusable component-based architecture
- Responsive UI with Tailwind CSS

---

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Global UI State:** Zustand
- **Server State:** React Query
- **HTTP Client:** Axios
- **Notifications:** Sonner
- **Drag and Drop:** `@dnd-kit`
- **Forms:** React Hook Form
- **Icons:** Lucide React

---

## Project Structure

```txt
web/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── applications/
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   ├── board/
│   │   └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ai/
│   ├── applications/
│   ├── auth/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── api/
│   ├── constants.ts
│   ├── query-client.ts
│   ├── utils.ts
│   └── validations.ts
│
├── providers/
├── stores/
├── types/
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── package.json
```
##Setup Instructions
 - Clone the project 
    ```bash
        git clone <your-frontend-repo-url>
        cd web
    ```
 - Install dependencies
    ```bash
         npm install
    ```
 - Create environment file
    
     ```bash
          NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
     ```
 - Run the project
    ```bash
       npm run dev
    ```
 - Frontend will run on:
    ```bash
       http://localhost:3000
    ```
 - Production build
    ```bash
       npm run build
       npm run start
    ```
