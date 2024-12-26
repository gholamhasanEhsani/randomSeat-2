# Seat Assignment Project

This project is a web application designed to assign seat numbers to students for different days. The project utilizes HTML, CSS, and JavaScript along with external libraries such as Notyf.js for notifications, SheetJS for generating XLSX files, and PrintJS for printing.

## Features

- Assign unique seat numbers to students for each day.
- Save the results table and seat number data to localStorage.
- Print the results table as a PDF using PrintJS.
- Export the results table to an XLSX file using SheetJS.
- Display success and error notifications using Notyf.js.
- Dynamic buttons for saving, clearing, and generating a new table based on the save status.

## Usage

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/gholamhasanEhsani/randomSeat-2.git
    cd randomSeat-2
    ```

2. Open `index.html` in your preferred web browser.

### File Structure

- `index.html`: The main HTML file containing the structure of the application.
- `style.css`: The CSS file for styling the application.
- `app.js`: The JavaScript file containing the main logic for assigning seats, saving/loading data, and handling button states.

### External Libraries

- **Notyf.js**: Used for displaying notifications (success and error messages).
  - Documentation: [Notyf.js](https://github.com/caroso1222/notyf)
- **SheetJS (xlsx.js)**: Used for generating XLSX files from the results table.
  - Documentation: [SheetJS](https://sheetjs.com/)
- **PrintJS**: Used for printing the results table as a PDF.
  - Documentation: [PrintJS](https://printjs.crabbly.com/)

### How It Works

1. **Generating the Table**:
    - The application generates a table of seat assignments for students based on the specified days.
    - Each student receives a unique seat number for each day.

2. **Saving and Loading**:
    - The table and seat assignment data are saved to `localStorage`.
    - The application checks the `localStorage` to load any saved data upon page load.

3. **Buttons**:
    - **Save**: Saves the current table and seat data to `localStorage`.
    - **Clear**: Clears the saved data from `localStorage`.
    - **Generate New Table**: Generates a new table with fresh seat assignments.
    - **Export PDF**: Prints the table as a PDF.
    - **Export XLSX**: Exports the table as an XLSX file.

### Notifications

- Notifications are displayed using Notyf.js for successful operations (like saving data) and errors (like no table found to save).

## Contributing

If you wish to contribute to the project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
Created by gholamhasanEhsani
