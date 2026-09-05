

function StudentTable({ students, onDelete, onEdit }) {
    return (
        <div>
            <h3 className="mt-5 mb-3">
    Student List
</h3>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Student Number</th>
                        <th>Age</th>
                        <th>Module</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan="5">
                                No students found.
                            </td>
                        </tr>
                    ) : (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.fullname}</td>
                                <td>{student.student_number}</td>
                                <td>{student.age}</td>
                                <td>{student.module.module_name}</td>
                                <td>
                                    <button
    className="btn btn-warning btn-sm"
    onClick={() => onEdit(student)}
>
    Edit
</button>

                                    <button
    className="btn btn-danger btn-sm ms-2"
    onClick={() => onDelete(student.id)}
>
    Delete
</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;