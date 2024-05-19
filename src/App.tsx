import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import MainTable from './components/MainTable';
import LineGraph from './components/LineGraph';
import DetailTable from './components/DetailTable';
import { loadCsvData, aggregateData, AggregatedData } from './utils/loadData';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [data, setData] = useState<AggregatedData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCsvData('/salaries.csv');
      const aggregated = aggregateData(csvData);
      console.log('Aggregated data:', aggregated);
      setData(aggregated);
    };
    fetchData();
  }, []);

  const handleRowClick = (year: number) => {
    setSelectedYear(year);
  };

  const selectedData = data.find(d => d.year === selectedYear);

  return (
    <Layout>
      <Header style={{display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:'#212121'}}>
        <h1 style={{ color: '#6d8cdc',marginBottom:'20px' }}>ML Engineer Salaries</h1>
      </Header>
      <Content style={{ padding: '20px' }}>
        <MainTable onRowClick={handleRowClick} />
        {data.length > 0 && <LineGraph data={data} />}
        {selectedYear && selectedData && (
          <DetailTable jobs={selectedData.jobs} />
        )}
      </Content>
    </Layout>
  );
};

export default App;
