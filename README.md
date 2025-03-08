# Urban Heat Island Analysis Tool

![Urban Heat Island](https://raw.githubusercontent.com/omuili/urban-heat-island/main/public/uhi-banner.png)

An interactive web application for analyzing and visualizing urban heat island effects across different cities. This tool combines Next.js for the frontend interface with Python data processing scripts to provide comprehensive insights into urban climate patterns.

## 🌡️ Features

- **Temperature Data Analysis**: Visualize and analyze temperature variations between urban and rural areas
- **Air Quality Monitoring**: Track air quality metrics and their correlation with urban heat
- **Energy Consumption Analysis**: Examine how urban heat affects energy usage patterns
- **Land Use Impact Assessment**: Analyze how different land use patterns contribute to heat islands
- **Health Impact Visualization**: Explore the health implications of urban heat islands
- **Satellite Data Integration**: Incorporate satellite imagery for visual analysis
- **Mitigation Strategies**: Evaluate potential strategies to reduce urban heat island effects
- **Predictive Modeling**: Use machine learning to predict future urban climate patterns


## 🛠️ Technologies

### Frontend

- Next.js
- React
- Tailwind CSS
- Chart.js 


### Backend & Data Processing

- Python
- Scikit-learn
- Pandas
- NumPy
- Joblib


## 📋 Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn


## 🚀 Installation

1. Clone the repository:

```shellscript
git clone https://github.com/omuili/urban-heat-island.git
cd urban-heat-island
```


2. Install JavaScript dependencies:

```shellscript
npm install
# or
yarn install
```


3. Install Python dependencies:

```shellscript
pip install -r requirements.txt
```


4. Create a `.env.local` file with required environment variables:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```




## 💻 Usage

1. Generate the required data:

```shellscript
python generate_all_data.py
```


2. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## 📊 Data Processing

The application uses several Python scripts to generate and process data:

- `generate_air_quality_data.py`: Generates air quality metrics for urban areas
- `generate_temperature_data.py`: Creates temperature datasets comparing urban and rural areas
- `generate_energy_consumption_data.py`: Analyzes energy usage patterns in relation to temperature
- `generate_land_use_data.py`: Processes land use patterns and their impact on heat islands
- `generate_health_impact_data.py`: Evaluates health implications of urban heat
- `generate_satellite_data.py`: Processes satellite imagery for visual analysis
- `generate_mitigation_strategies_data.py`: Evaluates effectiveness of various mitigation approaches
- `generate_urban_development_data.py`: Analyzes urban development patterns
- `generate_weather_station_data.py`: Processes weather station records
- `model.py`: Contains the machine learning model for predictions
- `predict.py`: Runs predictions based on the trained model


## 📁 Project Structure

```plaintext
urban-heat-island/
├── .next/               
├── app/                
├── components/          
├── data/              
├── hooks/             
├── lib/             
├── public/        
├── styles/           
├── generate_*.py       
├── model.py        
├── predict.py     
└── ...            
```

## 🌐 API Endpoints

The application provides several API endpoints for data access:

- `/api/temperature`: Get temperature data for a specific city and time period
- `/api/air-quality`: Retrieve air quality metrics
- `/api/energy`: Access energy consumption data
- `/api/health`: Get health impact statistics
- `/api/predictions`: Generate predictions based on provided parameters


## 📊 Data Sources

This application uses data from various sources, including:

- Weather station records
- Satellite imagery
- Census demographic data
- Energy consumption records
- Land use and urban development data


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- Mobile application integration
- Real-time data processing
- Integration with IoT sensors for live data collection
- Expanded geographic coverage
- Advanced visualization options
- Community contribution features


## 📧 Contact

Olanrewaju Muili - [@olanrewajumuili](https://www.linkedin.com/in/olanrewajumuili/) - [olanrewajumuili@gmail.com](mailto:olanrewajumuili@gmail.com)

Project Link: [https://github.com/omuili/urban-heat-island](https://github.com/omuili/urban-heat-island)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Scikit-learn](https://scikit-learn.org/) 
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- All contributors who have helped shape this project
