import Job from './job.js';
import Project from './project.js';
import Constants from '../client/constants';

module.exports = class ExecutionContextPopulator {

  /**
   * Returns a new {@link Job} with the same properties as the given source.
   * If the source is missing some properties then this method will try to get values for
   * them based on well-defined environment variable names.
   *
   * @param src job source
   * @return New job based on the given source. Properties that are missing in the source
   * job are read from system variables and populated in the returned value.
   * Returns <code>null</code> if the interpolated job name is empty
   */
  populateMissingJobPropertiesFromEnvVariables(job) {
    const target = new Job(job.jobName, job.buildNumber);
    // Fill missing properties from environment variables
    if (!target.buildNumber) {
      target.buildNumber = process.env[Constants.sdk.jobNumberParameterName];
    }
    if (!target.jobName) {
      target.jobName = process.env[Constants.sdk.jobNameParameterName];
    }
    if (!target.jobName) {
      return null;
    }
    return target;
  }

  /**
   * Returns a new {@link Project} with the same properties as the given source.
   * If the source is missing some properties then this method will try to get values for
   * them based on well-defined environment variable names.
   *
   * @param src project source
   * @return New project based on the given source. Properties that are missing in the source
   * project are read from system variables and populated in the returned value.
   * Returns <code>null</code> if the interpolated project name is empty
   */
  populateMissingProjectPropertiesFromEnvVariables(project) {
    const target = new Project(project.projectName, project.projectVersion);
    // Fill missing properties from environment variables
    if (!target.projectVersion) {
      target.projectVersion = process.env[Constants.sdk.projectVersionParameterName];
    }
    if (!target.projectName) {
      target.projectName = process.env[Constants.sdk.projectNameParameterName];
    }
    if (!target.projectName) {
      return null;
    }
    return target;
  }
};
