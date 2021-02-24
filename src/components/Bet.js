import _ from 'lodash';
import Odd from './Odd';

function Bet({ bet }) {
    return (
        <div className="e-sports-feed-bet--container">
            <p className="e-sports-feed-bet">
                <span>Bet: { _(bet).get('$.Name') }</span>
                <span>IsLive: { _(bet).get('$.IsLive') }</span>
            </p>
            {
                _(bet).get('Odd') ? _(bet).get('Odd').map(odd => (
                    <Odd key={_(odd).get('$.ID')} odd={odd} />
                )) :
                <p>No odd</p>
            }
        </div>
    );
}

export default Bet;