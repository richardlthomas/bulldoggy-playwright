# Bulldoggy Test Automation

## Summary

This is a small suite of basic tests for the application Bulldoggy, by Bicycle Labs. The selected tests cover five of the most crucial pieces of functionality for the application. These tests are built in Playwright for Typescript, and assume that a deployed instance of the Bulldoggy application is available.

## How to Run

- Ensure ```baseUrl``` in playwright.config.ts is set to a running instance of Bulldoggy (local or otherwise)
- Run ```npm install``` while in the root directory
- Run ```npx playwright test```

## Tests

### Login
Logging in is the first thing a user will do with the application, and needs to work for the application to even be usable. This test simply logs in as a pre-defined user and verifies that the home page appears correctly.

### Add List
Adding a list to add reminders to is one of the core functionalities of the application. This test creates a new list, then verifies that it is correctly displayed in the selection of lists.

### Delete List
As a list can be added, it is important to ensure that it can also be deleted. This test creates a list, deletes it, and then ensures that is no longer displayed alongside the other lists.

### Add Reminder
Reminders are the core purpose of the application, so ensuring that reminders can be added may be the most important test. This test creates a new list, adds a reminder to it, and verifies that the reminder appears in the list correctly.

### Complete Reminder
When the task associated with a reminder has been completed, it is important to be able to mark it as completed to track progress and be sure that you are not duplicating work. This test creates a new list, adds a reminder, marks the reminder as completed, and ensure that the reminder remains in the list and is correctly marked as complete.