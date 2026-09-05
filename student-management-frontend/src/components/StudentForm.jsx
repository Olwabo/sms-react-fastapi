import { useEffect, useState } from "react";
import api from "../services/api";
import StudentTable from "./StudentTable";

function StudentForm() {
    const [student, setStudent] = useState({
        fullname: "",
        student_number: "",
        age: "",
        module_id: ""
    });
    const [modules, setModules] = useState([]);
    const [students, setStudents] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [search, setSearch] = useState("");

   const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
        ...student,
        [name]: value
    });

    setErrors({
        ...errors,
        [name]: ""
    });
};

    const fetchModules = async () => {
    try {
        const response = await api.get("/modules/");
        setModules(response.data);
    } catch (error) {
        console.error("Error fetching modules:", error);
    }
};

   const fetchStudents = async () => {
    try {
        const response = await api.get("/students/");
        setStudents(response.data);
    } catch (error) {
        console.error(error);
    }
};
    useEffect(() => {
        fetchModules();
        fetchStudents();
    }, []);


    const validateForm = () => {
    const newErrors = {};

    if (!student.fullname.trim()) {
        newErrors.fullname = "Full Name is required.";
    }

    if (!student.student_number.trim()) {
        newErrors.student_number = "Student Number is required.";
    }

    if (!student.age) {
        newErrors.age = "Age is required.";
    } else if (Number(student.age) <= 0) {
        newErrors.age = "Age must be greater than zero.";
    }

    if (!student.module_id) {
        newErrors.module_id = "Please select a module.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

       if (!validateForm()) {
        return;
    }

    try {

        if (editingId) {

            await api.put(
                `/students/${editingId}`,
                student
            );

            alert("Student updated successfully!");

        } else {

            await api.post(
                "/students/",
                student
            );

            alert("Student added successfully!");
        }

        fetchStudents();

        setStudent({
            fullname: "",
            student_number: "",
            age: "",
            module_id: ""
        });

        setErrors({});

        setEditingId(null);

    } catch (error) {

        console.error(error);

        alert("Operation failed.");

    }
};

        const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/students/${id}`);

        fetchStudents();

    } catch (error) {

        console.error(error);
        alert("Failed to delete student.");

    }
};


const handleEdit = (student) => {

    setStudent({
        fullname: student.fullname,
        student_number: student.student_number,
        age: student.age,
        module_id: student.module.id
    });

    setEditingId(student.id);
};

const filteredStudents = students.filter((student) => {

    const searchTerm = search.toLowerCase();

    return (
        student.fullname.toLowerCase().includes(searchTerm) ||
        student.student_number.toLowerCase().includes(searchTerm) ||
        student.module.module_name.toLowerCase().includes(searchTerm)
    );

});
    return (
        <div className="mb-3">
            <h2>Add Student</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

    <label className="form-label">
        Full Name
    </label>

    <input
        className="form-control"
        type="text"
        name="fullname"
        value={student.fullname}
        onChange={handleChange}
    />

        {errors.fullname && (
    <div className="text-danger">
        {errors.fullname}
    </div>
)}

</div>

                <br />

                <div className="mb-3">
                    <label>Student Number</label><br />
                    <input
                        className="form-control"
                        type="text"
                        name="student_number"
                        value={student.student_number}
                        onChange={handleChange}
                    />

                {errors.student_number && (
    <div className="text-danger">
        {errors.student_number}
    </div>
)}

                </div>

                <br />

                <div className="mb-3">
                    <label>Age</label><br />
                    <input
                        className="form-control"
                        type="number"
                        name="age"
                        value={student.age}
                        onChange={handleChange}
                    />

                    {errors.age && (
    <div className="text-danger">
        {errors.age}
    </div>
)}

                </div>

                <br />

                <div className="mb-3">
                    <label>Module</label><br />
                   <select
                   className="form-select"
                   name="module_id"
                   value={student.module_id}
                   onChange={handleChange}
                   
>
    <option value="">Select Module</option>

    {modules.map((module) => (
        <option
            key={module.id}
            value={module.id}
        >
            {module.module_name}
        </option>
    ))}
</select>
                {errors.module_id && (
    <div className="text-danger">
        {errors.module_id}
    </div>
)}
                </div>

                <br />

                <button
    type="submit"
    className="btn btn-primary"
>
                {editingId ? "Update Student" : "Save Student"}
                </button>
            </form>
            <hr />


            <div className="mb-3">

    <label className="form-label">
        Search Student
    </label>

    <input
        type="text"
        className="form-control"
        placeholder="Search by Full Name or Student Number and Module"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>

            <StudentTable
            students={filteredStudents}
            onDelete={handleDelete}
            onEdit={handleEdit}
            />
        </div>
    );
}

export default StudentForm;