# Crypto Chart Application

This is a Next.js project that displays cryptocurrency price charts for Bitcoin and Ethereum. The application allows users to view historical price data, switch between different cryptocurrencies, and adjust the time interval for the displayed data.

## Features

- Interactive cryptocurrency price charts
- Support for Bitcoin and Ethereum
- Customizable time intervals (1d, 3d, 7d, 1m, 6m, 1y, max)
- Responsive design with fullscreen mode
- Real-time price updates and percentage changes

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Custom Chart Implementation

One of the unique aspects of this project is that the charts are implemented without relying on any third-party charting libraries. The custom chart component is built from scratch using SVG and React, providing full control over the chart's appearance and behavior.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

The main components of the project are:

- `ChartComponent`: The main container for the chart and controls
- `Chart`: The custom SVG-based chart implementation
- `ChartMenuBar`: Navigation for different chart views
- `ChartActionBar`: Controls for fullscreen and time interval selection
- `CurrentPrice`: Displays the current price and price changes

## Data Processing

The project includes custom data processing utilities to handle different time intervals and format the chart data appropriately.

## Styling

The project uses Tailwind CSS for styling, providing a clean and responsive design.

## Deployment

This project can be easily deployed on platforms like Vercel or Netlify.
