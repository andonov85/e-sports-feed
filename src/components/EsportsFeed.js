import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Loader from "react-loader-spinner";

import Match from './Match';

const sortByMatch = (events) => {
    return _(events).mapValues(event => {
        if (event.Match) {
            const Match = _(event.Match).sortBy('$.StartDate').value();
            return { ...event, Match };
        }
        return event;
    }).value();
}

const sortByEvent = (events) => {
    const sortedKeys = _(Object.keys(events)).sortBy().value();
    let sorted = {};

    sortedKeys.forEach(key => {    
        sorted[key] = events[key];
    });
    return sorted;
}

function EsportsFeed() {
    const [ events, setEvents ] = useState({});
    const [ isLoaded, setIsLoaded ] = useState(false);

    const handleGroup = () => {
        setEvents(sortByEvent(events));
    };

    useEffect(() => {
        let ignore = false;
        const url = 'http://localhost:8081/matches';

        function getMatches() {
            setIsLoaded(false);

            axios.request({
                method: 'get',
                url: url,
            })
            .then(res => {
                let allevents = {};
                _(res.data.XmlSports.Sport[0].Event).each(event => {
                    allevents[_(event).get('$.Name')] = event;
                });

                const sorted = sortByMatch(allevents);

                if (!ignore) {
                    setEvents(sorted);
                }
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err)
                setIsLoaded(true);
            });
        }

        getMatches();

        return () => { ignore = true }
    }, [])

    return (
        <div className="e-sports-feed--container">
            <h1>All matches</h1>
            <button onClick={handleGroup}>Group By Events</button>
            {
                _(events).map(event => _(event).get('Match')).flatten().value().map(match => (
                        <Match key={_(match).get('$.ID')} match={match} />
                    )
                )
            }
            { !isLoaded ? 
                <Loader
                    className="e-sports-feed-loader"
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                /> : null
            }
        </div>
    );
}

export default EsportsFeed;