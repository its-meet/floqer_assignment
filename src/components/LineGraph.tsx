import { Line } from '@ant-design/charts';
import { AggregatedData } from '../utils/loadData';

interface LineGraphProps {
  data: AggregatedData[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  console.log('LineGraph data:', data);

  const filteredData = data.filter(d => d && typeof d.year === 'number' && typeof d.totalJobs === 'number');

  const config = {
    data: filteredData.map(d => ({ year: d.year.toString(), value: d.totalJobs })),
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  return <Line {...config} />;
};

export default LineGraph;
