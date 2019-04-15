/*
    private String id;
    private String name;
    private String owner;
    private String externalId;
    private String createdBy;
    private long createdAt;
    private String lastUpdatedBy;
    private long lastUpdatedAt;
    private long startTime;
    private long endTime;
    private long uxDuration;
    private TestExecutionStatus status;
    private List<Platform> platforms;
    private Job job;
    private List<TestExecutionStep> steps;
    private List<String> tags;
    private Project project;
*/
'use strict';

module.exports = class TestExecution {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.owner = config.owner;
    this.externalId = config.externalId;
    this.createdBy = config.createdBy;
    this.createdAt = config.createdAt;
    this.lastUpdatedBy = config.lastUpdatedBy;
    this.lastUpdatedAt = config.lastUpdatedAt;
    this.startTime = config.startTime;
    this.endTime = config.endTime;
    this.uxDuration = config.uxDuration;
    this.status = config.status;
    this.platforms = config.platforms;
    this.job = config.job;
    this.steps = config.steps;
    this.tags = config.tags;
    this.project = config.project;
  }
};
