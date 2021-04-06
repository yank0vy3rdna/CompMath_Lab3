import React from 'react';
import './Plot.css';
// @ts-ignore
import Plot from 'react-plotly.js';

function PlotItem(props:  { x: any[]; y: any[]; }) {
    return (
        <div className="Plot">
            <Plot
                data={[
                    {
                        x: props.x,
                        y: props.y,
                        type: 'scatter',
                        marker: {color: 'red'},
                    }
                ]}
                layout={ {width: '80vw', height: '60vh'} }
            />
        </div>
    );
}

export default PlotItem;
