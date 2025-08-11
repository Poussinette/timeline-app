# Historical Timeline Visualization Web App

A web application that visualizes historical events from a CSV file using an interactive timeline built with D3.js and Express.js.

## 🌟 Features

- **Interactive Timeline**: Visual representation of historical events with chronological positioning
- **Hover Effects**: Events change color and size when hovered, with informative tooltips
- **CSV Data Integration**: Automatically reads and parses historical data from local CSV files
- **Responsive Design**: Clean, professional interface that works across different screen sizes
- **Real-time Data Loading**: Server-side CSV processing with client-side visualization

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

## 🚀 Installation

1. **Clone or download the project files**
   ```bash
   cd timeline-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 📊 Data Format

The application expects a CSV file with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| Event | Name of the historical event | "First Revelation (Hira)" |
| Year | Year when the event occurred | 610 |
| Date | Specific date (optional) | "June 23, 2025 → June 27, 2025" |
| Period | Historical period | "Macca" |
| Notes | Additional information | "Jibril's first visit" |
| Tafseer | Religious commentary link | "https://archive.org/..." |
| Quran Verse | Related Quran verse link | "https://quran.com/96/1" |
| Hadith | Related Hadith link | "https://sunnah.com./bukhari:3" |

### Sample Data
The included CSV file contains Islamic historical events:
- First Revelation (Hira) - 610 CE
- Boycott of Banu Hashim - 616 CE
- Hijrah to Medina - 622 CE
- Battle of Badr - 624 CE

## 🏃‍♂️ Running the Application

1. **Start the server**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

2. **Open your browser**
   Navigate to: `http://localhost:3001`

3. **View the timeline**
   The application will automatically load and display the historical events from the CSV file.

## 🏗️ Project Structure

```
timeline-app/
├── server.js                          # Express.js server
├── package.json                       # Node.js dependencies
├── README.md                          # This documentation
├── Subset1021bfe424952e806cab8ed7411a4cae38.csv  # Historical data
└── public/
    ├── index.html                     # Main web page
    └── script.js                      # D3.js visualization (legacy)
```

## 🔧 Technical Details

### Backend (server.js)
- **Express.js** server serving static files and API endpoints
- **PapaParse** library for CSV file parsing
- **CORS-enabled** for cross-origin requests
- **Error handling** for file reading and parsing operations

### Frontend (index.html)
- **D3.js v7** for data visualization
- **Responsive SVG** graphics for timeline rendering
- **Interactive elements** with hover effects and tooltips
- **Time scale** with proper axis formatting

### Key API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serves the main HTML page |
| `/data` | GET | Returns parsed CSV data as JSON |
| `/script.js` | GET | Serves JavaScript files with correct MIME type |

## 🎨 Visualization Features

### Timeline Elements
- **Circles**: Represent individual historical events
- **Labels**: Event names displayed above each point
- **Years**: Chronological years shown below each point
- **Axis**: Time scale at the bottom of the visualization

### Interactive Features
- **Hover Effects**: 
  - Color changes from blue to orange
  - Circle size increases
  - Tooltip appears with event details
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: CSS transitions for visual feedback

## 🛠️ Customization

### Changing Data Source
1. Replace the CSV file with your own data
2. Update the file path in `server.js`:
   ```javascript
   const csvFilePath = path.join(__dirname, 'your-data-file.csv');
   ```

### Styling Modifications
Edit the CSS in `public/index.html`:
```css
.timeline-event {
    cursor: pointer;
}
.timeline-event:hover {
    fill: orange; /* Change hover color */
}
```

### Timeline Dimensions
Modify the SVG dimensions in the JavaScript:
```javascript
const svg = d3.select('#timeline')
    .append('svg')
    .attr('width', 900)  // Change width
    .attr('height', 600); // Change height
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```
   Error: listen EADDRINUSE: address already in use :::3001
   ```
   **Solution**: Change the port in `server.js` or kill existing processes

2. **CSV File Not Found**
   ```
   Error reading CSV file
   ```
   **Solution**: Ensure the CSV file exists and the path is correct

3. **Dependencies Not Installed**
   ```
   Cannot find module 'express'
   ```
   **Solution**: Run `npm install` to install dependencies

4. **MIME Type Errors**
   ```
   Refused to execute script because its MIME type is not executable
   ```
   **Solution**: The server is configured to handle this automatically

### Debug Mode
Add console logging to track data loading:
```javascript
console.log('Data loaded:', data);
```

## 📦 Dependencies

- **express**: ^4.18.2 - Web framework for Node.js
- **papaparse**: ^5.4.1 - CSV parsing library

## 🔄 Development

### Adding New Features
1. **Server-side changes**: Modify `server.js`
2. **Client-side changes**: Edit the JavaScript in `index.html`
3. **Styling updates**: Modify the CSS in `index.html`

### Testing
1. Start the server: `npm start`
2. Open browser to `http://localhost:3001`
3. Check browser console for any errors
4. Verify data loading and visualization rendering

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for error messages
3. Ensure all dependencies are properly installed
4. Verify CSV data format matches expected structure

---

**Built with ❤️ using D3.js, Express.js, and modern web technologies**
