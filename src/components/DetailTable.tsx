import { Table } from 'antd';

interface DetailTableProps {
  jobs: {
    title: string;
    count: number;
  }[];
}

const DetailTable: React.FC<DetailTableProps> = ({ jobs }) => {
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return <Table columns={columns} dataSource={jobs} rowKey="title" />;
};

export default DetailTable;
