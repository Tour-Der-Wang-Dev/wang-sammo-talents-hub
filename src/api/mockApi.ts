import { jobs, Job } from '@/data/jobs';
import { companies } from '@/data/companies';
import { Company } from '@/types/Company';

const API_DELAY = 500; // ms

export const fetchJobs = (): Promise<Job[]> => {
  console.log('Fetching all jobs...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(jobs);
    }, API_DELAY);
  });
};

export const fetchJobById = (id: string): Promise<Job | undefined> => {
  console.log(`Fetching job with id: ${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const job = jobs.find(j => j.id === id);
      resolve(job);
    }, API_DELAY);
  });
};

export const createJob = (newJobData: Omit<Job, 'id' | 'datePosted' | 'requirements'> & { requirements: string[] }): Promise<Job> => {
  console.log('Creating new job...', newJobData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newJob: Job = {
        ...newJobData,
        id: (Math.random() * 10000).toString(),
        datePosted: new Date().toISOString().split('T')[0],
      };
      jobs.unshift(newJob);
      resolve(newJob);
    }, API_DELAY);
  });
};

export const fetchCompanies = (): Promise<Company[]> => {
  console.log('Fetching all companies...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(companies);
    }, API_DELAY);
  });
};

export const fetchCompanyById = (id: string): Promise<Company | undefined> => {
  console.log(`Fetching company with id: ${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const company = companies.find(c => c.id === id);
      resolve(company);
    }, API_DELAY);
  });
};