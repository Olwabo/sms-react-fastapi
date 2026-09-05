from sqlalchemy.orm import Session
import models
import schemas


# MODULE CRUD
def get_modules(db: Session):
    return db.query(models.Module).all()


def get_module(db: Session, module_id: int):
    return (
        db.query(models.Module)
        .filter(models.Module.id == module_id)
        .first()
    )


def create_module(db: Session, module: schemas.ModuleCreate):
    db_module = models.Module(
        module_name=module.module_name
    )

    db.add(db_module)
    db.commit()
    db.refresh(db_module)

    return db_module


# STUDENT CRUD
def get_students(db: Session):
    return db.query(models.Student).all()


def get_student(db: Session, student_id: int):
    return (
        db.query(models.Student)
        .filter(models.Student.id == student_id)
        .first()
    )


def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(
        fullname=student.fullname,
        student_number=student.student_number,
        age=student.age,
        module_id=student.module_id,
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    return db_student


def update_student(
    db: Session,
    student_id: int,
    student: schemas.StudentUpdate,
):
    db_student = get_student(db, student_id)

    if db_student is None:
        return None

    db_student.fullname = student.fullname
    db_student.student_number = student.student_number
    db_student.age = student.age
    db_student.module_id = student.module_id

    db.commit()
    db.refresh(db_student)

    return db_student


def delete_student(db: Session, student_id: int):
    db_student = get_student(db, student_id)

    if db_student is None:
        return None

    db.delete(db_student)
    db.commit()

    return db_student