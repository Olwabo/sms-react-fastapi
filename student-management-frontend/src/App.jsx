import StudentForm from "./components/StudentForm";

function App() {
    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-10">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Student Management System
                            </h2>

                            <StudentForm />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default App;