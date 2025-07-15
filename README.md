# Oslo Swimming Spots 🏊‍♂️

A modern web application to discover swimming spots in Oslo, Norway. Built with React, TypeScript, and Leaflet for an interactive map experience.

## Features

- **Interactive Map**: View all swimming spots on an interactive map centered on Oslo
- **Comprehensive Filtering**: Filter spots by:
  - Beach availability
  - Diving tower presence
  - Paid vs free entry
  - Changing rooms
  - Toilets
  - Parking
  - Cafe availability
  - Water quality (excellent, good, fair, poor)
  - Season (summer, year-round, indoor)
- **Detailed Information**: Click on any spot to see detailed information including amenities and descriptions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with beautiful gradients and smooth animations

## Swimming Spots Included

The app includes 10 popular swimming spots in Oslo:

1. **Huk Beach** - Popular beach area with sandy shores
2. **Paradisbukta** - Hidden gem with crystal clear water
3. **Ingierstrand Bad** - Historic swimming area with diving tower
4. **Sognsvann** - Large lake perfect for swimming activities
5. **Maridalsvannet** - Oslo's largest lake with hiking trails
6. **Tøyenbadet** - Indoor swimming pool with sauna facilities
7. **Frognerbadet** - Outdoor swimming pool complex
8. **Lysaker Beach** - Small beach area with good water quality
9. **Bygdøy Beach** - Family-friendly beach with shallow water
10. **Ekeberg Beach** - Quiet beach with beautiful fjord views

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oslo-swimming-spots
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with gradients and animations

## Project Structure

```
src/
├── components/
│   ├── Map.tsx          # Interactive map component
│   └── Filter.tsx       # Filter panel component
├── data/
│   └── swimmingSpots.ts # Swimming spots data
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── App.css              # Application styles
├── index.tsx            # Application entry point
└── index.css            # Global styles
```

## Features in Detail

### Map Features
- Interactive markers for each swimming spot
- Color-coded markers (blue for free, red for paid)
- Detailed popups with spot information
- Responsive map that works on all devices

### Filter System
- Real-time filtering as you select options
- Multiple filter categories
- Clear filters button for easy reset
- Filter count display in header

### Spot Details
- Comprehensive information panel
- Amenities display with icons
- Water quality and season badges
- Entry fee information

## Contributing

Feel free to contribute to this project by:
- Adding more swimming spots
- Improving the UI/UX
- Adding new features
- Fixing bugs

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- OpenStreetMap for the map tiles
- The Oslo swimming community for inspiration
- React and Leaflet communities for excellent documentation

---

Enjoy discovering Oslo's best swimming spots! 🏊‍♀️ 