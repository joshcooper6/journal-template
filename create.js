const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

function createMarkdownFile() {
    let filename;
    const date = new Date();

  if (process.argv.length > 2) {
    // User has provided a filename as input
    filename = `${process.argv[2]}.md`;
  } else {
    // Use current date as the filename
    filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.md`;
  }

  // Get the name of the current month and year
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Create the month-year folder if it doesn't exist
  const monthYear = `${month}-${year}`;
  if (!fs.existsSync(monthYear)) {
    fs.mkdirSync(monthYear);
  }

  // Construct the file path
  const filePath = path.join(monthYear, filename);

  // If file exists already, it will automatically open in default app viewer
  if (fs.existsSync(filePath)) {
    console.log(`${filePath} already exists`);
    child_process.execSync(`open ${filePath}`);
    return;
  }

  // If the file does not exist, the system will create the file
  fs.writeFile(filePath, '', err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`${filePath} created`);
  });
}

createMarkdownFile();