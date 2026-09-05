from pydantic import BaseModel
from typing import Optional

# Module Schemas
class ModuleBase(BaseModel):
    module_name: str


class ModuleCreate(ModuleBase):
    pass


class Module(ModuleBase):
    id: int

    class Config:
        orm_mode = True

# Student Schemas
class StudentBase(BaseModel):
    fullname: str
    student_number: str
    age: int
    module_id: int


class StudentCreate(StudentBase):
    pass


class StudentUpdate(StudentBase):
    pass


class Student(StudentBase):
    id: int

    class Config:
        orm_mode = True

# Student with Module Name

class StudentWithModule(BaseModel):
    id: int
    fullname: str
    student_number: str
    age: int
    module: Module

    class Config:
        orm_mode = True