import _ from 'lodash';
import moment from 'moment';
import Bet from './Bet';

function Match({ match }) {
    return (
        <div className="e-sports-feed-match--container">
            <p className="e-sports-feed-match">
                <span>{ _(match).get('$.Name') }</span>
                <span>{ moment(_(match).get('$.StartDate')).format('DD MMM YYYY, hh:mma') }</span>
            </p>
            {
                _(match).get('Bet') 
                ?
                    <Bet bet={_(match).get('Bet[0]')} />
                :
                    <p>No bets</p>
            }
        </div>
    );
}

export default Match;