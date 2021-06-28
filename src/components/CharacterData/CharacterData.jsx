// bring in vis library
import {VerticalBarSeries, RadialChart, XYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis} from 'react-vis';

// bring in axios
import axios from 'axios'

// bring in useEffect
import {useEffect, useState} from 'react'

import './CharacterData.css'
import '../../../node_modules/react-vis/dist/style.css';

export default function CharacterData() {

    const [characterToAnimeRatio, setCharacterToAnimeRatio] = useState([]);

    useEffect( () => {
        getData();
    }, []);

    const getData = () => {
        axios.get('/api/characters')
        .then( response => {
            console.log(response.data);
            setCharacterToAnimeRatio(response.data);
        })
        .catch( e => {
            console.error('Error bad response', e)
        });
    }

    console.log(characterToAnimeRatio);
    return (
        <div>
            <h2>Percentage of Characters from Each Anime</h2>

            <div>
                <div className="mapBox1"></div>
                <p className="mapKey">{characterToAnimeRatio?.[0]?.label}</p>

                <div className="mapBox2"></div>
                <p className="mapKey">{characterToAnimeRatio?.[1]?.label}</p>

                <div className="mapBox3"></div>
                <p className="mapKey">{characterToAnimeRatio?.[2]?.label}</p>
            </div>
            
            <RadialChart 
                width={600}
                height={600}
                data={characterToAnimeRatio} 
                colorRange={['#8db600', '#ff9966', '#f4c2c2']}
                
            /> 

            <XYPlot
                width={600}
                height={600}
            >
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={[{x:1, y:5}, {x:3, y:2}, {x:5, y:1}]} color="#8db600" />
                <VerticalBarSeries data={[{x:1, y:5}, {x:3, y:2}, {x:5, y:1}]} color="#8db600" />
                <VerticalBarSeries data={[{x:1, y:5}, {x:3, y:2}, {x:5, y:1}]} color="#8db600" />
            </XYPlot>
        </div>
    )
}
