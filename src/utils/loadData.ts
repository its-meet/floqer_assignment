
import Papa from 'papaparse';

export interface JobData {
  work_year: number;
  job_title: string;
  salary_in_usd: number;
}

export interface AggregatedData {
  year: number;
  totalJobs: number;
  averageSalary: number;
  jobs: {
    title: string;
    count: number;
  }[];
}

export const loadCsvData = async (filePath: string): Promise<JobData[]> => {
  try {
    const response = await fetch(filePath);
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder('utf-8');
    const csvText = decoder.decode(result?.value);
    const parsedData = Papa.parse<JobData>(csvText, {
      header: true,
      dynamicTyping: true,
    });
    return parsedData.data;
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
};

export const aggregateData = (data: JobData[]): AggregatedData[] => {
  const aggregated: Record<number, AggregatedData> = {};

  data.forEach((entry) => {
    if (!aggregated[entry.work_year]) {
      aggregated[entry.work_year] = {
        year: entry.work_year,
        totalJobs: 0,
        averageSalary: 0,
        jobs: [],
      };
    }

    aggregated[entry.work_year].totalJobs += 1;
    aggregated[entry.work_year].averageSalary += entry.salary_in_usd;

    const job = aggregated[entry.work_year].jobs.find((job) => job.title === entry.job_title);

    if (job) {
      job.count += 1;
    } else {
      aggregated[entry.work_year].jobs.push({
        title: entry.job_title,
        count: 1,
      });
    }
  });

   const filteredAggregated = Object.values(aggregated).filter((entry) => entry.totalJobs > 1);

   filteredAggregated.forEach((yearData) => {
     yearData.averageSalary /= yearData.totalJobs;
   });
 
   return filteredAggregated;
};
