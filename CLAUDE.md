# Masters Golf Scores App - Project Guide

## Project Overview
- React webapp displaying Masters Tournament scores in table format
- Primary platform: iOS Safari mobile
- Hosting: Local laptop server with ngrok tunneling
- Design: Golf-themed, professional tournament leaderboard

## Technical Stack
- React 18+ with TypeScript
- Tailwind CSS for styling
- Responsive design (mobile-first)
- PWA capabilities for iOS Safari
- Local development with mobile access via ngrok

## iOS Safari Specific Requirements
- Touch-
friendly interface (44px minimum touch targets)
- Optimized for iOS Safari viewport
- PWA manifest for "Add to Home Screen"
- Smooth scrolling and animations
- iOS-style navigation patterns

## Design Requirements
- Masters Tournament green (#006747) and gold (#FFD700) theme
- Mobile-first responsive design
- Professional leaderboard appearance
- Color-coded scoring system
- Smooth animations and transitions

## Data Structure
- Player rankings, names, country flags
- Round-by-round scores (R1, R2, R3, R4)
- Total scores relative to par
- Tournament status and current round
- Mock data for development

## Performance Requirements
- Fast loading on mobile networks
- Optimized images and assets
- Efficient re-rendering
- Offline capability via service worker