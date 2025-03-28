import { createChart, ColorType, IChartApi, LineData } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { CountryRegionProvider, CountrySelector, RegionSelector } from '@/components/ui/country-selector';

interface ChartColors {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
}

interface ChartComponentProps {
    data: LineData[];
    colors?: ChartColors;
}

export const ChartComponent: React.FC<ChartComponentProps> = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chart = useRef<IChartApi | null>(null);

    useEffect(
        () => {
            if (!chartContainerRef.current) return;

            const handleResize = () => {
                if (chart.current) {
                    chart.current.applyOptions({ width: chartContainerRef.current?.clientWidth || 0 });
                }
            };

            chart.current = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: 700,
                height: 300,
            });

            chart.current.timeScale().fitContent();

            const newSeries = chart.current.addAreaSeries({ 
                lineColor, 
                topColor: areaTopColor, 
                bottomColor: areaBottomColor 
            });

            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (chart.current) {
                    chart.current.remove();
                }
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

interface TimeValueData {
    time: string;
    value: number;
}

const initialData: TimeValueData[] = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];
export default function Trends(props: ChartComponentProps) {
    const [selectedColor, setSelectedColor] = React.useState('blue');
  return (
    <>
        <div className="flex flex-col items-center gap-4">
            <ChartComponent {...props} data={initialData}></ChartComponent>
    
       <div>     
            <CountryRegionProvider>
              <CountrySelector className='p-2 border rounded-md' />
              <RegionSelector className='p-2 border rounded-md'/>
            </CountryRegionProvider>
        </div></div>
    </>
  );
}
