# Binary Game Application

## Overview

This is a simplified vanilla JavaScript web application built as an interactive binary number learning game. The application teaches users how binary numbers work through a card-flipping game where players match decimal target numbers by selecting the correct combination of binary place values (powers of 2).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Vanilla JavaScript (no frameworks)
- **Styling**: Pure CSS with responsive design
- **State Management**: Plain JavaScript objects and DOM manipulation
- **Build Tool**: None required - direct HTML/CSS/JS files

### Backend Architecture
- **Framework**: Express.js for static file serving only
- **Runtime**: Node.js with ES modules
- **Purpose**: Simple static file server (no API endpoints)
- **Development Setup**: Direct file serving without build process

### Data Storage Solutions
- **Storage**: No database required - all game state is client-side
- **Persistence**: Game state resets with each session (educational focus)
- **State Management**: JavaScript objects stored in memory

## Key Components

### Game Logic Components
- **Binary Cards**: Interactive DOM elements representing binary place values (8, 4, 2, 1)
- **Game Controls**: HTML form elements for difficulty selection and target generation
- **Success Modal**: Pure CSS modal with dot pattern visualization
- **Learning Info**: Static educational content

### UI Implementation
- **CSS Grid/Flexbox**: Responsive layout without frameworks
- **DOM Manipulation**: Direct JavaScript event handling and state updates
- **CSS Animations**: Smooth transitions and hover effects
- **Mobile-First Design**: Responsive breakpoints for all screen sizes

### Development Approach
- **Pure JavaScript**: No transpilation or build steps required
- **Semantic HTML**: Accessible markup structure
- **Progressive Enhancement**: Works without JavaScript for basic content

## Data Flow

1. **Game Initialization**: User selects difficulty level (beginner/intermediate/advanced)
2. **Target Generation**: Random decimal number generated based on difficulty range (1-3, 1-7, 1-15)
3. **User Interaction**: Player clicks binary cards to flip between face-up/face-down states
4. **Real-time Validation**: Current total calculated via DOM manipulation and compared to target
5. **Feedback System**: Visual and textual feedback for correct/incorrect attempts
6. **Success Flow**: Modal popup shows solution with mini-cards and mathematical explanation
7. **Reset Flow**: Cards automatically reset to face-down state after each successful solution

## File Structure

### Core Files
- **index.html**: Main HTML structure with semantic markup
- **styles.css**: Complete CSS styling with responsive design and animations
- **script.js**: Game logic, DOM manipulation, and event handling

### Key Features
- **No Build Process**: Direct file serving without compilation
- **No Dependencies**: Pure HTML/CSS/JavaScript implementation
- **Client-Side Only**: All game logic runs in the browser
- **Educational Focus**: Immediate visual feedback and mathematical explanations

## Deployment Strategy

### Simplified Deployment
- **Static File Serving**: Express.js serves HTML/CSS/JS files directly
- **No Build Step**: Files are served as-is from the file system
- **Single Port**: All content served on port 5000
- **Instant Deployment**: No compilation or bundling required

### Environment Configuration
- **Development**: Direct file serving with auto-restart
- **Production**: Same setup - static file serving
- **No Database**: No external dependencies or configuration needed
- **No Session Management**: Stateless game sessions

### Hosting Simplicity
- **Static Assets**: All files served directly from root directory
- **No API Routes**: Pure frontend application
- **No External Services**: Self-contained educational game
- **Zero Configuration**: Works immediately after file deployment

The application follows a simplified architecture focused on educational effectiveness with minimal technical complexity, making it easy to understand, modify, and deploy.