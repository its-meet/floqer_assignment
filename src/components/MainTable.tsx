import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { loadCsvData, aggregateData, AggregatedData } from '../utils/loadData';

interface MainTableProps {
  onRowClick: (year: number) => void;
}

const MainTable: React.FC<MainTableProps> = ({ onRowClick }) => {
  const [data, setData] = useState<AggregatedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCsvData('/salaries.csv');
      const aggregated = aggregateData(csvData);
      setData(aggregated);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a: AggregatedData, b: AggregatedData) => a.year - b.year,
    },
    {
      title: 'Number of Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a: AggregatedData, b: AggregatedData) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary in USD',
      dataIndex: 'averageSalary',
      key: 'averageSalary',
      sorter: (a: AggregatedData, b: AggregatedData) => a.averageSalary - b.averageSalary,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="year"
      onRow={(record) => ({
        onClick: () => onRowClick(record.year),
      })}
    />
  );
};

export default MainTable;
