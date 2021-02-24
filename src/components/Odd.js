import _ from 'lodash';

function Odd({ odd }) {
    return (
        <div className="e-sports-feed-odd--container">
            <p className="e-sports-feed-odd">
                <span>{ _(odd).get('$.Name') }</span>
                <span>{ _(odd).get('$.Value') }</span>
            </p>
        </div>
    );
}

export default Odd;