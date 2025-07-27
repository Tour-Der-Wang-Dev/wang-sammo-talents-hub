import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchJobs, fetchJobById, createJob } from '@/api/mockApi';
import { Job } from '@/data/jobs';

export function useJobs() {
  const queryClient = useQueryClient();

  const { data: jobs = [], ...rest } = useQuery<Job[], Error>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const createJobMutation = useMutation({
    mutationFn: (newJobData: Omit<Job, 'id' | 'datePosted' | 'requirements'> & { requirements: string[] }) => createJob(newJobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return { jobs, ...rest, createJob: createJobMutation.mutateAsync };
}

export function useJob(id: string) {
    return useQuery<Job | undefined, Error>({
        queryKey: ['job', id],
        queryFn: () => fetchJobById(id),
        enabled: !!id,
    });
}