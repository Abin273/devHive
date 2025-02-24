import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error('jobRepository should exist in dependencies');
    }

    const execute = async (fields: Array<string>) => {
        const jobFields = await jobRepository.getAllJobsDistinctValues(fields);
        return jobFields;
    };

    return { execute };
};
