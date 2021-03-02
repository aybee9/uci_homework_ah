# dependecies
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


from flask import Flask, jsonify

# Database Setup
engine = create_engine('sqlite:///../../git_resources/08-Sqlalchemy-challenge/hawaii.sqlite')
Base = automap_base()
Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(bind = engine)

# Flask setup
app = Flask(__name__)

## Routes
@app.route('/')
def index():
    print('Received request for homepage!!!')
    return (
        f'Welcome to the homepage<br>'
        f'---------------------------------------<br><br>'
        
        f'These are the available routes: <br>'
        f'---------------------------------------<br>'
        f'/api/v1.0/precipitation<br>'
        f'/api/v1.0/stations<br>'
        f'/api/v1.0/tobs<br><br><br>'

        f'Start/End routes under construction! <br>'
        f'---------------------------------------<br>'
        f'/api/v1.0/<start><br>'
        f'/api/v1.0/<end><br>'
    )


@app.route('/api/v1.0/precipitation')
def precipitation():
    print('Received request for precipiation route!')

    # Run session to retrieve data
    # Convert the query results to a dictionary using date as the key and prcp as the value. 
    # Return the JSON representation of your dictionary.
    

    session = Session(engine)    
    one_year = dt.date(2017,8,23) - dt.timedelta(days=365)

    # same query from jupyter notebook
    one_year = (session.query(Measurement.date, Measurement.prcp)
                 .filter(Measurement.date >= one_year)
                 .order_by(Measurement.date.asc())
                 .all())
    session.close()

    one_year_dict = dict(one_year)

    # return dict jsonify
    return jsonify(one_year_dict)    

@app.route('/api/v1.0/stations')
def stations():
    print('Received request for stations route!')
    # Return a JSON list of stations from the dataset.

    session = Session(engine) 
    stations = session.query(Station.station).all()
    session.close()

    station_list = list(stations)

    return jsonify(station_list)

@app.route('/api/v1.0/tobs')
def tobs():
    print('Received request for tobs!!')    

    # Query the dates and temperature observations of the most active station for the last year of data.
    # Return a JSON list of temperature observations (TOBS) for the previous year.

    # most active station and date retrieved from jupyter notebook
    # most activate station: USC00519281
    # one year date: 2016-08-23

    session = Session(engine)
    most_active = (session.query(Measurement.station, Measurement.date, Measurement.tobs)
    .filter(Measurement.station == 'USC00519281')
    .filter(Measurement.date >= '2016-08-23')).all()
    session.close()

    most_active_list = list(most_active)

    return jsonify(most_active_list)

# @app.route('/api/v1.0/<start>')
# def start():
#     print('Received request for start route!')

    # Start only: calculate TMIN, TAVG, and TMAX for all dates >= to the start date

    # session = Session(engine)
    # min_tobs = session.query(func.min(Measurement.tobs)).all()
    # avg_tobs = session.query(func.avg(Measurement.tobs)).all()
    # max_tobs = session.query(func.max(Measurement.tobs)).all()
    # session.close()

    # return f'Under construnction...'    

# @app.route('/api/v1.0/<end>')
# def about():
#     print('Received request!')
#     return 'Welcome to the about!'   

if __name__ == '__main__':
    app.run(debug=True)
