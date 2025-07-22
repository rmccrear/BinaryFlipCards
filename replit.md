# Binary Game Application

## Overview

This is a full-stack web application built as an interactive binary number learning game. The application teaches users how binary numbers work through a card-flipping game where players match decimal target numbers by selecting the correct combination of binary place values (powers of 2).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks (useState, useEffect) for local component state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Pattern**: RESTful API structure (routes prefixed with /api)
- **Development Setup**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema**: Centralized schema definition in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Development Storage**: In-memory storage implementation for development/testing

## Key Components

### Game Logic Components
- **BinaryCard**: Interactive cards representing binary place values (8, 4, 2, 1)
- **GameControls**: Difficulty selection, target generation, and game state management
- **LearningInfo**: Educational content explaining binary number concepts

### UI Framework
- **shadcn/ui**: Comprehensive React component library built on Radix UI
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Built-in theme switching capability

### Development Tools
- **TypeScript**: Full type safety across client, server, and shared code
- **Path Aliases**: Simplified imports using @ prefixes for clean code organization
- **ESBuild**: Production bundling for server-side code

## Data Flow

1. **Game Initialization**: User selects difficulty level (beginner/intermediate/advanced)
2. **Target Generation**: Random decimal number generated based on difficulty range
3. **User Interaction**: Player flips binary cards to create combinations
4. **Real-time Validation**: Current total calculated and compared to target
5. **Feedback System**: Visual and textual feedback for correct/incorrect attempts
6. **Score Tracking**: Game state maintains score and progress

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Extensible Design**: Schema ready for additional game features like score tracking, progress saving

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Headless UI primitives for accessible components
- **@hookform/resolvers**: Form validation integration
- **class-variance-authority**: Type-safe CSS class variants

### Database & ORM
- **@neondatabase/serverless**: PostgreSQL client for serverless environments
- **drizzle-orm**: Type-safe SQL query builder
- **drizzle-zod**: Schema validation integration

### Development Dependencies
- **Replit Integration**: Custom plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development debugging

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Production Mode**: Single command starts the production server

### Environment Configuration
- **Development**: Hot reload with Vite dev server proxy
- **Production**: Static file serving with Express
- **Database**: Environment-based database URL configuration
- **Session Management**: PostgreSQL session store for user authentication

### Hosting Considerations
- **Static Assets**: Client files served from Express in production
- **API Routes**: All backend routes prefixed with `/api` for clear separation
- **Database**: Designed for cloud PostgreSQL providers like Neon
- **Session Storage**: Uses connect-pg-simple for PostgreSQL-backed sessions

The application follows a modern full-stack architecture with clear separation between client and server code, shared TypeScript definitions, and a scalable database design ready for feature expansion.