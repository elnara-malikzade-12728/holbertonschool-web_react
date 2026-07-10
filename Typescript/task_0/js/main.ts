interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    location: 'New York'
};

const student2: Student = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 20,
    location: 'London'
};

const studentsList: Student[] = [student1, student2]; 

function studentsTable(students: Student[]): void {
    // 1. Create table element structure
    const table: HTMLTableElement = document.createElement('table');
    const thead: HTMLTableSectionElement = document.createElement('thead');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    
    // 2. Create table header row
    const headerRow: HTMLTableRowElement = document.createElement('tr');
    const headers: string[] = ['First Name', 'Location'];
    
    headers.forEach((headerText: string) => {
        const th: HTMLTableCellElement = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // 3. Iterate over data to append body rows
    students.forEach((student: Student) => {
        const row: HTMLTableRowElement = document.createElement('tr');
        
        // Extract only required fields
        const firstNameCell: HTMLTableCellElement = document.createElement('td');
        firstNameCell.textContent = student.firstName;
        
        const locationCell: HTMLTableCellElement = document.createElement('td');
        locationCell.textContent = student.location;
        
        // Append cells to row
        row.appendChild(firstNameCell);
        row.appendChild(locationCell);
        
        // Append row to body 
        tbody.appendChild(row);
    });
    
    // 4. Assemble head and body to table (Moved outside the loop)
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // 5. Append the completed table to the HTML document body
    document.body.appendChild(table);
}

// 6. Execute the function outside of its own block
studentsTable(studentsList);
