Feature: Generate analysis for a survey response
  As a credited user
  I want to analyze a survey response
  So that I can see the analysis result and my credits are decreased

  Background:
    Given there is a user "esra@example.com" with credit balance 10
    And there is a scale "Burnout Scale v1"
    And I am logged in as "esra@example.com"

  Scenario: Analyze a single response successfully
    Given there is a survey generated from "Burnout Scale v1"
    And there is a response for that survey from participant "P-123"
    When I request analysis for that response
    Then an analysis result should be created for that response
    And my credit balance should be 9
    And I should see "Analysis completed for P-123"
