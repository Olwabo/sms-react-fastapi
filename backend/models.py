from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    module_name = Column(String(100), unique=True, nullable=False)

    # One module can have many students
    students = relationship("Student", back_populates="module")


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100), nullable=False)
    student_number = Column(String(20), unique=True, nullable=False)
    age = Column(Integer, nullable=False)

    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)

    # Each student belongs to one module
    module = relationship("Module", back_populates="students")