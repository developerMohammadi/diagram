# Company Diagram Application

This application allows users to create, manage, and visualize a diagram of fake companies using React Flow. Users can add companies, display their information, and delete selected companies from the diagram.

## Features

- **Add Company**: Users can input the name, years of experience, and number of employees for a new company and add it to the diagram.
- **Display Companies**: The diagram visually represents each company with relevant information (name, years of experience, and number of employees).
- **Delete Company**: Users can select a company in the diagram and remove it from the view.
- **Responsive Design**: The application is designed to be responsive and works well on various screen sizes.
- **User Interaction**: Users can click on a company to select it for deletion.

## Requirements

- **React**: This application uses React and React Flow for creating the interactive diagram.
- **NextUI**: The UI components are built using NextUI for a modern and accessible design.
- **TypeScript**: The application is written in TypeScript for type safety and better development experience.

## Conditions

- **Input Validation**:
    - The "Company Name" field cannot be empty.
    - The "Years of Experience" and "Number of Employees" fields must be numeric.
- **Disabled Add Button**: The "Add Company" button is disabled until all required fields are filled correctly.
- **Selected Company**: A company must be selected in the diagram for the "Delete Selected Company" button to be enabled.

## Installation

To run this application locally:

1. Clone the repository:
   ```bash
    https://github.com/developerMohammadi/diagram.git
